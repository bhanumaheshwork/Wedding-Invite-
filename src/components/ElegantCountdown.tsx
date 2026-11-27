import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWeddingCountdown } from '../hooks/useWeddingCountdown';

gsap.registerPlugin(ScrollTrigger);

const WEDDING_TARGET_ISO = '2026-12-15T10:00:00+05:30';

const GoldCornerFiligree: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className={`w-10 h-10 sm:w-14 sm:h-14 pointer-events-none select-none ${className}`}
  >
    <defs>
      <linearGradient id="goldLeafStroke" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9d7021" />
        <stop offset="45%" stopColor="#e8c872" />
        <stop offset="75%" stopColor="#c59436" />
        <stop offset="100%" stopColor="#8d6118" />
      </linearGradient>
    </defs>
    {/* Outer stepped corner */}
    <path
      d="M4 44V12C4 7.58172 7.58172 4 12 4H44"
      stroke="url(#goldLeafStroke)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Inner scalloped Rajasthani arch flourish */}
    <path
      d="M11 34V18C11 14.134 14.134 11 18 11H34"
      stroke="url(#goldLeafStroke)"
      strokeWidth="1"
      strokeOpacity="0.85"
      strokeLinecap="round"
    />
    {/* Delicate lotus bud at the corner */}
    <path
      d="M16 16C18.5 16 21 17.5 22.5 22.5C17.5 21 16 18.5 16 16Z"
      fill="url(#goldLeafStroke)"
      fillOpacity="0.45"
      stroke="url(#goldLeafStroke)"
      strokeWidth="0.9"
    />
    <circle cx="10.5" cy="10.5" r="1.6" fill="url(#goldLeafStroke)" />
  </svg>
);

