import React from 'react';
import { weddingConfig } from '../data/weddingData';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroScene: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#120D0B]">
      {/* Background Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A151B]/30 via-[#120D0B] to-[#120D0B] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-[#D4AF37] mb-6"
        >
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Sparkles className="w-4 h-4" />
          <span className="font-montserrat text-xs md:text-sm uppercase tracking-[0.25em]">
            The Royal Wedding Celebration
          </span>
          <Sparkles className="w-4 h-4" />
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight gold-gradient-text drop-shadow-md">
            Ram <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#F3E5AB] font-normal mx-2">&</span> Sita
          </h1>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#F9F3EA]/80 mt-4 tracking-wide">
            "Two souls with but a single thought, two hearts that beat as one."
          </p>
        </motion.div>

        {/* Couple Portraits Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl my-8"
        >
          {/* Groom Card */}
          <div className="relative group overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#1A120E] p-4 shadow-xl">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl relative mb-4">
              <img
                src={weddingConfig.couple.groom.image}
                alt={weddingConfig.couple.groom.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0B] via-transparent to-transparent opacity-80" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#FCF6BA]">
              {weddingConfig.couple.groom.name}
            </h3>
            <p className="font-montserrat text-xs text-[#D4AF37] uppercase tracking-wider mt-1">
              Groom
            </p>
            <p className="font-cormorant text-sm text-[#F9F3EA]/70 mt-2">
              {weddingConfig.couple.groom.parents}
            </p>
          </div>

          {/* Bride Card */}
          <div className="relative group overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#1A120E] p-4 shadow-xl">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl relative mb-4">
              <img
                src={weddingConfig.couple.bride.image}
                alt={weddingConfig.couple.bride.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0B] via-transparent to-transparent opacity-80" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#FCF6BA]">
              {weddingConfig.couple.bride.name}
            </h3>
            <p className="font-montserrat text-xs text-[#D4AF37] uppercase tracking-wider mt-1">
              Bride
            </p>
            <p className="font-cormorant text-sm text-[#F9F3EA]/70 mt-2">
              {weddingConfig.couple.bride.parents}
            </p>
          </div>
        </motion.div>

        {/* Date & Venue Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 px-8 py-6 rounded-2xl bg-[#1A120E]/80 border border-[#D4AF37]/30 backdrop-blur-sm w-full max-w-2xl shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <span className="block text-[10px] font-montserrat uppercase tracking-widest text-[#D4AF37]">Date</span>
              <span className="font-cormorant text-lg font-semibold text-[#F9F3EA]">{weddingConfig.couple.dateDisplay}</span>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-[#D4AF37]/30" />

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <span className="block text-[10px] font-montserrat uppercase tracking-widest text-[#D4AF37]">Location</span>
              <span className="font-cormorant text-lg font-semibold text-[#F9F3EA]">{weddingConfig.couple.venueName}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
