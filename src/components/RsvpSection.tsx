import React, { useState } from 'react';
import { weddingConfig } from '../data/weddingData';
import { Heart, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export const RsvpSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guestCount: '1',
    events: ['all'],
    dietary: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FCF6BA', '#8B0000', '#FFD700']
    });
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-[#120D0B] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Be Our Honored Guest
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mt-2 gold-gradient-text">
            RSVP Celebration
          </h2>
          <p className="font-cormorant text-lg text-[#F9F3EA]/80 mt-2">
            Please kindly respond by November 15, 2026 so we can finalize our royal arrangements.
          </p>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="bg-[#1A120E] border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-cinzel text-3xl font-bold text-[#FCF6BA]">
                Thank You, {formData.name}!
              </h3>
              <p className="font-cormorant text-xl text-[#F9F3EA]/90 max-w-md mx-auto">
                {formData.attending === 'yes'
                  ? "We are overjoyed that you will be joining us to celebrate our wedding in Udaipur!"
                  : "We will miss your presence at the celebration, but your blessings mean the world to us."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#120D0B] transition-colors"
              >
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] placeholder-[#F9F3EA]/30 focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg"
                  />
                </div>

                <div>
                  <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. aarav@example.com"
                    className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] placeholder-[#F9F3EA]/30 focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                    Will you attend? *
                  </label>
                  <select
                    value={formData.attending}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg"
                  >
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>

                <div>
                  <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                  Dietary Restrictions / Special Requirements
                </label>
                <input
                  type="text"
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  placeholder="e.g. Vegetarian, Jain, Vegan, Allergies"
                  className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] placeholder-[#F9F3EA]/30 focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg"
                />
              </div>

              <div>
                <label className="block font-montserrat text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                  Wishes for the Couple
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Leave a warm blessing for Ram & Sita..."
                  className="w-full bg-[#120D0B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#F9F3EA] placeholder-[#F9F3EA]/30 focus:outline-none focus:border-[#D4AF37] font-cormorant text-lg resize-none"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#120D0B] font-montserrat font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 mx-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Send RSVP Response</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
