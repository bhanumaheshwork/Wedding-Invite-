import React from 'react';
import { weddingConfig } from '../data/weddingData';
import { MapPin, Navigation, Hotel, Car } from 'lucide-react';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="py-24 px-4 bg-[#150F0D] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Destination Udaipur
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
            The Wedding Venue
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Venue Info */}
          <div className="bg-[#1A120E] border border-[#D4AF37]/40 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/15 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[#FCF6BA]">
                  {weddingConfig.couple.venueName}
                </h3>
                <p className="font-cormorant text-lg text-[#F9F3EA]/80 mt-1">
                  {weddingConfig.couple.venueCity}
                </p>
              </div>
            </div>

            <p className="font-cormorant text-base text-[#F9F3EA]/90 leading-relaxed">
              Nestled on the serene banks of Lake Pichola, The Leela Palace Udaipur offers breathtaking views of the Aravalli mountains and historic palaces, providing an idyllic royal setting for our celebrations.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20 font-cormorant text-base">
              <div className="flex items-center gap-3">
                <Hotel className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span className="text-[#F9F3EA]/90"><strong className="text-[#FCF6BA]">Accommodation:</strong> Reserved rooms for guests at venue premises. Check-in starts Dec 13.</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span className="text-[#F9F3EA]/90"><strong className="text-[#FCF6BA]">Transportation:</strong> Airport transfers arranged from Maharana Pratap Airport, Udaipur.</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=The+Leela+Palace+Udaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#120D0B] font-montserrat font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Venue Image / Interactive Map Preview */}
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 aspect-[4/3] shadow-2xl bg-[#1A120E]">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="The Leela Palace Udaipur"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0B]/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <span className="font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  Palace View
                </span>
                <p className="font-cinzel text-xl text-[#FCF6BA] font-semibold mt-1">
                  Lake Pichola, Udaipur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
