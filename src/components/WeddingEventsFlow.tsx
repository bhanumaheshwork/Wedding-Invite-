import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import {
  EventFloralCrestSVG,
  EventFloralVineDividerSVG,
  FloralDayKind,
  StickyBotanicalGarlandSVG,
} from './BloomingFloralMotifs';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

interface WeddingEventDay {
  id: string;
  dayNumber: string;
  dayLabel: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  description: string;
  image: string;
  imageAlt: string;
  side: 'left' | 'right';
  rotateClass: string;
  accentHex: string;
  floralKind: FloralDayKind;
}

const WEDDING_EVENTS: WeddingEventDay[] = [
  {
    id: 'event-day-1',
    dayNumber: '01',
    dayLabel: 'Day 1',
    title: 'Mehandi',
    subtitle: 'Intricate Henna & Folk Melodies',
    date: 'Dec 11, 2026',
    time: '3:00 PM Onwards',
    venue: 'Zenith Courtyard',
    dressCode: 'Emerald & Botanicals',
    description:
      'An afternoon of artisanal henna, dholki folk songs, fresh jasmine gajras, and sun-dappled courtyard laughter.',
    image: '/src/assets/images/event_mehandi_day1_1795781101429.jpg',
    imageAlt: 'Bride hands adorned with intricate Mehandi henna over emerald silk cushions',
    side: 'left',
    rotateClass: 'lg:-rotate-2',
    accentHex: '#1f6f54',
    floralKind: 'mehandi',
  },
  {
    id: 'event-day-2',
    dayNumber: '02',
    dayLabel: 'Day 2',
    title: 'Haldi',
    subtitle: 'Marigolds & Golden Sunshine',
    date: 'Dec 12, 2026',
    time: '10:30 AM Onwards',
    venue: 'Sandstone Poolside Lawn',
    dressCode: 'Marigold, Mustard & Ivory',
    description:
      'Showering Ram & Sita in fragrant turmeric, cascading marigold petals, and joyful morning blessings under Udaipur skies.',
    image: '/src/assets/images/haldi_day2_single_1795781148674.jpg',
    imageAlt: 'Couple laughing on a marigold-draped swing during the sunlit Haldi ceremony',
    side: 'right',
    rotateClass: 'lg:rotate-2',
    accentHex: '#c58415',
    floralKind: 'haldi',
  },
  {
    id: 'event-day-3',
    dayNumber: '03',
    dayLabel: 'Day 3',
    title: 'Carnival',
    subtitle: 'Royal Fair, Chaat & Bangle Carts',
    date: 'Dec 13, 2026',
    time: '1:00 PM Onwards',
    venue: 'Palace Heritage Gardens',
    dressCode: 'Vibrant Pastel Chic',
    description:
      'A breezy afternoon mela with Rajasthani umbrellas, handcrafted bangle carts, chilled rose sharbat, and lively lawn games.',
    image: '/src/assets/images/carnival_day3_single_1795781144001.jpg',
    imageAlt: 'Colorful afternoon wedding carnival on sunlit Udaipur palace lawns with umbrellas and bangle carts',
    side: 'left',
    rotateClass: 'lg:-rotate-1',
    accentHex: '#d45547',
    floralKind: 'carnival',
  },
  {
    id: 'event-day-4',
    dayNumber: '04',
    dayLabel: 'Day 4',
    title: 'Sangeet',
    subtitle: 'Music, Dance & Starlit Toasts',
    date: 'Dec 14, 2026',
    time: '7:30 PM Onwards',
    venue: 'Maharaja Courtyard & Ballroom',
    dressCode: 'Indo-Western Glamour',
    description:
      'Beneath glowing chandeliers and cascading fairy lights, both families take the floor for an unforgettable night of rhythm and dance.',
    image: '/src/assets/images/event_sangeet_day4_1795781105393.jpg',
    imageAlt: 'Grand heritage courtyard illuminated with chandeliers and fairy lights during the Sangeet dance',
    side: 'right',
    rotateClass: 'lg:rotate-2',
    accentHex: '#9c3648',
    floralKind: 'sangeet',
  },
  {
    id: 'event-day-5',
    dayNumber: '05',
    dayLabel: 'Day 5',
    title: 'Wedding',
    subtitle: 'Baraat, Sacred Vows & Seven Pheras',
    date: 'Dec 15, 2026',
    time: '9:00 AM Muhurat',
    venue: 'Lotus Pavilion by Lake Pichola',
    dressCode: 'Royal Traditional Silk',
    description:
      'Vedic chants, jasmine garlands, and the sacred fire overlooking shimmering Lake Pichola as Ram & Sita unite forever.',
    image: '/src/assets/images/event_wedding_day5_1795781106800.jpg',
    imageAlt: 'Carved sandstone wedding mandap draped in jasmine and roses overlooking Lake Pichola',
    side: 'left',
    rotateClass: 'lg:-rotate-2',
    accentHex: '#ef4a23',
    floralKind: 'wedding',
  },
  {
    id: 'event-day-6',
    dayNumber: '06',
    dayLabel: 'Day 6',
    title: 'Reception',
    subtitle: 'Lakeside Gala & Candlelit Feast',
    date: 'Dec 16, 2026',
    time: '7:30 PM Onwards',
    venue: 'Zenith Lakeside Terrace',
    dressCode: 'Evening Elegance',
    description:
      'A glowing twilight farewell banquet along the water with tall brass candlesticks, heartfelt toasts, and music beneath the stars.',
    image: '/src/assets/images/event_reception_day6_1795781106663.jpg',
    imageAlt: 'Candlelit lakeside wedding reception dinner with floral runners and brass candlesticks in Udaipur',
    side: 'right',
    rotateClass: 'lg:rotate-1',
    accentHex: '#7d5620',
    floralKind: 'reception',
  },
];

