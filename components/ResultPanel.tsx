'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, RotateCcw, CheckCircle } from 'lucide-react';
import type { VelvetMode } from '@/lib/prompt-engine';
import type { OutputType } from '@/app/page';
import { cn } from '@/lib/utils';

interface ResultPanelProps {
  resultUrl: string;
  outputType: OutputType;
  mode: VelvetMode;
  prompt: string;
  onClose: () => void;
  onGenerateAgain: () => void;
}

const MODE_LABELS = {
  sport: 'Sport',
  ethereal: 'Ethereal',
  clay: 'Clay',
  organic: 'Organic',
};

export default function ResultPanel({
  resultUrl,
  outputType,
  mode,
  prompt,
  onClose,
  onGenerateAgain,
}: ResultPanelProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `velvet-${outputType}-${Date.now()}.${outputType === 'video' ? 'mp4' : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl glass-card p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">
                Generation <span className="text-velvet-gold">Complete!</span>
              </h2>
            </div>
            <p className="text-gray-400">
              {outputType === 'video' ? 'Cinematic Video' : 'High-End Image'} •{' '}
              {MODE_LABELS[mode]} Mode
            </p>
          </div>

          {/* Result Display */}
          <div className="mb-6">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-velvet-charcoal border border-white/10">
              {outputType === 'video' ? (
                <video
                  src={resultUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={resultUrl}
                  alt="Generated result"
                  className="w-full h-full object-contain"
                />
              )}
              
              {/* Watermark - For Demo */}
              <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-lg">
                <p className="text-xs text-velvet-gold font-mono">VELVET PROTOCOL</p>
              </div>
            </div>
          </div>

          {/* Prompt Display */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Your Prompt:</h3>
            <p className="text-sm text-white">{prompt}</p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-velvet-gold text-black font-semibold rounded-xl hover:bg-velvet-gold/90 transition-all"
            >
              <Download className="w-5 h-5" />
              Download
            </motion.button>

            <motion.button
              onClick={onGenerateAgain}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Generate Again
            </motion.button>
          </div>

          {/* Note */}
          <p className="mt-6 text-xs text-center text-gray-600">
            📝 Note: This is a demo. Real API integration will generate actual AI outputs.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

