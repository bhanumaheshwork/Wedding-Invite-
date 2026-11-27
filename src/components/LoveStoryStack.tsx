import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type MotifType = 'lotus' | 'arch' | 'paisley' | 'diya' | 'mandala';

const STORY_CARD_ART_BG = '/src/assets/images/story_card_art_bg_1795783059698.jpg';

interface StoryChapter {
  id: string;
  number: string;
  era: string;
  title: string;
  body: string;
  motif: MotifType;
  footnote: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'story-chapter-01',
    number: '01',
    era: 'School Days',
    title: 'The Schoolyard Proposal',
    body: 'It all began between ringing bells, borrowed notebooks, and long walks home after class. One golden afternoon, Ram gathered every bit of courage he had and confessed his feelings to Sita—sparking a promise that turned a schoolyard crush into something timeless.',
    motif: 'lotus',
    footnote: 'Where a borrowed notebook became a lifelong promise',
  },
  {
    id: 'story-chapter-02',
    number: '02',
    era: 'The Early Years',
    title: 'Growing Up Side by Side',
    body: 'What started with shared tiffins, exam-week pep talks, and endless conversations quietly grew into an unshakable bond. As school uniforms gave way to college campuses and new chapters, every little victory still felt incomplete until they shared it with each other.',
    motif: 'arch',
    footnote: 'From school hallways to college dreams together',
  },
  {
    id: 'story-chapter-03',
    number: '03',
    era: 'Weathering the Storms',
    title: 'Through Every High & Low',
    body: "The road wasn't always smooth. Distance, career crossroads, stubborn arguments, and quiet doubts tested them more than once—but every challenge only taught them to listen deeper, forgive faster, and choose each other all over again.",
    motif: 'paisley',
    footnote: 'Every storm made the foundation stronger',
  },
  {
    id: 'story-chapter-04',
    number: '04',
    era: 'Making It Official',
    title: 'Two Families, One Blessing',
    body: 'When the moment was right, both families came together over warm chai, laughter, and stories from the past. Seeing the love and patience Ram and Sita had built over the years, everyone wholeheartedly agreed it was time to make it official.',
    motif: 'diya',
    footnote: 'Warm chai, laughter, and blessings from both homes',
  },
  {
    id: 'story-chapter-05',
    number: '05',
    era: 'Forever Begins · Dec 15, 2026',
    title: 'And We Said Yes',
    body: 'Surrounded by the people who watched them grow from schoolmates into soulmates, Ram and Sita said the easiest "Yes" of their lives—ready to begin their forever together in Udaipur.',
    motif: 'mandala',
    footnote: 'The Leela Palace · Udaipur, Rajasthan',
  },
];

const IndianMotif: React.FC<{ type: MotifType; color: string; className?: string }> = ({
  type,
  color,
  className = 'w-11 h-11',
}) => {
  switch (type) {
    case 'lotus':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M32 10C37.5 19.5 39 29 32 42C25 29 26.5 19.5 32 10Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M32 42C21.5 38 15 30 14 19C22.5 21 28.5 28 32 42Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M32 42C42.5 38 49 30 50 19C41.5 21 35.5 28 32 42Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M32 42C20 44 11 40 7 32C15 31 23 35 32 42Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M32 42C44 44 53 40 57 32C49 31 41 35 32 42Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M16 49H48" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="54" r="2" fill={color} />
        </svg>
      );
    case 'arch':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 54V28C14 21 18.5 18 22 16C26 14 29.5 11.5 32 8C34.5 11.5 38 14 42 16C45.5 18 50 21 50 28V54"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 54V31C20 26 23.5 23.5 26 22C28.5 20.5 30.5 18.5 32 16C33.5 18.5 35.5 20.5 38 22C40.5 23.5 44 26 44 31V54"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 54H54" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="32" cy="34" r="3" stroke={color} strokeWidth="1.5" />
          <path d="M32 25V28M32 40V43M23 34H26M38 34H41" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'paisley':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M32 10C44 10 51 20 51 31C51 44 41 54 28 54C18 54 12 46 13 36C14 26 22 22 28 24C34 26 35 33 31 37C27.5 40.5 22 39.5 21 35.5"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M32 10C26 10 21 13.5 18 18C23.5 16.5 28.5 17 33 19.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="27" cy="33" r="2.2" fill={color} />
          <circle cx="41" cy="24" r="1.6" fill={color} />
          <circle cx="43" cy="33" r="1.6" fill={color} />
          <circle cx="38" cy="42" r="1.6" fill={color} />
        </svg>
      );
    case 'diya':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M32 9C36.5 15.5 38 20.5 38 24.5C38 28 35.3 31 32 31C28.7 31 26 28 26 24.5C26 20.5 27.5 15.5 32 9Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M32 17C34 20.5 34.5 23 34.5 25C34.5 26.7 33.4 28 32 28C30.6 28 29.5 26.7 29.5 25C29.5 23 30 20.5 32 17Z"
            fill={color}
            fillOpacity="0.28"
          />
          <path
            d="M11 36C15 47 23 52 32 52C41 52 49 47 53 36C45 38.5 38.5 39.5 32 39.5C25.5 39.5 19 38.5 11 36Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M22 55H42" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 22L21 24M46 22L43 24M16 14L20 17M48 14L44 17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'mandala':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="8" stroke={color} strokeWidth="1.6" />
          <circle cx="32" cy="32" r="3" fill={color} />
          <circle cx="32" cy="32" r="18" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              key={angle}
              d="M32 8C35 13 35 17 32 21C29 17 29 13 32 8Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
              transform={`rotate(${angle} 32 32)`}
            />
          ))}
        </svg>
      );
  }
};

