'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ModeSelector from '@/components/ModeSelector';
import PortfolioGrid from '@/components/PortfolioGrid';
import GenerationPanel from '@/components/GenerationPanel';
import ResultPanel from '@/components/ResultPanel';
import type { VelvetMode } from '@/lib/prompt-engine';

// Admin password for unlimited testing
const ADMIN_PASSWORD = 'velvet2025';

export type OutputType = 'image' | 'video';

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<VelvetMode>('sport');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputType, setOutputType] = useState<OutputType>('image');
  
  // Demo credit system (in-memory, no Firebase needed for testing)
  const [demoCredits, setDemoCredits] = useState(10);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Result state
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  
  // Rate limiting: prevent multiple simultaneous requests
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const RATE_LIMIT_MS = 2000; // Minimum 2 seconds between requests

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    console.log('File selected:', file.name, file.size, 'bytes');
  };

  const handleAdminLogin = () => {
    const password = prompt('Enter admin password for unlimited credits:');
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setDemoCredits(999);
      alert('🔓 Admin mode activated!\n\nUnlimited credits for testing.\nPassword: velvet2025');
    } else if (password) {
      alert('❌ Incorrect password');
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !userPrompt.trim()) {
      alert('Please upload an image and enter a prompt');
      return;
    }

    // Rate limiting: prevent rapid-fire requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMIT_MS) {
      const waitTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastRequest) / 1000);
      alert(`Please wait ${waitTime} second${waitTime > 1 ? 's' : ''} before generating again. This prevents hitting rate limits.`);
      return;
    }

    // Prevent multiple simultaneous requests
    if (isGenerating) {
      alert('Generation already in progress. Please wait...');
      return;
    }

    // Calculate credit cost
    const creditCost = outputType === 'video' ? 10 : 1;

    // Demo credit check (skip for admin)
    if (!isAdmin && demoCredits < creditCost) {
      alert(`Not enough credits!\n\nRequired: ${creditCost} credits\nAvailable: ${demoCredits} credits\n\n${outputType === 'video' ? 'Try generating an image (1 credit) instead, or' : ''} Refresh the page to reset.`);
      return;
    }

    setIsGenerating(true);
    setLastRequestTime(now);
    console.log('🚀 Starting Generation:', {
      file: uploadedFile.name,
      prompt: userPrompt,
      mode: selectedMode,
      outputType: outputType,
      creditCost: creditCost,
      creditsRemaining: demoCredits,
      adminMode: isAdmin,
    });

    try {
      // LANE 1: Analyze with Gemini 1.5 Pro
      console.log('📊 Lane 1: Analyzing with Gemini 1.5 Pro...');
      
      const analysisResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          mode: selectedMode,
        }),
      });

      if (!analysisResponse.ok) {
        const error = await analysisResponse.json();
        throw new Error(error.message || 'Analysis failed');
      }

      const analysisData = await analysisResponse.json();
      const { analysis } = analysisData;
      
      console.log('✅ Lane 1 Complete:', analysis.detectedVibe);
      console.log('📝 Director\'s Script:', analysis.directorScript);

      // LANE 2: Generate with imagegeneration@006 or Veo 3.1
      if (outputType === 'image') {
        console.log('🎨 Lane 2: Generating with imagegeneration@006...');
      } else {
        console.log('🎬 Lane 2: Generating with Veo 3.1...');
      }
      
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enhancedPrompt: analysis.enhancedPrompt,
          outputType: outputType,
        }),
      });

      if (!generateResponse.ok) {
        const error = await generateResponse.json();
        
        // Handle rate limit errors with retry suggestion
        if (generateResponse.status === 429 || error.rateLimit) {
          const retryAfter = error.retryAfter || 60;
          throw new Error(
            `Rate limit exceeded! Please wait ${retryAfter} seconds before trying again.\n\n` +
            `This happens when too many requests are made too quickly. ` +
            `The quota resets every minute.\n\n` +
            `Tip: Wait ${retryAfter} seconds, then try again.`
          );
        }
        
        throw new Error(error.message || 'Generation failed');
      }

      const generateData = await generateResponse.json();
      
      console.log('✅ Lane 2 Complete!');
      console.log(`🎯 Model: ${generateData.model}`);
      
      // BUG FIX 1: Calculate new credit balance BEFORE updating state
      const newCreditBalance = isAdmin ? demoCredits : demoCredits - creditCost;
      
      // Deduct demo credit (skip for admin)
      if (!isAdmin) {
        setDemoCredits(prev => prev - creditCost);
      }
      
      // Set real result from API
      setGeneratedResult(generateData.resultUrl);
      
      console.log('✅ Generation complete!');
      console.log(`💰 Credits remaining: ${isAdmin ? '∞' : newCreditBalance}`);
      
    } catch (error: any) {
      console.error('❌ Generation failed:', error);
      alert(`Generation failed: ${error.message}\n\nCheck console for details.`);
      setGeneratedResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModeChange = (mode: VelvetMode) => {
    setSelectedMode(mode);
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setUserPrompt('');
    setIsGenerating(false);
    setGeneratedResult(null);
    setOutputType('image');
    // Keep demo credits (don't reset on image reset)
  };

  const handleCloseResult = () => {
    setGeneratedResult(null);
  };

  const handleGenerateAgain = () => {
    setGeneratedResult(null);
    // Keep the current prompt and settings
  };

  return (
    <main className="relative min-h-screen">
      {/* Hero Section or Generation Panel */}
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <HeroSection key="hero" onFileSelect={handleFileSelect} />
        ) : (
          <GenerationPanel
            key="generation"
            previewUrl={previewUrl}
            selectedMode={selectedMode}
            userPrompt={userPrompt}
            outputType={outputType}
            onPromptChange={setUserPrompt}
            onModeChange={handleModeChange}
            onOutputTypeChange={setOutputType}
            onGenerate={handleGenerate}
            onReset={handleReset}
            isGenerating={isGenerating}
            demoCredits={demoCredits}
            isAdmin={isAdmin}
          />
        )}
      </AnimatePresence>

      {/* Mode Selector - Only show when no file uploaded */}
      {!uploadedFile && (
        <ModeSelector
          selectedMode={selectedMode}
          onModeChange={handleModeChange}
        />
      )}

      {/* Result Panel - Show generated result */}
      {generatedResult && (
        <ResultPanel
          resultUrl={generatedResult}
          outputType={outputType}
          mode={selectedMode}
          prompt={userPrompt}
          onClose={handleCloseResult}
          onGenerateAgain={handleGenerateAgain}
        />
      )}

      {/* Portfolio Grid */}
      <PortfolioGrid />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-velvet-gold">VELVET</span> PROTOCOL
              </h3>
              <p className="text-gray-500 text-sm">
                The Category King • Powered by Google Vertex AI
              </p>
              {/* Demo Credits Display */}
              <div className="flex items-center gap-3 mt-2">
                <p className="text-velvet-gold text-xs">
                  {isAdmin ? '∞ Unlimited Credits (Admin)' : `Demo Credits: ${demoCredits}/10`}
                </p>
                {!isAdmin && (
                  <button
                    onClick={handleAdminLogin}
                    className="text-xs text-gray-600 hover:text-velvet-gold transition-colors underline"
                  >
                    Admin Login
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-velvet-gold transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-velvet-gold transition-colors">
                API
              </a>
              <a href="#" className="hover:text-velvet-gold transition-colors">
                Pricing
              </a>
            </div>
          </motion.div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
            <p>
              © 2025 Velvet Protocol. Built with Next.js 14 • Google Cloud Vertex AI
            </p>
            <p className="mt-2 text-gray-700">
              Testing Mode: Firebase disabled • Using demo credit counter
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
