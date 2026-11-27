import React from 'react';
import { weddingConfig } from '../data/weddingData';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const LoveStory: React.FC = () => {
  return (
    <section id="story" className="py-24 px-4 bg-[#150F0D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#8B0000]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            How We Met & Fell in Love
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
            Our Love Story
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 md:ml-1/2 space-y-12">
          {weddingConfig.story.map((milestone, idx) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`relative pl-8 md:pl-12 ${idx % 2 === 0 ? 'md:pr-1/2 md:text-right md:pl-0 md:pr-12' : 'md:ml-1/2'}`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#120D0B] border-2 border-[#D4AF37] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                <span className="font-montserrat text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-1">
                  {milestone.year}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#FCF6BA] mb-3">
                  {milestone.title}
                </h3>
                <div className="overflow-hidden rounded-xl border border-[#D4AF37]/30 mb-4 max-w-md w-full aspect-[16/10] bg-[#1A120E]">
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="font-cormorant text-lg text-[#F9F3EA]/80 max-w-md leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