const StoryCardBody: React.FC<{ chapter: StoryChapter; total: number }> = React.memo(({ chapter, total }) => (
  <div
    className="relative w-full h-full min-h-[410px] sm:min-h-[430px] lg:min-h-0 bg-[#fcf7ea] text-[#5c1a1b] rounded-[1.75rem] lg:rounded-[2.1rem] border border-[#c59436]/55 px-8 py-9 sm:px-12 sm:py-11 lg:px-[clamp(3.6rem,5.5vw,5.4rem)] lg:pt-[clamp(3.6rem,7.2vh,5.2rem)] lg:pb-[clamp(4.2rem,8.2vh,5.8rem)] shadow-[0_12px_28px_-8px_rgba(92,26,27,0.24)] lg:shadow-[0_28px_70px_-20px_rgba(92,26,27,0.32)] flex flex-col justify-between overflow-hidden"
  >
    {/* Unified Fine-Art Rajasthani Stationery Background */}
    <img
      src={STORY_CARD_ART_BG}
      alt=""
      aria-hidden="true"
      decoding="async"
      referrerPolicy="no-referrer"
      className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-center lg:scale-[1.05]"
    />

    {/* Subtle luminous center ivory wash so Royal Maroon text stays crisp while painted borders & palace shine */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 72% 62% at 50% 46%, rgba(252,247,234,0.74) 0%, rgba(252,247,234,0.28) 68%, rgba(252,247,234,0.03) 100%)',
      }}
    />

    {/* Top Editorial Metadata & Unique Indian Motif */}
    <div className="relative z-10 flex items-center justify-between gap-4 px-1">
      <div className="flex items-center gap-2 font-archivo text-[0.76rem] sm:text-[0.84rem] lg:text-[clamp(0.76rem,1.45vh,0.95rem)] tracking-[0.14em] uppercase tabular-nums text-[#8f661d]">
        <span>Chapter {chapter.number}</span>
        <span aria-hidden="true">·</span>
        <span>{chapter.era}</span>
      </div>
      <IndianMotif
        type={chapter.motif}
        color="#ef4a23"
        className="w-9 h-9 sm:w-11 sm:h-11 lg:w-[clamp(2.5rem,5vh,3.4rem)] lg:h-[clamp(2.5rem,5vh,3.4rem)] shrink-0"
      />
    </div>

    {/* Main Narrative Typography */}
    <div className="relative z-10 my-5 sm:my-7 lg:my-[clamp(1rem,2.5vh,2.2rem)] px-1 space-y-2.5 sm:space-y-3.5 lg:space-y-[clamp(0.85rem,1.8vh,1.4rem)]">
      <h3
        className="font-archivo text-[2rem] sm:text-[2.7rem] lg:text-[clamp(2.35rem,5.1vh,3.65rem)] font-extrabold uppercase tracking-[-0.025em] leading-[0.94] text-[#5c1a1b]"
        style={{ textWrap: 'balance' }}
      >
        {chapter.title}
      </h3>
      <p className="font-playfair text-[1.06rem] sm:text-[1.22rem] lg:text-[clamp(1.08rem,2.3vh,1.48rem)] leading-[1.48] max-w-[44ch] text-[#5c1a1b]/90">
        {chapter.body}
      </p>
    </div>

    {/* Bottom Editorial Hairline Footer */}
    <div className="relative z-10 pt-3 sm:pt-3.5 lg:pt-[clamp(0.7rem,1.5vh,1.1rem)] px-1 border-t border-[#c59436]/45 flex items-center justify-between gap-4">
      <p className="font-playfair italic text-[0.92rem] sm:text-[1rem] lg:text-[clamp(0.9rem,1.7vh,1.1rem)] leading-snug text-[#5c1a1b]/85">
        {chapter.footnote}
      </p>
      <span className="font-archivo text-[0.78rem] lg:text-[clamp(0.78rem,1.4vh,0.92rem)] tracking-[0.12em] uppercase tabular-nums whitespace-nowrap shrink-0 text-[#8f661d]">
        {chapter.number} / 0{total}
      </span>
    </div>
  </div>
));
StoryCardBody.displayName = 'StoryCardBody';