interface WeddingEventsFlowProps {
  onRsvpClick: () => void;
}

export const WeddingEventsFlow: React.FC<WeddingEventsFlowProps> = ({ onRsvpClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopFloralRef = useRef<HTMLDivElement>(null);
  const mobileFloralRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Scroll-driven GSAP DrawSVGPlugin blooming florals + desktop parallax depth
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions ?? {};
        const cleanups: (() => void)[] = [];

        // Helper to build a choreographed DrawSVG floral bloom timeline for a garland container
        const setupGarlandBloom = (
          container: HTMLElement | null,
          triggerEl: HTMLElement,
          start: string,
          end: string
        ) => {
          if (!container) return;
          const vines = container.querySelectorAll('.draw-vine');
          const leaves = container.querySelectorAll('.draw-leaf');
          const petals = container.querySelectorAll('.draw-petal');
          const bloomFills = container.querySelectorAll('.bloom-fill');
          const bloomGroups = container.querySelectorAll('.bloom-group');
          const dots = container.querySelectorAll('.bloom-dot');

          if (reduceMotion) {
            gsap.set([vines, leaves, petals], { drawSVG: '100%' });
            gsap.set(leaves, { fillOpacity: 0.16 });
            gsap.set(bloomFills, { fillOpacity: 0.22 });
            gsap.set(bloomGroups, { scale: 1 });
            gsap.set(dots, { scale: 1, autoAlpha: 1 });
            return;
          }

          gsap.set([vines, leaves, petals], { drawSVG: '0%' });
          gsap.set([leaves, bloomFills], { fillOpacity: 0 });
          gsap.set(bloomGroups, { scale: 0.84, transformOrigin: '50% 80%' });
          gsap.set(dots, { scale: 0, autoAlpha: 0, transformOrigin: 'center center' });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerEl,
              start,
              end,
              scrub: 0.65,
              refreshPriority: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(vines, { drawSVG: '100%', duration: 0.35, stagger: 0.05, ease: 'power1.inOut' }, 0)
            .to(leaves, { drawSVG: '100%', duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.22)
            .to(leaves, { fillOpacity: 0.16, duration: 0.25, ease: 'none' }, 0.38)
            .to(petals, { drawSVG: '100%', duration: 0.42, stagger: 0.04, ease: 'power2.out' }, 0.38)
            .to(bloomGroups, { scale: 1, duration: 0.42, ease: 'back.out(1.4)' }, 0.42)
            .to(bloomFills, { fillOpacity: 0.22, duration: 0.32, stagger: 0.03, ease: 'none' }, 0.56)
            .to(dots, { scale: 1, autoAlpha: 1, duration: 0.24, stagger: 0.04, ease: 'back.out(2)' }, 0.72);

          cleanups.push(() => {
            tl.scrollTrigger?.kill();
            tl.kill();
          });
        };

        // 1. Central botanical garland bloom across the Events Flow journey
        if (isDesktop) {
          setupGarlandBloom(desktopFloralRef.current, sectionEl, 'top 75%', 'bottom 85%');
        } else {
          setupGarlandBloom(
            mobileFloralRef.current,
            mobileFloralRef.current ?? sectionEl,
            'top 88%',
            'top 22%'
          );
        }

        // 2. Per-card blooming floral crest + botanical vine divider (desktop & mobile)
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;

          const stems = card.querySelectorAll('.card-draw-stem');
          const petals = card.querySelectorAll('.card-draw-petal');
          const dots = card.querySelectorAll('.card-bloom-dot');

          if (reduceMotion) {
            gsap.set([stems, petals], { drawSVG: '100%' });
            gsap.set(petals, { fillOpacity: 0.22 });
            gsap.set(dots, { scale: 1, autoAlpha: 1 });
          } else {
            gsap.set([stems, petals], { drawSVG: '0%' });
            gsap.set(petals, { fillOpacity: 0 });
            gsap.set(dots, { scale: 0, autoAlpha: 0, transformOrigin: 'center center' });

            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                end: 'top 28%',
                scrub: 0.6,
                refreshPriority: 1,
                invalidateOnRefresh: true,
              },
            });

            cardTl
              .to(stems, { drawSVG: '100%', duration: 0.38, stagger: 0.06, ease: 'power1.inOut' }, 0)
              .to(petals, { drawSVG: '100%', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0.2)
              .to(petals, { fillOpacity: 0.22, duration: 0.35, stagger: 0.04, ease: 'none' }, 0.5)
              .to(dots, { scale: 1, autoAlpha: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' }, 0.65);

            cleanups.push(() => {
              cardTl.scrollTrigger?.kill();
              cardTl.kill();
            });
          }

          // 3. Desktop subtle vertical parallax depth bounded safely inside section padding
          if (isDesktop && !reduceMotion) {
            const offset = idx % 2 === 0 ? 28 : 42;
            const parallaxTween = gsap.fromTo(
              card,
              { y: offset },
              {
                y: -offset,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  refreshPriority: 1,
                  invalidateOnRefresh: true,
                },
              }
            );

            cleanups.push(() => {
              parallaxTween.scrollTrigger?.kill();
              parallaxTween.kill();
            });
          }
        });

        return () => {
          cleanups.forEach((fn) => fn());
        };
      }
    );

    return () => mm.revert();
  }, []);

  // Sync active day indicator with visible event card
  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLElement => el !== null);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute('data-day-index');
            if (idxStr !== null) {
              const parsed = parseInt(idxStr, 10);
              if (!Number.isNaN(parsed)) setActiveDayIdx(parsed);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToDay = (index: number) => {
    setActiveDayIdx(index);
    const target = cardRefs.current[index];
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({
      top,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="family"
      ref={sectionRef}
      aria-labelledby="events-flow-heading"
      className="relative z-10 isolate bg-[#f7eedb] text-[#5c1a1b] overflow-x-clip"
    >
      {/* Full-Section Track Holding the Sticky Hand-Painted Indian Wedding Art Background (Zero Negative Margin) */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            src="/src/assets/images/events_mural_bg_1795781142569.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Soft warm-ivory atmospheric wash keeping painted palace domes & lotuses visible while preserving crisp center contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 68% 62% at 50% 48%, rgba(250,243,228,0.88) 0%, rgba(250,243,228,0.52) 58%, rgba(247,238,219,0.22) 100%)',
            }}
          />
        </div>
      </div>

      {/* Desktop Sticky Center Title Track (Zero Negative Margin) */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6">
          <div
            ref={desktopFloralRef}
            className="max-w-md xl:max-w-lg text-center pointer-events-auto flex flex-col items-center space-y-4"
          >
            {/* Scroll-Blooming Lotus & Vine Crown */}
            <StickyBotanicalGarlandSVG className="w-72 xl:w-80 h-auto mb-1" />

            <p className="font-playfair text-[1.1rem] tracking-[0.12em] uppercase text-[#8f661d]">
              Six Days of Festivities · Udaipur
            </p>
            <h2
              id="events-flow-heading"
              className="font-archivo text-[4.5rem] xl:text-[5.4rem] font-extrabold uppercase tracking-[-0.03em] leading-[0.86] text-[#5c1a1b]"
              style={{ textWrap: 'balance' }}
            >
              The Events{' '}
              <span className="block font-playfair font-light italic lowercase text-[4.3rem] xl:text-[5.1rem] text-[#ef4a23] mt-1">
                flow
              </span>
            </h2>
            <p className="font-playfair text-[1.18rem] leading-[1.45] text-[#5c1a1b]/85 max-w-sm mx-auto">
              From Mehandi melodies to our lakeside Reception, follow all six days of Ram &amp; Sita&apos;s celebration.
            </p>

            {/* Interactive Day 1 - Day 6 Progress Navigation */}
            <nav
              aria-label="Jump to wedding event day"
              className="pt-3 border-t border-[#c59436]/35 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              {WEDDING_EVENTS.map((ev, idx) => {
                const isActive = idx === activeDayIdx;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => scrollToDay(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`py-1.5 px-1 font-archivo text-[0.78rem] uppercase tracking-[0.1em] transition-colors cursor-pointer whitespace-nowrap border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23] ${
                      isActive
                        ? 'text-[#ef4a23] border-[#ef4a23]'
                        : 'text-[#5c1a1b]/65 border-transparent hover:text-[#5c1a1b]'
                    }`}
                  >
                    {ev.dayLabel} · {ev.title}
                  </button>
                );
              })}
            </nav>

            {/* Mirrored Scroll-Blooming Botanical Base */}
            <StickyBotanicalGarlandSVG inverted className="w-56 xl:w-64 h-auto opacity-85 pt-1" />
          </div>
        </div>
      </div>

      {/* Foreground Content Layer in Clean Document Flow */}
      <div className="relative z-20">
        {/* Mobile & Tablet Header (< 1024px) */}
        <div
          ref={mobileFloralRef}
          className="lg:hidden pt-16 pb-8 px-5 text-center max-w-xl mx-auto flex flex-col items-center space-y-3.5"
        >
          <StickyBotanicalGarlandSVG className="w-60 sm:w-72 h-auto mb-1" />

          <p className="font-playfair text-[0.95rem] tracking-[0.14em] uppercase text-[#8f661d]">
            Six Days of Festivities · Udaipur
          </p>
          <h2
            className="font-archivo text-[3.3rem] sm:text-[4.4rem] font-extrabold uppercase tracking-[-0.025em] leading-[0.88] text-[#5c1a1b]"
            style={{ textWrap: 'balance' }}
          >
            The Events{' '}
            <span className="font-playfair font-light italic lowercase text-[3.1rem] sm:text-[4.1rem] text-[#ef4a23]">
              flow
            </span>
          </h2>
          <p className="font-playfair text-[1.12rem] leading-[1.45] text-[#5c1a1b]/85 max-w-md mx-auto">
            From Day 1 Mehandi through Day 6 Reception — explore every celebration in order.
          </p>

          {/* Compact Mobile Quick-Jump Day Tabs (>= 44px touch targets) */}
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 pt-2"
            role="tablist"
            aria-label="Select wedding day"
          >
            {WEDDING_EVENTS.map((ev, idx) => {
              const isActive = idx === activeDayIdx;
              return (
                <button
                  key={ev.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => scrollToDay(idx)}
                  className={`min-h-[44px] px-3.5 rounded-lg font-archivo text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23] ${
                    isActive
                      ? 'bg-[#471418] text-[#faf3e4]'
                      : 'bg-[#faf3e4]/85 text-[#5c1a1b]/80 border border-[#c59436]/30 hover:bg-[#faf3e4]'
                  }`}
                >
                  {ev.dayLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chronological 6-Day Event Cards Flow (Desktop staggered left/right framing center title; Mobile clean single column) */}
        <div className="relative z-20 max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pt-2 lg:pt-[20vh] pb-24 lg:pb-[22vh] space-y-8 lg:space-y-24">
          {WEDDING_EVENTS.map((event, idx) => {
            const alignClass =
              event.side === 'left'
                ? 'lg:mr-auto lg:ml-0'
                : 'lg:ml-auto lg:mr-0';

            return (
              <article
                key={event.id}
                id={event.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-day-index={idx}
                className={`group w-full max-w-md lg:w-[24rem] xl:w-[26rem] mx-auto ${alignClass} bg-[#fcf8ee]/96 backdrop-blur-sm rounded-[1.75rem] p-4 sm:p-5 shadow-[0_24px_60px_-24px_rgba(92,26,27,0.3)] border border-[#c59436]/35 transition-transform duration-500 ${event.rotateClass} lg:hover:rotate-0`}
              >
                {/* Event Photo */}
                <div className="relative aspect-[3/4] w-full rounded-[1.25rem] overflow-hidden bg-[#e9dcc6]">
                  <img
                    src={event.image}
                    alt={event.imageAlt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle measured scrim at bottom for high-contrast day index */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#471418]/75 via-[#471418]/25 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-baseline justify-between text-[#faf3e4]">
                    <span className="font-archivo text-xs uppercase tracking-[0.16em] tabular-nums">
                      {event.dayLabel} · {event.date}
                    </span>
                    <span className="font-playfair italic text-sm text-[#ffd46e]">
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Editorial Event Details */}
                <div className="pt-5 px-1.5 pb-1 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span
                        className="block font-archivo text-[0.72rem] uppercase tracking-[0.16em] tabular-nums mb-1"
                        style={{ color: event.accentHex }}
                      >
                        {event.dayNumber} / 06
                      </span>
                      <h3 className="font-archivo text-[2rem] sm:text-[2.25rem] font-extrabold uppercase tracking-[-0.02em] leading-none text-[#5c1a1b]">
                        {event.title}
                      </h3>
                    </div>
                    {/* Scroll-Blooming Day Floral Crest (DrawSVGPlugin) */}
                    <EventFloralCrestSVG kind={event.floralKind} accentHex={event.accentHex} />
                  </div>

                  <p className="font-playfair italic text-[1.15rem] text-[#ef4a23] leading-snug">
                    {event.subtitle}
                  </p>

                  <p className="font-playfair text-[1.02rem] leading-[1.45] text-[#5c1a1b]/85">
                    {event.description}
                  </p>

                  {/* Scroll-Drawn Botanical Vine Divider */}
                  <EventFloralVineDividerSVG color={event.accentHex} className="w-full h-5 pt-1" />

                  {/* Clean Unboxed Venue & Attire Metadata */}
                  <div className="pt-1 flex flex-col gap-1 text-[0.9rem] font-playfair text-[#5c1a1b]/80">
                    <div>
                      <span className="font-archivo text-[0.7rem] uppercase tracking-[0.12em] text-[#8f661d] mr-2">
                        Venue
                      </span>
                      <span>{event.venue}</span>
                    </div>
                    <div>
                      <span className="font-archivo text-[0.7rem] uppercase tracking-[0.12em] text-[#8f661d] mr-2">
                        Attire
                      </span>
                      <span>{event.dressCode}</span>
                    </div>
                  </div>

                  {/* Working RSVP Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onRsvpClick}
                      className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#471418] text-[#faf3e4] font-archivo text-xs uppercase tracking-[0.14em] hover:bg-[#ef4a23] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23]"
                    >
                      Confirm for {event.dayLabel} · {event.title}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
