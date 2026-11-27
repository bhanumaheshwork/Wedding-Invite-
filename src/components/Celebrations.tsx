import React, { useState } from 'react';
import { weddingConfig, CelebrationEvent } from '../data/weddingData';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Celebrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(weddingConfig.celebrations[0].id);

  const activeEvent = weddingConfig.celebrations.find(e => e.id === activeTab) || weddingConfig.celebrations[0];

  return (
    <section id="celebrations" className="py-24 px-4 bg-[#120D0B] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Royal Itinerary & Rituals
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
            Wedding Celebrations
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Celebration Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {weddingConfig.celebrations.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveTab(event.id)}
              className={`px-5 py-3 rounded-full font-montserrat text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeTab === event.id
                  ? 'bg-[#D4AF37] text-[#120D0B] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] font-bold'
                  : 'bg-[#1A120E] text-[#F9F3EA]/80 border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              {event.title.replace('The ', '').replace(' Ki Raat', '')}
            </button>
          ))}
        </div>

        {/* Active Event Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-br ${activeEvent.color} bg-[#1A120E] border border-[#D4AF37]/40 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden`}
          >
            {/* Ornate corner */}
            <div className="absolute top-4 right-4 text-[#D4AF37]/30">
              <Sparkles className="w-8 h-8" />
            </div>

            {/* Event Image */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 aspect-[4/5] shadow-lg">
              <img
                src={activeEvent.image}
                alt={activeEvent.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Event Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                {activeEvent.subtitle}
              </span>
              <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-[#FCF6BA] mt-2 mb-4">
                {activeEvent.title}
              </h3>
              <p className="font-cormorant text-lg text-[#F9F3EA]/90 leading-relaxed mb-6">
                {activeEvent.description}
              </p>

              <div className="space-y-4 mb-8 font-cormorant text-base text-[#F9F3EA]/80">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FCF6BA]">Date:</span> {activeEvent.date}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FCF6BA]">Time:</span> {activeEvent.time}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FCF6BA]">Venue:</span> {activeEvent.venue}, {activeEvent.address}
                  </div>
                </div>
              </div>

              <div className="inline-block bg-[#120D0B]/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3 font-montserrat text-xs tracking-wider text-[#D4AF37]">
                <span className="font-bold text-[#FCF6BA]">Dress Code:</span> {activeEvent.dressCode}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
