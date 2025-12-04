'use client';

import { motion } from 'framer-motion';
import { X, Sparkles, Loader2, Image, Film } from 'lucide-react';
import type { VelvetMode } from '@/lib/prompt-engine';
import type { OutputType } from '@/app/page';
import { cn } from '@/lib/utils';

interface GenerationPanelProps {
  previewUrl: string | null;
  selectedMode: VelvetMode;
  userPrompt: string;
  outputType: OutputType;
  onPromptChange: (prompt: string) => void;
  onModeChange: (mode: VelvetMode) => void;
  onOutputTypeChange: (type: OutputType) => void;
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  demoCredits: number;
  isAdmin: boolean;
}

const MODE_COLORS = {
  sport: '#FF6B6B',
  ethereal: '#A8E6CF',
  clay: '#FFD93D',
  organic: '#C5A059',
};

const MODE_LABELS = {
  sport: 'Sport',
  ethereal: 'Ethereal',
  clay: 'Clay',
  organic: 'Organic',
};

export default function GenerationPanel({
  previewUrl,
  selectedMode,
  userPrompt,
  outputType,
  onPromptChange,
  onModeChange,
  onOutputTypeChange,
  onGenerate,
  onReset,
  isGenerating,
  demoCredits,
  isAdmin,
}: GenerationPanelProps) {
  const creditCost = outputType === 'video' ? 10 : 1;
  const canAfford = isAdmin || demoCredits >= creditCost;
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your <span className="text-velvet-gold">Masterpiece</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Describe your vision and let Velvet bring it to life
          </p>
        </motion.div>

        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Image Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Your Product</h3>
                <button
                  onClick={onReset}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="Upload different image"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {previewUrl && (
                <div className="relative aspect-square rounded-xl overflow-hidden bg-velvet-charcoal border border-white/10">
                  <img
                    src={previewUrl}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

            </div>

            {/* Right: Prompt Input */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Describe Your Vision</h3>
              
              <textarea
                value={userPrompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder="E.g., 'Luxury sports watch on athlete's wrist during golden hour workout'"
                className={cn(
                  'flex-1 bg-velvet-charcoal border border-white/10 rounded-xl p-4',
                  'text-white placeholder:text-gray-500',
                  'focus:outline-none focus:border-velvet-gold/50 focus:ring-2 focus:ring-velvet-gold/20',
                  'resize-none transition-all'
                )}
                rows={6}
                disabled={isGenerating}
              />

              {/* Character Count */}
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{userPrompt.length} / 500 characters</span>
                <span className="text-xs">
                  {userPrompt.length < 20 && 'More details = better results'}
                </span>
              </div>

              {/* Output Type Selector */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-gray-300">Choose Output Type:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onOutputTypeChange('image')}
                    disabled={isGenerating}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all duration-300',
                      'flex flex-col items-center gap-2',
                      outputType === 'image'
                        ? 'border-velvet-gold bg-velvet-gold/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20',
                      isGenerating && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Image className={cn(
                      'w-6 h-6',
                      outputType === 'image' ? 'text-velvet-gold' : 'text-gray-400'
                    )} />
                    <div className="text-center">
                      <div className={cn(
                        'font-semibold text-sm',
                        outputType === 'image' ? 'text-white' : 'text-gray-400'
                      )}>
                        Static Image
                      </div>
                      <div className="text-xs text-gray-500 mt-1">1 Credit</div>
                    </div>
                  </button>

                  <button
                    onClick={() => onOutputTypeChange('video')}
                    disabled={isGenerating}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all duration-300',
                      'flex flex-col items-center gap-2',
                      outputType === 'video'
                        ? 'border-velvet-gold bg-velvet-gold/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20',
                      isGenerating && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Film className={cn(
                      'w-6 h-6',
                      outputType === 'video' ? 'text-velvet-gold' : 'text-gray-400'
                    )} />
                    <div className="text-center">
                      <div className={cn(
                        'font-semibold text-sm',
                        outputType === 'video' ? 'text-white' : 'text-gray-400'
                      )}>
                        Cinematic Video
                      </div>
                      <div className="text-xs text-gray-500 mt-1">10 Credits</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={onGenerate}
                disabled={isGenerating || !userPrompt.trim() || !canAfford}
                whileHover={{ scale: (isGenerating || !canAfford) ? 1 : 1.02 }}
                whileTap={{ scale: (isGenerating || !canAfford) ? 1 : 0.98 }}
                className={cn(
                  'mt-6 w-full py-4 rounded-xl font-semibold text-lg',
                  'flex items-center justify-center gap-3',
                  'transition-all duration-300',
                  isGenerating || !userPrompt.trim() || !canAfford
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-velvet-gold text-black hover:bg-velvet-gold/90 hover:shadow-lg hover:shadow-velvet-gold/20'
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {outputType === 'video' ? 'Generating Video...' : 'Generating Image...'}
                  </>
                ) : !canAfford ? (
                  <>
                    <X className="w-5 h-5" />
                    Not Enough Credits ({creditCost} needed)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate {outputType === 'video' ? 'Video' : 'Image'} ({creditCost} Credit{creditCost > 1 ? 's' : ''})
                  </>
                )}
              </motion.button>

              {/* Info */}
              <p className="mt-4 text-xs text-center text-gray-500">
                Using <span className="text-velvet-gold">Gemini 1.5 Pro</span> (Lane 1) +{' '}
                <span className="text-velvet-gold">
                  {outputType === 'video' ? 'Veo 3.1' : 'Imagen-3.0'}
                </span> (Lane 2)
              </p>
              {!isAdmin && !canAfford && (
                <p className="mt-2 text-xs text-center text-red-400">
                  ⚠️ Insufficient credits ({demoCredits} available, {creditCost} required)
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Inline Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">
            Choose Your <span className="text-velvet-gold">Vibe</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'sport' as VelvetMode, label: 'Sport', emoji: '⚡', desc: 'High energy' },
              { id: 'ethereal' as VelvetMode, label: 'Ethereal', emoji: '🌿', desc: 'Calm & natural' },
              { id: 'clay' as VelvetMode, label: 'Clay', emoji: '🎨', desc: 'Playful & tech' },
              { id: 'organic' as VelvetMode, label: 'Organic', emoji: '🍃', desc: 'Food & luxury' },
            ].map((mode) => {
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => onModeChange(mode.id)}
                  disabled={isGenerating}
                  className={cn(
                    'glass-card p-4 text-center transition-all duration-300',
                    'hover:scale-105 hover:border-opacity-50 relative',
                    isSelected && 'ring-2 ring-offset-2 ring-offset-velvet-black',
                    isGenerating && 'opacity-50 cursor-not-allowed'
                  )}
                  style={{
                    borderColor: isSelected ? MODE_COLORS[mode.id] : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="selected-mode"
                      className="absolute inset-0 opacity-10 rounded-2xl"
                      style={{ backgroundColor: MODE_COLORS[mode.id] }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    <div className="text-3xl mb-2">{mode.emoji}</div>
                    <div className="font-semibold mb-1">{mode.label}</div>
                    <div className="text-xs text-gray-400">{mode.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-4 text-sm"
        >
          <div className="glass-card p-4">
            <h4 className="font-semibold text-velvet-gold mb-2">💡 Be Specific</h4>
            <p className="text-gray-400">
              Describe the setting, lighting, and mood you want
            </p>
          </div>
          <div className="glass-card p-4">
            <h4 className="font-semibold text-velvet-gold mb-2">🎨 Use Context</h4>
            <p className="text-gray-400">
              Mention the product type and target audience
            </p>
          </div>
          <div className="glass-card p-4">
            <h4 className="font-semibold text-velvet-gold mb-2">✨ Trust the Mode</h4>
            <p className="text-gray-400">
              Your selected mode will enhance the aesthetic
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

