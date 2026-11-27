import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningEnvelopeProps {
  onOpen: () => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen, isPlayingMusic, toggleMusic }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FCF6BA', '#8B0000', '#FFD700']
    });
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0A08] overflow-hidden px-4"
        >
          {/* Background Ambient Glow & Floral motif watermark */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent pointer-events-none" />
          
          <div className="relative w-full max-w-xl mx-auto bg-[#1A120E] border-2 border-[#D4AF37]/60 p-6 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.25)] rounded-2xl flex flex-col items-center text-center">
            {/* Ornate corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-montserrat font-semibold">
                The Royal Wedding Invitation
              </span>
              <h1 className="font-cinzel text-3xl md:text-5xl font-bold mt-2 gold-gradient-text tracking-wide">
                Ram & Sita
              </h1>
              <p className="font-cormorant italic text-lg text-[#F9F3EA]/80 mt-1">
                December 15, 2026 • Udaipur
              </p>
            </motion.div>

            {/* Wax Seal / Door Knocker element */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenInvitation}
              className="my-8 relative cursor-pointer group"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#8B0000] via-[#5C060C] to-[#2D0205] p-1 shadow-[0_0_30px_rgba(139,0,0,0.6)] flex items-center justify-center border-2 border-[#D4AF37]">
                <div className="w-full h-full rounded-full border border-[#D4AF37]/40 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden group-hover:border-[#D4AF37] transition-colors">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent" />
                  <span className="font-cinzel text-2xl md:text-3xl font-bold text-[#FCF6BA] tracking-widest">
                    R & S
                  </span>
                  <span className="font-montserrat text-[9px] uppercase tracking-widest text-[#D4AF37] mt-1">
                    Tap to Open
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FCF6BA] animate-pulse mt-1" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#D4AF37] text-[#120D0B] font-montserrat font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg group-hover:bg-[#FCF6BA] transition-colors">
                Open Invitation
              </div>
            </motion.div>

            <p className="font-cormorant text-sm md:text-base text-[#F9F3EA]/70 max-w-sm mt-2">
              You are cordially invited to witness the divine union of hearts and families.
            </p>

            {/* Music toggle preview option */}
            <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 w-full flex items-center justify-between text-xs text-[#F9F3EA]/60 font-montserrat">
              <span>Background Royal Melodies</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMusic();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
              >
                {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isPlayingMusic ? "Sound On" : "Sound Muted"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