export const LoveStoryStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Watch prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Desktop GSAP Pinned 3D Peeling Stack + Pointer Tilt
  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const slides = slideRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const count = slides.length;
      if (count === 0) return;

      const depth = 110;
      const offset = Math.min(24, Math.max(14, Math.round(window.innerHeight * 0.023)));
      const holdDuration = 0.55;
      const totalDuration = count - 1 + holdDuration;

      // Initial 3D depth positioning
      slides.forEach((slide, idx) => {
        gsap.set(slide, {
          z: -idx * depth,
          y: -idx * offset,
          zIndex: count - idx,
          autoAlpha: 1,
          force3D: true,
        });
      });

      const tl = gsap.timeline({ paused: true });

      for (let b = 0; b < count - 1; b++) {
        const dropDistance = () => window.innerHeight * 0.9;

        tl.to(
          slides[b],
          {
            y: () => `+=${dropDistance()}`,
            duration: 1,
            ease: 'power2.in',
          },
          b
        );

        tl.to(
          slides[b],
          {
            autoAlpha: 0,
            duration: 0.28,
            ease: 'none',
          },
          b + 0.65
        );

        for (let k = b + 1; k < count; k++) {
          const newIdx = k - (b + 1);
          tl.to(
            slides[k],
            {
              z: -newIdx * depth,
              y: -newIdx * offset,
              duration: 1,
              ease: 'none',
            },
            b
          );
        }
      }

      // Brief pinned dwell after Chapter 05 lands so guests can read it before unpinning
      tl.to({}, { duration: holdDuration }, count - 1);

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.12 * totalDuration}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.35,
        refreshPriority: 2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          tl.progress(self.progress);
          const activeStep = Math.min(count - 1, Math.round(Math.min(self.progress * totalDuration, count - 1)));
          setActiveIndex((prev) => (prev === activeStep ? prev : activeStep));
        },
      });

      triggerRef.current = st;

      const refreshOnReady = () => ScrollTrigger.refresh();
      window.addEventListener('load', refreshOnReady);
      document.fonts?.ready.then(refreshOnReady);

      // Subtle pointer-driven 3D tilt (only fine hover pointer & no reduced motion)
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pinEl = pinRef.current;
      const rootEl = stackRootRef.current;

      let cleanupMouse = () => {};
      if (finePointer && !reduced && pinEl && rootEl) {
        const tiltXTo = gsap.quickTo(rootEl, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const tiltYTo = gsap.quickTo(rootEl, 'rotationY', { duration: 0.6, ease: 'power3.out' });

        const onMouseMove = (e: MouseEvent) => {
          const rect = pinEl.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          tiltXTo(-relY * 6);
          tiltYTo(relX * 10);
        };

        const onMouseLeave = () => {
          tiltXTo(0);
          tiltYTo(0);
        };

        pinEl.addEventListener('mousemove', onMouseMove);
        pinEl.addEventListener('mouseleave', onMouseLeave);
        cleanupMouse = () => {
          pinEl.removeEventListener('mousemove', onMouseMove);
          pinEl.removeEventListener('mouseleave', onMouseLeave);
        };
      }

      return () => {
        window.removeEventListener('load', refreshOnReady);
        cleanupMouse();
        st.kill();
        tl.kill();
        triggerRef.current = null;
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Mobile chapter tracking via non-sticky flow sentinels (prevents sticky-card observer ping-pong & re-render jitter)
  useEffect(() => {
    const sentinels = mobileSentinelRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (sentinels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.matchMedia('(min-width: 1024px)').matches) return;

        let latestPassed = -1;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute('data-sentinel-index');
            if (idxAttr !== null) {
              const parsed = parseInt(idxAttr, 10);
              if (!Number.isNaN(parsed) && parsed > latestPassed) {
                latestPassed = parsed;
              }
            }
          }
        });

        if (latestPassed !== -1) {
          setActiveIndex((prev) => (prev === latestPassed ? prev : latestPassed));
        }
      },
      { rootMargin: '-12% 0px -65% 0px', threshold: 0 }
    );

    sentinels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleJumpToChapter = (index: number) => {
    setActiveIndex(index);

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop && triggerRef.current) {
      const st = triggerRef.current;
      const totalDuration = STORY_CHAPTERS.length - 1 + 0.55;
      const ratio = index / totalDuration;
      const targetY = st.start + ratio * (st.end - st.start);
      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
      return;
    }

    const sentinel = mobileSentinelRefs.current[index];
    if (sentinel) {
      const stickyOffset = 20 + index * 12;
      const top = sentinel.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-labelledby="love-story-heading"
      className="relative z-20 bg-[#faf3e4] text-[#5c1a1b] lg:isolate lg:overflow-x-clip"
    >
      {/* DESKTOP (>= 1024px): Pinned 100vh 3D Peeling Stack */}
      <div
        ref={pinRef}
        className="hidden lg:grid h-screen w-full grid-cols-12 gap-6 px-10 xl:px-16 pt-[min(2.5rem,4.5vh)] pb-[min(2rem,4vh)] items-center overflow-hidden bg-[#faf3e4]"
      >
        {/* Left Editorial Column */}
        <div className="col-span-5 flex flex-col justify-center gap-[clamp(0.9rem,2.2vh,1.75rem)] z-10 min-h-0">
          <div className="space-y-[clamp(0.45rem,1.2vh,0.95rem)]">
            <p className="font-playfair text-[clamp(0.95rem,2.05vh,1.45rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[#5c1a1b]/85 max-w-[26rem]">
              From school hallways to Udaipur. Five chapters that carried a quiet crush all the way to forever.
            </p>
            <h2
              id="love-story-heading"
              className="font-archivo text-[clamp(2.6rem,7.2vh,5.2rem)] font-bold uppercase tracking-[-0.025em] leading-[0.84] text-[#5c1a1b]"
              style={{ textWrap: 'balance' }}
            >
              Our Love <br />
              <span className="font-playfair font-light italic lowercase text-[clamp(2.3rem,6.4vh,4.6rem)] tracking-[-0.03em] text-[#ef4a23]">
                story
              </span>
            </h2>
          </div>

          {/* Live Chapter Progress & Interactive Step Switcher */}
          <div className="pt-[clamp(0.55rem,1.4vh,1rem)] border-t border-[#5c1a1b]/20 max-w-[26rem] space-y-[clamp(0.35rem,0.9vh,0.7rem)]">
            <div className="flex items-center justify-between text-[clamp(0.66rem,1.2vh,0.78rem)] font-archivo uppercase tracking-[0.14em] text-[#5c1a1b]/70 tabular-nums">
              <span>Now Reading</span>
              <span>
                {STORY_CHAPTERS[activeIndex].number} / 0{STORY_CHAPTERS.length}
              </span>
            </div>

            <nav aria-label="Story chapters" className="flex flex-col gap-[clamp(0.12rem,0.4vh,0.3rem)]">
              {STORY_CHAPTERS.map((chapter, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => handleJumpToChapter(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`group flex items-center justify-between gap-3 py-[clamp(0.3rem,0.8vh,0.52rem)] px-3 rounded-lg text-left transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23] ${
                      isActive
                        ? 'bg-[#471418] text-[#faf3e4]'
                        : 'text-[#5c1a1b]/75 hover:text-[#5c1a1b] hover:bg-[#5c1a1b]/6'
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-archivo text-[clamp(0.68rem,1.2vh,0.78rem)] tabular-nums tracking-wider shrink-0 ${
                          isActive ? 'text-[#ffd46e]' : 'text-[#ef4a23]'
                        }`}
                      >
                        {chapter.number}
                      </span>
                      <span className="font-playfair text-[clamp(0.84rem,1.7vh,1.04rem)] leading-tight truncate">
                        {chapter.title}
                      </span>
                    </span>
                    <span
                      className={`font-archivo text-[clamp(0.58rem,1vh,0.68rem)] uppercase tracking-wider whitespace-nowrap shrink-0 ${
                        isActive ? 'text-[#faf3e4]/80' : 'text-[#5c1a1b]/55'
                      }`}
                    >
                      {chapter.era.split('·')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right 3D Perspective Stage */}
        <div className="col-span-7 relative h-full flex items-center justify-center" style={{ perspective: '1400px' }}>
          <div
            ref={stackRootRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {STORY_CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.id}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className="absolute left-1/2 top-[53%] w-[min(54rem,56vw,96vh)] h-[min(40rem,74vh)]"
                style={{ translate: '-50% -50%' }}
              >
                <StoryCardBody chapter={chapter} total={STORY_CHAPTERS.length} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET (< 1024px): Tactile Sticky-Stacked Editorial Deck */}
      <div className="lg:hidden py-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <p className="font-playfair text-[1.25rem] sm:text-[1.45rem] font-medium leading-[1.25] text-[#5c1a1b]/85 max-w-md mx-auto">
              From school hallways to Udaipur. Five chapters that carried a quiet crush all the way to forever.
            </p>
            <h2
              className="font-archivo text-[3.4rem] sm:text-[4.6rem] font-bold uppercase tracking-[-0.025em] leading-[0.86] text-[#5c1a1b]"
              style={{ textWrap: 'balance' }}
            >
              Our Love{' '}
              <span className="font-playfair font-light italic lowercase text-[3.1rem] sm:text-[4.2rem] text-[#ef4a23]">
                story
              </span>
            </h2>

            {/* Compact Interactive Chapter Switcher (>= 44px touch targets) */}
            <div
              className="flex items-center justify-center gap-1.5 pt-3"
              role="tablist"
              aria-label="Jump to story chapter"
            >
              {STORY_CHAPTERS.map((chapter, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleJumpToChapter(idx)}
                    className={`min-w-[44px] min-h-[44px] rounded-full font-archivo text-xs tabular-nums tracking-wider transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23] ${
                      isActive
                        ? 'bg-[#471418] text-[#faf3e4]'
                        : 'bg-[#5c1a1b]/10 text-[#5c1a1b]/80 hover:bg-[#5c1a1b]/15'
                    }`}
                  >
                    {chapter.number}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smooth GPU-Stabilized Sticky-Overlaying Card Stack on Mobile */}
          <div className="relative pb-10">
            {STORY_CHAPTERS.map((chapter, idx) => (
              <React.Fragment key={chapter.id}>
                {/* Non-sticky flow sentinel used for stable chapter sync & jump-to-chapter */}
                <div
                  ref={(el) => {
                    mobileSentinelRefs.current[idx] = el;
                  }}
                  data-sentinel-index={idx}
                  aria-hidden="true"
                  className={idx === 0 ? 'h-0' : 'h-8'}
                />
                <article
                  className={prefersReducedMotion ? 'relative' : 'sticky'}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          top: `${20 + idx * 12}px`,
                          zIndex: idx + 1,
                          transform: 'translate3d(0, 0, 0)',
                          WebkitBackfaceVisibility: 'hidden',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform',
                        }
                  }
                >
                  <StoryCardBody chapter={chapter} total={STORY_CHAPTERS.length} />
                </article>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
