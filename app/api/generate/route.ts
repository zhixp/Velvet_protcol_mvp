import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds for video generation

/**
 * LANE 2: Generate with Imagen-3.0 (Images) or Veo 3.1 (Videos)
 * 
 * Takes the enhanced prompt from Lane 1 and generates
 * the actual image or video using Google Vertex AI.
 */
export async function POST(request: NextRequest) {
  try {
    const { enhancedPrompt, outputType = 'image' } = await request.json();

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: 'Missing enhancedPrompt' },
        { status: 400 }
      );
    }

    // Validate environment variables
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (!projectId) {
      console.error('❌ Missing GOOGLE_CLOUD_PROJECT_ID');
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          message: 'Google Cloud project not configured. Add GOOGLE_CLOUD_PROJECT_ID to environment variables.',
        },
        { status: 500 }
      );
    }

    // Parse credentials from JSON string (Vercel format)
    let credentials;
    if (credentialsJson) {
      try {
        credentials = typeof credentialsJson === 'string' 
          ? JSON.parse(credentialsJson) 
          : credentialsJson;
      } catch (error) {
        console.error('❌ Invalid credentials JSON:', error);
        return NextResponse.json(
          { 
            error: 'Server configuration error',
            message: 'GOOGLE_APPLICATION_CREDENTIALS is not valid JSON',
          },
          { status: 500 }
        );
      }
    }

    console.log('🎨 Lane 2 Starting:', { 
      outputType, 
      promptLength: enhancedPrompt.length,
      projectId,
      hasCredentials: !!credentials,
    });

    // Initialize Vertex AI with explicit credentials (Vercel) or default auth (local)
    const vertexAIConfig: any = {
      project: projectId,
      location: 'us-central1',
    };

    if (credentials) {
      vertexAIConfig.googleAuthOptions = {
        credentials: credentials,
      };
    }

    const vertexAI = new VertexAI(vertexAIConfig);

    if (outputType === 'video') {
      // VIDEO GENERATION (Veo 3.1)
      console.log('🎬 Generating video with Veo 3.1...');
      
      const generativeModel = vertexAI.getGenerativeModel({
        model: 'veo-3.1',
      });

      // Note: Veo API structure may vary, adjust as needed
      const result = await generativeModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate a cinematic video: ${enhancedPrompt}`,
          }],
        }],
      });

      console.log('✅ Video generation complete');

      // Extract video URL (adjust based on actual API response)
      const videoUrl = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // BUG FIX 2: Validate video URL before returning
      if (!videoUrl || videoUrl.trim() === '') {
        throw new Error('Veo API returned empty video URL. Response may not contain expected data structure.');
      }

      return NextResponse.json({
        success: true,
        outputType: 'video',
        resultUrl: videoUrl,
        model: 'veo-3.1',
        creditCost: 10,
      });

    } else {
      // IMAGE GENERATION (imagegeneration@006)
      console.log('📸 Generating image with imagegeneration@006...');
      
      const generativeModel = vertexAI.getGenerativeModel({
        model: 'imagegeneration@006',
      });

      // Retry logic for rate limits (429 errors)
      let result;
      const maxRetries = 3;
      let lastError;
      
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          result = await generativeModel.generateContent({
            contents: [{
              role: 'user',
              parts: [{
                text: enhancedPrompt,
              }],
            }],
          });
          break; // Success, exit retry loop
        } catch (error: any) {
          lastError = error;
          
          // Check if it's a rate limit error
          const isRateLimit = error.status === 429 || error.code === 429 || 
                             (error.message && error.message.includes('429')) ||
                             (error.message && error.message.includes('Quota exceeded'));
          
          if (isRateLimit && attempt < maxRetries - 1) {
            // Exponential backoff: 2s, 4s, 8s
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`⚠️ Rate limit hit (attempt ${attempt + 1}/${maxRetries}), retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          // Not a rate limit, or out of retries - throw immediately
          throw error;
        }
      }
      
      if (!result) {
        throw lastError || new Error('Generation failed after retries');
      }

      console.log('✅ Image generation complete');

      // Extract image data
      const response = result.response;
      const candidate = response?.candidates?.[0];
      
      if (!candidate) {
        throw new Error('No image generated from Imagen - candidates array is empty');
      }

      // Get image data (base64 or URL depending on API response)
      const imagePart = candidate.content?.parts?.[0];
      const imageData = imagePart?.inlineData?.data || imagePart?.text || '';

      // BUG FIX 2: Validate image data exists before constructing data URL
      if (!imageData || imageData.trim() === '') {
        console.error('❌ Imagen API response structure:', JSON.stringify(result.response, null, 2));
        throw new Error(
          'Imagen API returned empty image data. Expected inlineData.data or text field in response but found neither. ' +
          'Check console logs for full API response structure.'
        );
      }

      // If base64, convert to data URL
      const imageUrl = imageData.startsWith('data:') 
        ? imageData 
        : `data:image/png;base64,${imageData}`;

      return NextResponse.json({
        success: true,
        outputType: 'image',
        resultUrl: imageUrl,
        model: 'imagegeneration@006',
        creditCost: 1,
      });
    }

  } catch (error: any) {
    console.error('❌ Lane 2 Error:', error);
    
    // Check for rate limit errors (429)
    const isRateLimit = error.status === 429 || error.code === 429 || 
                       (error.message && error.message.includes('429')) ||
                       (error.message && error.message.includes('Quota exceeded'));
    
    if (isRateLimit) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please wait 60 seconds and try again. The quota resets every minute.',
          rateLimit: true,
          retryAfter: 60,
          details: error.message || 'Quota exceeded for image generation',
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

