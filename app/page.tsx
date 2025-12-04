'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ModeSelector from '@/components/ModeSelector';
import PortfolioGrid from '@/components/PortfolioGrid';
import GenerationPanel from '@/components/GenerationPanel';
import type { VelvetMode } from '@/lib/prompt-engine';

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<VelvetMode>('sport');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Demo credit system (in-memory, no Firebase needed for testing)
  const [demoCredits, setDemoCredits] = useState(10);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    console.log('File selected:', file.name, file.size, 'bytes');
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !userPrompt.trim()) {
      alert('Please upload an image and enter a prompt');
      return;
    }

    // Demo credit check (no Firebase needed for testing)
    if (demoCredits < 1) {
      alert('No credits remaining!\n\n(This is a demo counter. Refresh the page to reset to 10 credits.)\n\nIn production, Firebase will manage real credits.');
      return;
    }

    setIsGenerating(true);
    console.log('🚀 Starting Generation:', {
      file: uploadedFile.name,
      prompt: userPrompt,
      mode: selectedMode,
      creditsRemaining: demoCredits,
    });

    try {
      // TODO: Implement Lane 1 analysis with Gemini
      console.log('📊 Lane 1: Analyzing with Gemini 1.5 Pro...');
      
      // TODO: Implement Lane 2 generation with Imagen-3.0
      console.log('🎨 Lane 2: Generating with Imagen-3.0...');
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Deduct demo credit
      setDemoCredits(prev => prev - 1);
      
      console.log('✅ Generation complete!');
      console.log(`💰 Credits remaining: ${demoCredits - 1}`);
      alert(`Generation complete! (Backend API not connected yet)\n\nCredits remaining: ${demoCredits - 1}/10\n\nNext steps:\n1. Set up Google Cloud Vertex AI\n2. Connect Gemini + Imagen APIs\n3. Test real AI outputs`);
    } catch (error) {
      console.error('❌ Generation failed:', error);
      alert('Generation failed. Check console for details.');
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
    // Keep demo credits (don't reset on image reset)
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
            onPromptChange={setUserPrompt}
            onModeChange={handleModeChange}
            onGenerate={handleGenerate}
            onReset={handleReset}
            isGenerating={isGenerating}
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
              <p className="text-velvet-gold text-xs mt-2">
                Demo Credits: {demoCredits}/10 (Refresh to reset)
              </p>
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

