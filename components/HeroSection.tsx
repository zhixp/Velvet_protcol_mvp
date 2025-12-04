'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onFileSelect: (file: File) => void;
}

export default function HeroSection({ onFileSelect }: HeroSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(197, 160, 89, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-velvet-gold" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-velvet-gold to-white bg-clip-text text-transparent">
                VELVET
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
            Category King commercial photography.
            <br />
            <span className="text-velvet-gold">Drop & Done.</span>
          </p>
        </motion.div>

        {/* Drop Zone Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <label
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'glass-card cursor-pointer block transition-all duration-300',
              'hover:border-velvet-gold/50 hover:bg-white/10',
              'relative overflow-hidden group',
              isDragging && 'border-velvet-gold bg-velvet-gold/10 scale-105'
            )}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              aria-label="Upload product image"
            />

            <div className="relative z-10 p-16 md:p-24 flex flex-col items-center justify-center text-center">
              {/* Upload Icon */}
              <motion.div
                animate={{
                  y: isDragging ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-velvet-gold/20 blur-3xl rounded-full" />
                  <Upload
                    className={cn(
                      'w-20 h-20 relative z-10 transition-colors',
                      isDragging ? 'text-velvet-gold' : 'text-gray-400'
                    )}
                  />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Drop Product Here
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                Upload your product image and watch Velvet transform it into
                category-defining photography.
              </p>
              <div className="mt-8">
                <span className="inline-block px-6 py-3 bg-velvet-gold/10 border border-velvet-gold/30 rounded-full text-velvet-gold font-medium">
                  or click to browse
                </span>
              </div>
            </div>

            {/* Animated Border Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-velvet-gold/20 to-transparent blur-xl" />
            </div>
          </label>
        </motion.div>

        {/* Credits Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            1 Credit per image • 10 Credits for cinematic video
          </p>
        </motion.div>
      </div>
    </section>
  );
}

