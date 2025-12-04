'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, Cuboid, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VelvetMode } from '@/lib/prompt-engine';

interface ModeSelectorProps {
  selectedMode: VelvetMode;
  onModeChange: (mode: VelvetMode) => void;
}

const MODES = [
  {
    id: 'sport' as VelvetMode,
    label: 'Sport',
    icon: Zap,
    color: '#FF6B6B',
    description: 'High energy, athletic, dynamic',
  },
  {
    id: 'ethereal' as VelvetMode,
    label: 'Ethereal',
    icon: Leaf,
    color: '#A8E6CF',
    description: 'Wellness, calm, natural',
  },
  {
    id: 'clay' as VelvetMode,
    label: 'Clay',
    icon: Cuboid,
    color: '#FFD93D',
    description: 'SaaS, tech, playful',
  },
  {
    id: 'organic' as VelvetMode,
    label: 'Organic',
    icon: Utensils,
    color: '#C5A059',
    description: 'Food, product, luxurious',
  },
];

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-velvet-gold">Vibe</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Select the aesthetic that matches your brand vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODES.map((mode, index) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;

            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onModeChange(mode.id)}
                className={cn(
                  'glass-card p-8 text-left transition-all duration-300',
                  'hover:scale-105 hover:border-opacity-50 relative overflow-hidden group',
                  isSelected && 'border-opacity-100'
                )}
                style={{
                  borderColor: isSelected ? mode.color : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Background Glow */}
                {isSelected && (
                  <motion.div
                    layoutId="mode-glow"
                    className="absolute inset-0 opacity-10 blur-2xl"
                    style={{ backgroundColor: mode.color }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors"
                    style={{
                      backgroundColor: isSelected
                        ? `${mode.color}20`
                        : 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors"
                      style={{ color: isSelected ? mode.color : '#6B7280' }}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{mode.label}</h3>
                  <p className="text-gray-400 text-sm">{mode.description}</p>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: mode.color }}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${mode.color}15, transparent 70%)`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

