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

    console.log('🎨 Lane 2 Starting:', { 
      outputType, 
      promptLength: enhancedPrompt.length,
      projectId,
    });

    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: projectId,
      location: 'us-central1',
    });

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

      return NextResponse.json({
        success: true,
        outputType: 'video',
        resultUrl: videoUrl,
        model: 'veo-3.1',
        creditCost: 10,
      });

    } else {
      // IMAGE GENERATION (Imagen-3.0)
      console.log('📸 Generating image with Imagen-3.0...');
      
      const generativeModel = vertexAI.getGenerativeModel({
        model: 'imagen-3.0-generate-001',
      });

      const result = await generativeModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: enhancedPrompt,
          }],
        }],
      });

      console.log('✅ Image generation complete');

      // Extract image data
      const response = result.response;
      const candidate = response?.candidates?.[0];
      
      if (!candidate) {
        throw new Error('No image generated from Imagen');
      }

      // Get image data (base64 or URL depending on API response)
      const imagePart = candidate.content?.parts?.[0];
      const imageData = imagePart?.inlineData?.data || imagePart?.text || '';

      // If base64, convert to data URL
      const imageUrl = imageData.startsWith('data:') 
        ? imageData 
        : `data:image/png;base64,${imageData}`;

      return NextResponse.json({
        success: true,
        outputType: 'image',
        resultUrl: imageUrl,
        model: 'imagen-3.0-generate-001',
        creditCost: 1,
      });
    }

  } catch (error: any) {
    console.error('❌ Lane 2 Error:', error);
    
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

