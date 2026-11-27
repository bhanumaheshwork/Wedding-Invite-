import React from 'react';
import { weddingConfig } from '../data/weddingData';
import { Heart, Share2, CalendarPlus, RotateCcw, Sparkles } from 'lucide-react';

interface FinalInvitationProps {
  onReplay: () => void;
}

export const FinalInvitation: React.FC<FinalInvitationProps> = ({ onReplay }) => {
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `You're invited to the royal wedding of Ram & Sita! 💍 December 15, 2026 at The Leela Palace, Udaipur. View invitation: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Ram & Sita Wedding Celebration");
    const details = encodeURIComponent("The Royal Wedding Celebration of Ram & Sita at The Leela Palace, Udaipur.");
    const location = encodeURIComponent("The Leela Palace, Udaipur, Rajasthan, India");
    const dates = "20261215T090000Z/20261215T220000Z";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <footer className="py-24 px-4 bg-[#0D0A08] border-t border-[#D4AF37]/30 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#1A120E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <Heart className="w-7 h-7 fill-[#D4AF37]" />
        </div>

        <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          Forever & Always
        </span>

        <h2 className="font-cinzel text-4xl sm:text-6xl font-bold mt-3 gold-gradient-text">
          Ram & Sita
        </h2>

        <p className="font-cormorant italic text-2xl text-[#FCF6BA] max-w-xl mx-auto mt-6 leading-relaxed">
          “With joyful hearts, we invite you to celebrate the beginning of our forever.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A120E] border border-[#D4AF37] text-[#D4AF37] font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#120D0B] transition-colors shadow-lg"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Add to Calendar</span>
          </button>

          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A120E] border border-[#D4AF37]/50 text-[#F9F3EA] font-montserrat font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Opening</span>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-[#D4AF37]/20 w-full text-xs font-montserrat text-[#F9F3EA]/50 tracking-wider">
          <p>{weddingConfig.couple.hashtag} • Designed for Royal Celebrations</p>
        </div>
      </div>
    </footer>
  );
};
