import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini } from '@/lib/prompt-engine';
import type { VelvetMode } from '@/lib/prompt-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * LANE 1: Analyze user input with Gemini 1.5 Pro (FREE)
 * 
 * This endpoint takes user's raw prompt and selected mode,
 * then uses Gemini to create an enhanced "Director's Script"
 * for Imagen/Veo generation.
 */
export async function POST(request: NextRequest) {
  try {
    const { prompt, mode } = await request.json();

    if (!prompt || !mode) {
      return NextResponse.json(
        { error: 'Missing prompt or mode' },
        { status: 400 }
      );
    }

    console.log('📊 Lane 1 Starting:', { prompt, mode });

    // Call Lane 1: Gemini Analysis
    const analysis = await analyzeWithGemini(prompt, mode as VelvetMode);

    console.log('✅ Lane 1 Complete:', {
      vibe: analysis.detectedVibe,
      scriptLength: analysis.directorScript.length,
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('❌ Lane 1 Error:', error);
    
    return NextResponse.json(
      {
        error: 'Analysis failed',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

