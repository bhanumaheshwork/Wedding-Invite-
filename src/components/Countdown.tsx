import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../data/weddingData';
import { Clock, Sparkles } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.couple.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="py-24 px-4 bg-[#150F0D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          Counting Every Second Until Forever
        </span>
        <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
          The Wedding Countdown
        </h2>
        <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={item.label}
              className="bg-[#1A120E] border border-[#D4AF37]/40 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#D4AF37] transition-colors"
            >
              <div className="absolute top-2 right-2 text-[#D4AF37]/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold gold-gradient-text mb-2">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-montserrat text-xs md:text-sm uppercase tracking-widest text-[#F9F3EA]/70">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-cormorant italic text-xl text-[#F9F3EA]/80 mt-12">
          "Counting down the moments until we celebrate our love with you in Udaipur."
        </p>
      </div>
    </section>
  );
};
