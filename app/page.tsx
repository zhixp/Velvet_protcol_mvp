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

    // Calculate credit cost
    const creditCost = outputType === 'video' ? 10 : 1;

    // Demo credit check (skip for admin)
    if (!isAdmin && demoCredits < creditCost) {
      alert(`Not enough credits!\n\nRequired: ${creditCost} credits\nAvailable: ${demoCredits} credits\n\n${outputType === 'video' ? 'Try generating an image (1 credit) instead, or' : ''} Refresh the page to reset.`);
      return;
    }

    setIsGenerating(true);
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
      // TODO: Implement Lane 1 analysis with Gemini
      console.log('📊 Lane 1: Analyzing with Gemini 1.5 Pro...');
      
      if (outputType === 'image') {
        // TODO: Implement Lane 2 generation with Imagen-3.0
        console.log('🎨 Lane 2: Generating with Imagen-3.0...');
      } else {
        // TODO: Implement Lane 2 generation with Veo 3.1
        console.log('🎬 Lane 2: Generating with Veo 3.1...');
      }
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Deduct demo credit (skip for admin)
      if (!isAdmin) {
        setDemoCredits(prev => prev - creditCost);
      }
      
      // Set mock result (will be replaced with real URL from API)
      setGeneratedResult(previewUrl); // For now, show the uploaded image as placeholder
      
      console.log('✅ Generation complete!');
      console.log(`💰 Credits remaining: ${isAdmin ? '∞' : demoCredits - creditCost}`);
      
      // Don't show alert, let ResultPanel handle the display
    } catch (error) {
      console.error('❌ Generation failed:', error);
      alert('Generation failed. Check console for details.');
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

