/**
 * VELVET PROTOCOL - PROMPT ENGINE (Lane 1)
 * 
 * Mission: Use Gemini 1.5 Pro (Free Tier) to analyze user input and generate
 * the "Director's Script" for Lane 2 (Imagen-3.0).
 * 
 * Cost: $0.00 (AI Studio Free Tier)
 */

import { VertexAI } from '@google-cloud/vertexai';

export type VelvetMode = 'sport' | 'ethereal' | 'clay' | 'organic';

export interface AnalysisResult {
  detectedVibe: string;
  directorScript: string;
  enhancedPrompt: string;
  suggestedMode: VelvetMode;
}

// MODE DEFINITIONS (Ohneis Method)
const MODE_TOKENS = {
  sport: {
    lighting: 'Golden hour flair, deep athletic shadows, vertical flash, harsh sunlight hits',
    texture: 'Micro-water droplets on skin, sweat-drenched lycra, aerodynamic tension',
    camera: 'High shutter speed (1/1000s), motion blur background, wide dynamic range',
    vibe: 'high energy, athletic, dynamic movement',
  },
  ethereal: {
    lighting: 'Diffused atmospheric light, low contrast, soft pastel gradients, time suspension',
    texture: 'Translucent surfaces, negative space, organic flow',
    camera: 'Wide angle, analog film grain, floating dust particles, low grain',
    vibe: 'wellness, calm, natural, serene',
  },
  clay: {
    lighting: 'Softbox studio lighting, gentle rim light, rounded shadows',
    texture: 'Handcrafted ceramic texture, visible fingerprint marks, imperfect sculpting',
    camera: 'Macro lens, shallow depth of field (tilt-shift effect)',
    vibe: 'playful, tech, saas, modern, minimalist',
  },
  organic: {
    lighting: 'Frontal soft light, minimal shadows, high-key editorial',
    texture: 'Dense piling, no visible gaps, viscous liquid flow, shell flakes, matte pastel',
    camera: 'Top-down (Flat lay) or 45-degree macro, tack sharp focus',
    vibe: 'food, product, luxurious, gourmet',
  },
};

/**
 * Initialize Vertex AI client for Lane 1 (Gemini 1.5 Pro)
 */
function getVertexAIClient() {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable not set');
  }

  return new VertexAI({
    project: projectId,
    location: 'us-central1',
  });
}

/**
 * LANE 1: Analyze user input using Gemini 1.5 Pro (Free)
 * 
 * @param userInput - The user's product description or creative brief
 * @param selectedMode - The Velvet mode selected by the user
 * @returns Analysis result with enhanced prompt for Lane 2
 */
export async function analyzeWithGemini(
  userInput: string,
  selectedMode: VelvetMode
): Promise<AnalysisResult> {
  const vertexAI = getVertexAIClient();
  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
  });

  const modeConfig = MODE_TOKENS[selectedMode];

  const systemPrompt = `You are the "Velvet Director" - an expert in high-end commercial photography.

Your mission: Transform user input into a cinematic "Director's Script" for product photography.

CURRENT MODE: ${selectedMode.toUpperCase()}
MODE VIBE: ${modeConfig.vibe}

RULES:
1. Analyze the user's input and extract the core product/subject.
2. Detect the emotional vibe they're aiming for.
3. Write a "Director's Script" - a detailed prompt that injects:
   - Lighting: ${modeConfig.lighting}
   - Texture: ${modeConfig.texture}
   - Camera: ${modeConfig.camera}
4. Output MUST be production-ready for Imagen-3.0.
5. Keep it under 200 words but rich in cinematic detail.
6. NO generic descriptions. Be specific, technical, and visually precise.

Format your response as JSON:
{
  "detectedVibe": "brief emotional analysis",
  "directorScript": "the full cinematic prompt",
  "enhancedPrompt": "the final prompt for Imagen-3.0 (compressed, no JSON)"
}`;

  const prompt = `${systemPrompt}\n\nUSER INPUT: "${userInput}"`;

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      detectedVibe: parsed.detectedVibe || '',
      directorScript: parsed.directorScript || '',
      enhancedPrompt: parsed.enhancedPrompt || '',
      suggestedMode: selectedMode,
    };
  } catch (error) {
    console.error('Lane 1 Analysis Error:', error);
    
    // Fallback: Generate prompt without AI
    return {
      detectedVibe: `User wants to showcase their product with a ${selectedMode} aesthetic`,
      directorScript: `Product photography in ${selectedMode} style`,
      enhancedPrompt: `${userInput}. ${modeConfig.lighting}. ${modeConfig.texture}. Shot with ${modeConfig.camera}. Professional commercial photography, 8K resolution, award-winning composition.`,
      suggestedMode: selectedMode,
    };
  }
}

/**
 * Get mode configuration for direct prompt injection
 */
export function getModeTokens(mode: VelvetMode) {
  return MODE_TOKENS[mode];
}

