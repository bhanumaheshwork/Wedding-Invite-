import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

interface RoyalEnvelopeDoorsProps {
  onOpenStart?: () => void;
  onOpened?: () => void;
}

export const RoyalEnvelopeDoors: React.FC<RoyalEnvelopeDoorsProps> = ({
  onOpenStart,
  onOpened,
}) => {
  const [status, setStatus] = useState<'closed' | 'opening' | 'opened'>('closed');
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const sealGroupRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomHintRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        containerRef.current,
        leftDoorRef.current,
        rightDoorRef.current,
        sealGroupRef.current,
        topTextRef.current,
        bottomHintRef.current,
        seamGlowRef.current,
      ]);
    };
  }, []);

  const handleBreakSeal = () => {
    if (isAnimatingRef.current || status !== 'closed') return;
    isAnimatingRef.current = true;
    setStatus('opening');
    onOpenStart?.();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Delicate blush-rose & antique-gold shimmer burst from the wax seal
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 38,
        spread: 74,
        startVelocity: 24,
        gravity: 0.68,
        scalar: 0.85,
        ticks: 150,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#e8c678', '#c59436', '#f2d98d', '#b84a27', '#faf3e4'],
      });
    }

    if (prefersReducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setStatus('opened');
          onOpened?.();
        },
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setStatus('opened');
        onOpened?.();
      },
    });

    // 1. Tactile gold wax-seal press & gentle lift-off dissolve
    tl.to(sealGroupRef.current, {
      scale: 0.92,
      duration: 0.16,
      ease: 'power2.out',
    })
      .to(sealGroupRef.current, {
        scale: 1.08,
        opacity: 0,
        duration: 0.48,
        ease: 'power2.out',
      })
      // Fade the quiet cover typography cleanly as the seal unfastens
      .to(
        [topTextRef.current, bottomHintRef.current],
        {
          opacity: 0,
          y: -8,
          duration: 0.42,
          ease: 'power2.out',
        },
        0.12
      )
      // Soft luminous glow along the parting center seam
      .fromTo(
        seamGlowRef.current,
        { opacity: 0, scaleX: 0.35 },
        { opacity: 0.85, scaleX: 1.25, duration: 0.55, ease: 'power2.out' },
        0.24
      )
      .to(
        seamGlowRef.current,
        { opacity: 0, duration: 0.9, ease: 'power2.out' },
        0.85
      )
      // 2. Left vellum door slowly glides open to the LEFT & right door slowly glides open to the RIGHT
      .to(
        leftDoorRef.current,
        {
          xPercent: -102,
          rotateY: -14,
          duration: 2.2,
          ease: 'power2.inOut',
          force3D: true,
        },
        0.32
      )
      .to(
        rightDoorRef.current,
        {
          xPercent: 102,
          rotateY: 14,
          duration: 2.2,
          ease: 'power2.inOut',
          force3D: true,
        },
        0.32
      )
      // Smoothly clear the outer wrapper once both doors have parted completely
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        2.32
      );
  };

  if (status === 'opened') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Floral vellum wedding invitation envelope"
      className={`absolute inset-0 z-30 overflow-hidden select-none ${
        status === 'opening' ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      style={{ perspective: '2000px' }}
    >
      {/* Soft warm light revealed down the seam as both envelope panels glide apart */}
      <div
        ref={seamGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 sm:w-44 opacity-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,244,218,0.92) 0%, rgba(250,243,228,0.45) 48%, rgba(250,243,228,0) 78%)',
        }}
      />

      {/* LEFT FLORAL VELLUM ENVELOPE PANEL (glides slowly left on open) */}
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-[24] will-change-transform"
        style={{
          transformOrigin: 'left center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background:
            'linear-gradient(110deg, #ede0bf 0%, #e6d7b2 52%, #e9dcb9 100%)',
          boxShadow: '4px 0 18px -4px rgba(84, 56, 16, 0.24)',
        }}
      >
        {/* Yellow-gold floral vellum artwork — left panel (bottom-left golden watercolor roses) */}
        <img
          src="/assets/envelope-door-left-gold.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-0 bottom-0 w-full sm:w-[clamp(240px,36vw,470px)] max-w-full h-auto min-h-full object-cover object-left-bottom"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, black 0%, black 80%, transparent 99%)',
            maskImage:
              'linear-gradient(to right, black 0%, black 80%, transparent 99%)',
          }}
        />

        {/* Subtle warm champagne-gold vellum luminosity sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 25% 18%, rgba(255,248,224,0.34) 0%, rgba(255,248,224,0) 58%)',
          }}
        />

        {/* Authentic translucent warm gold-ivory vertical vellum overlap fold strip along the center seam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-7 sm:w-11"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,247,222,0.22) 0%, rgba(255,247,222,0.52) 38%, rgba(248,236,198,0.46) 86%, rgba(198,166,98,0.38) 100%)',
            borderLeft: '1px solid rgba(255,248,224,0.55)',
            borderRight: '1px solid rgba(154,107,32,0.32)',
          }}
        />
      </div>

      {/* RIGHT FLORAL VELLUM ENVELOPE PANEL (glides slowly right on open) */}
      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden z-20 will-change-transform"
        style={{
          transformOrigin: 'right center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background:
            'linear-gradient(250deg, #dfd0a6 0%, #e4d5af 48%, #eadcb9 100%)',
          boxShadow: 'inset 16px 0 28px -16px rgba(84, 56, 16, 0.26)',
        }}
      >
        {/* Yellow-gold floral vellum artwork — right panel (top-right golden watercolor roses) */}
        <img
          src="/assets/envelope-door-right-gold.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute right-0 top-0 w-full sm:w-[clamp(240px,36vw,470px)] max-w-full h-auto min-h-full object-cover object-right-top"
          style={{
            WebkitMaskImage:
              'linear-gradient(to left, black 0%, black 84%, transparent 100%)',
            maskImage:
              'linear-gradient(to left, black 0%, black 84%, transparent 100%)',
          }}
        />

        {/* Soft warm antique-gold paper shadow along seam and outer edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(96,64,18,0.14) 0%, rgba(255,248,224,0) 10%, rgba(255,248,224,0) 92%, rgba(96,64,18,0.12) 100%)',
          }}
        />
      </div>

      {/* CENTER GOLD ROSE WAX SEAL STAMP & MINIMAL COVER PROMPT */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 pointer-events-none">
        {/* Delicate couple names floated cleanly above the gold rose wax seal */}
        <div
          ref={topTextRef}
          className="text-center mb-7 sm:mb-9 space-y-1.5 max-w-md"
          style={{
            textShadow: '0 1px 16px rgba(250, 243, 224, 0.96), 0 0 8px rgba(250, 243, 224, 0.85)',
          }}
        >
          <p className="font-archivo text-[0.7rem] sm:text-[0.78rem] tracking-[0.28em] uppercase text-[#8a601b]">
            Shubh Vivah <span aria-hidden="true">·</span> Udaipur
          </p>
          <p className="font-archivo text-[1.45rem] sm:text-[1.95rem] font-semibold uppercase tracking-[0.14em] text-[#6b1d2f]">
            Vaibhav{' '}
            <span className="font-playfair font-normal italic lowercase text-[#b84a27] text-[1.85rem] sm:text-[2.35rem] mx-1">
              &amp;
            </span>{' '}
            Trisha
          </p>
        </div>

        {/* Interactive Embossed Gold Rose Wax Seal Stamp (kept unchanged) */}
        <div
          ref={sealGroupRef}
          className="pointer-events-auto relative flex items-center justify-center"
        >
          {/* Subtle antique-gold breathing halo inviting click */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2.5 rounded-full border border-[#b89242]/55 transition-transform duration-300"
          />

          <button
            type="button"
            onClick={handleBreakSeal}
            aria-label="Click the gold rose wax seal to open Vaibhav and Trisha's wedding invitation"
            className="group relative w-[6.5rem] h-[6.5rem] sm:w-[7.75rem] sm:h-[7.75rem] flex items-center justify-center rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a6b20] transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
          >
            <img
              src="/assets/envelope-wax-seal.png"
              alt="Gold rose wax seal stamp"
              draggable={false}
              className="w-full h-full object-contain rounded-full drop-shadow-[0_12px_18px_rgba(62,40,12,0.42)] transition-[filter] duration-300 group-hover:drop-shadow-[0_16px_24px_rgba(62,40,12,0.52)]"
            />
          </button>
        </div>

        {/* Quiet Action Prompt below Wax Seal */}
        <div
          ref={bottomHintRef}
          className="mt-7 sm:mt-8 text-center space-y-1"
          style={{
            textShadow: '0 1px 16px rgba(250, 243, 224, 0.96), 0 0 8px rgba(250, 243, 224, 0.85)',
          }}
        >
          <p className="font-playfair italic text-[1.2rem] sm:text-[1.35rem] font-medium text-[#6b1d2f]">
            Tap the wax seal to open
          </p>
          <p className="font-archivo text-[0.66rem] sm:text-[0.72rem] tracking-[0.24em] uppercase text-[#8a601b]">
            December 15, 2026 <span aria-hidden="true">·</span> The Leela Palace
          </p>
        </div>
      </div>
    </div>
  );
};