export const ElegantCountdown: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const frameRectRef = useRef<SVGRectElement>(null);

  const { days, hours, minutes, seconds, isComplete } = useWeddingCountdown(WEDDING_TARGET_ISO);

  useEffect(() => {
    if (!sectionRef.current || !pinWrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions ?? {};
        if (!isDesktop || !sectionRef.current || !pinWrapperRef.current) return;

        const rectEl = frameRectRef.current;
        const plaqueEl = plaqueRef.current;

        const tl = gsap.timeline({ paused: true });

        if (!reduceMotion) {
          if (rectEl) {
            const perimeter = rectEl.getTotalLength();
            gsap.set(rectEl, {
              strokeDasharray: perimeter,
              strokeDashoffset: perimeter * 0.45,
            });
            tl.to(
              rectEl,
              {
                strokeDashoffset: 0,
                duration: 1,
                ease: 'power2.out',
              },
              0
            );
          }

          if (plaqueEl) {
            gsap.set(plaqueEl, { scale: 0.975, autoAlpha: 0.9 });
            tl.to(
              plaqueEl,
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.9,
                ease: 'power2.out',
              },
              0
            );
          }
        }

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 0.65)}`,
          pin: pinWrapperRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          refreshPriority: 3,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            tl.progress(self.progress);
          },
        });

        return () => {
          st.kill();
          tl.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const units = [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(seconds).padStart(2, '0') },
  ];

  return (
    <section
      id="countdown"
      ref={sectionRef}
      aria-labelledby="countdown-heading"
      className="relative z-20 isolate bg-[#faf3e4] text-[#5c1a1b] overflow-x-clip"
    >
      <div
        ref={pinWrapperRef}
        className="w-full py-16 sm:py-20 lg:py-0 lg:h-screen lg:overflow-hidden bg-[#faf3e4] flex items-center justify-center px-4 sm:px-8"
      >
        {/* Editorial Gold-Leaf Framed Plaque */}
        <div
          ref={plaqueRef}
          className="relative w-full max-w-5xl mx-auto bg-[#fcf8ee] px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-[clamp(2rem,4.5vh,3.75rem)] rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_24px_70px_-30px_rgba(141,97,24,0.28)] overflow-hidden"
        >
          {/* Animated Gold-Leaf Shimmer Sweep (Compositor-only transform/opacity) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          >
            <div
              className="gold-leaf-sheen absolute inset-y-0 left-0 w-1/3"
              style={{
                background:
                  'linear-gradient(105deg, transparent 0%, rgba(232,200,114,0.18) 45%, rgba(255,244,205,0.34) 50%, rgba(212,170,74,0.14) 58%, transparent 100%)',
              }}
            />
          </div>

          {/* Animated SVG Gold-Leaf Perimeter Frame */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 520"
          >
            <defs>
              <linearGradient id="goldLeafFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a47422" />
                <stop offset="28%" stopColor="#ecd082" />
                <stop offset="52%" stopColor="#c59436" />
                <stop offset="78%" stopColor="#f4dfa0" />
                <stop offset="100%" stopColor="#996a1b" />
              </linearGradient>
            </defs>
            {/* Outer delicate hairline */}
            <rect
              x="10"
              y="10"
              width="980"
              height="500"
              rx="22"
              ry="22"
              fill="none"
              stroke="url(#goldLeafFrameGrad)"
              strokeWidth="1.6"
              strokeOpacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner scroll-traced gold-leaf border */}
            <rect
              ref={frameRectRef}
              x="22"
              y="22"
              width="956"
              height="476"
              rx="16"
              ry="16"
              fill="none"
              stroke="url(#goldLeafFrameGrad)"
              strokeWidth="2.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Four Symmetrical Gold-Leaf Corner Filigrees */}
          <GoldCornerFiligree className="absolute top-3 left-3 sm:top-5 sm:left-5" />
          <GoldCornerFiligree className="absolute top-3 right-3 sm:top-5 sm:right-5 scale-x-[-1]" />
          <GoldCornerFiligree className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 scale-y-[-1]" />
          <GoldCornerFiligree className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 scale-[-1]" />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Clean Unboxed Editorial Metadata */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-playfair text-[0.9rem] sm:text-[1.05rem] tracking-[0.14em] uppercase text-[#8f661d]">
              <span>Save the Date</span>
              <span aria-hidden="true">·</span>
              <span>December 15, 2026</span>
              <span aria-hidden="true">·</span>
              <span>Udaipur</span>
            </div>

            {/* Editorial Serif Headline */}
            <h2
              id="countdown-heading"
              className="font-playfair mt-3 sm:mt-4 text-[#5c1a1b] font-normal leading-[1.02] tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(2.15rem, 4.4vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              Counting down to{' '}
              <span className="italic text-[#ef4a23]">forever</span>
            </h2>

            {/* Fine Ornamental Gold Rule */}
            <div className="flex items-center justify-center gap-3 my-6 sm:my-8 w-full max-w-xs" aria-hidden="true">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59436]/65 to-[#c59436]" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#c59436]" fill="none">
                <path
                  d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c59436]/65 to-[#c59436]" />
            </div>

            {/* Live Editorial Countdown Grid */}
            {isComplete ? (
              <p className="font-playfair italic text-[1.75rem] sm:text-[2.4rem] text-[#ef4a23] py-6">
                Today we celebrate the beginning of our forever.
              </p>
            ) : (
              <div
                role="timer"
                aria-live="off"
                aria-label={`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until Ram and Sita's wedding`}
                className="w-full grid grid-cols-2 sm:grid-cols-4 border-y border-[#c59436]/30 divide-[#c59436]/25"
              >
                {units.map((unit, idx) => (
                  <div
                    key={unit.label}
                    className={`flex flex-col items-center justify-center py-5 sm:py-8 px-2 sm:px-4 ${
                      idx % 2 === 1 ? 'border-l border-[#c59436]/25' : ''
                    } ${idx >= 2 ? 'border-t sm:border-t-0 border-[#c59436]/25' : ''} ${
                      idx > 0 ? 'sm:border-l sm:border-[#c59436]/25' : ''
                    }`}
                  >
                    <span
                      className="font-playfair tabular-nums leading-none text-[#5c1a1b] tracking-[-0.03em]"
                      style={{
                        fontSize: 'clamp(2.6rem, 5.4vw, 4.75rem)',
                        fontVariationSettings: '"wght" 350, "wdth" 92, "opsz" 120',
                      }}
                    >
                      {unit.value}
                    </span>
                    <span className="mt-2 sm:mt-3 font-playfair italic text-[0.95rem] sm:text-[1.15rem] tracking-[0.06em] text-[#7c5819]">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Editorial Closing Caption */}
            <p className="mt-6 sm:mt-8 font-playfair italic text-[1.02rem] sm:text-[1.2rem] text-[#5c1a1b]/75 max-w-lg leading-relaxed">
              Until the shehnai plays at The Leela Palace by Lake Pichola.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
