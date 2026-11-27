import React, { useState } from 'react';
import { weddingConfig, GalleryPhoto } from '../data/weddingData';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Pre-Wedding', 'Engagement', 'Candid', 'Traditions'];

  const filteredPhotos = selectedCategory === 'All'
    ? weddingConfig.gallery
    : weddingConfig.gallery.filter(p => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 px-4 bg-[#120D0B] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Captured Memories
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
            Moments Together
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-montserrat text-xs uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#120D0B] border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#1A120E] text-[#F9F3EA]/80 border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveImage(photo)}
                className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#1A120E] aspect-[4/5] cursor-pointer shadow-xl"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D0B] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-montserrat text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                    {photo.category}
                  </span>
                  <p className="font-cormorant text-lg text-[#FCF6BA] mt-1 font-semibold">
                    {photo.caption}
                  </p>
                  <div className="absolute top-4 right-4 bg-[#120D0B]/80 p-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37]">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-[#120D0B]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#1A120E] border border-[#D4AF37]/50 rounded-2xl p-4 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 bg-[#120D0B] border border-[#D4AF37]/40 text-[#D4AF37] p-2 rounded-full hover:bg-[#D4AF37] hover:text-[#120D0B] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="max-h-[75vh] overflow-hidden rounded-xl mb-4 flex items-center justify-center">
                <img
                  src={activeImage.url}
                  alt={activeImage.caption}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>
              <div className="text-center px-4 pb-2">
                <span className="font-montserrat text-xs uppercase tracking-widest text-[#D4AF37]">
                  {activeImage.category}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#FCF6BA] mt-1">
                  {activeImage.caption}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
