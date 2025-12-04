'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PortfolioItem {
  id: string;
  url: string;
  mode: string;
  height: number;
}

// Placeholder portfolio items (replace with real generated images)
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', url: '/portfolio/1.jpg', mode: 'Sport', height: 400 },
  { id: '2', url: '/portfolio/2.jpg', mode: 'Ethereal', height: 500 },
  { id: '3', url: '/portfolio/3.jpg', mode: 'Clay', height: 450 },
  { id: '4', url: '/portfolio/4.jpg', mode: 'Organic', height: 480 },
  { id: '5', url: '/portfolio/5.jpg', mode: 'Sport', height: 420 },
  { id: '6', url: '/portfolio/6.jpg', mode: 'Ethereal', height: 460 },
];

export default function PortfolioGrid() {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-transparent to-velvet-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-velvet-gold">Impossible</span> Portfolio
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Category-defining imagery that would cost $50K+ with traditional agencies.
            Now available in seconds.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="glass-card p-3 group cursor-pointer hover:border-velvet-gold/50 transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl bg-velvet-charcoal">
                  {/* Placeholder for actual images */}
                  <div
                    className={cn(
                      'w-full flex items-center justify-center text-gray-600',
                      'bg-gradient-to-br from-velvet-charcoal to-velvet-black'
                    )}
                    style={{ height: `${item.height}px` }}
                  >
                    {/* Replace with actual Image component when images are available */}
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-sm text-gray-500">
                        {item.mode} Style
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Sample image {item.id}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 bg-velvet-gold/20 border border-velvet-gold/40 rounded-full text-velvet-gold text-xs font-medium">
                        {item.mode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            All images generated with Velvet Protocol • Imagen-3.0
          </p>
        </motion.div>
      </div>
    </section>
  );
}

