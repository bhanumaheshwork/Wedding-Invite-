import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingData';

interface NavbarProps {
  onRsvpClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRsvpClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Couple", href: "#couple" },
    { name: "Story", href: "#story" },
    { name: "Celebrations", href: "#celebrations" },
    { name: "Countdown", href: "#countdown" },
    { name: "Gallery", href: "#gallery" },
    { name: "Venue", href: "#venue" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-45 transition-all duration-500 ${scrolled ? 'bg-[#120D0B]/90 backdrop-blur-md py-3.5 border-b border-[#D4AF37]/30 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo / Couple initials */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-cinzel text-xl md:text-2xl font-bold tracking-widest gold-gradient-text">
            R & S
          </span>
          <span className="hidden sm:inline font-cormorant text-xs tracking-widest text-[#D4AF37]/80 uppercase">
            | Udaipur 2026
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-montserrat text-xs uppercase tracking-widest font-medium text-[#F9F3EA]/90">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RSVP Action */}
        <div className="flex items-center gap-4">
          <button
            onClick={onRsvpClick}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#120D0B] font-montserrat font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Heart className="w-3.5 h-3.5 fill-[#120D0B]" />
            <span>RSVP Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1A120E] border-b border-[#D4AF37]/30 py-6 px-6 shadow-2xl flex flex-col gap-4 font-montserrat text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F9F3EA] hover:text-[#D4AF37] transition-colors py-2 border-b border-[#D4AF37]/10"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRsvpClick();
            }}
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#120D0B] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-[#120D0B]" />
            <span>RSVP Now</span>
          </button>
        </div>
      )}
    </nav>
  );
};
