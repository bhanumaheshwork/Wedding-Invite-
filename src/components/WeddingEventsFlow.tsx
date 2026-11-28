import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import {
  EventFloralCrestSVG,
  EventFloralVineDividerSVG,
  FloralDayKind,
  StickyBotanicalGarlandSVG,
} from './BloomingFloralMotifs';
import { VintageWeddingCar3D, VintageWeddingCarRefs } from './VintageWeddingCar3D';

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
      'Showering Vaibhav & Trisha in fragrant turmeric, cascading marigold petals, and joyful morning blessings under Udaipur skies.',
    image: '/src/assets/images/haldi_day2_single_1795781148674.jpg',
    imageAlt: 'Couple laughing on a marigold-draped swing during the sunlit Haldi ceremony',
    side: 'right',
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
      'Vedic chants, jasmine garlands, and the sacred fire overlooking shimmering Lake Pichola as Vaibhav & Trisha unite forever.',
    image: '/src/assets/images/event_wedding_day5_1795781106800.jpg',
    imageAlt: 'Carved sandstone wedding mandap draped in jasmine and roses overlooking Lake Pichola',
    side: 'left',
    accentHex: '#b84a27',
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
    accentHex: '#7d5620',
    floralKind: 'reception',
  },
];

interface RoutePoint {
  x: number;
  y: number;
}

interface RouteGeometry {
  width: number;
  height: number;
  pathD: string;
  stopPoints: RoutePoint[];
  isDesktop: boolean;
}

interface PathSample {
  x: number;
  y: number;
  angleDeg: number; // Continuous unwrapped heading angle
  steerDeg: number;
  bankDeg: number;
}

/**
 * Generates a continuous, C1-smooth calligraphic S-curve in exact pixel coordinates
 * of the journey container so the 3D vintage wedding car never distorts or clips.
 */
function buildCalligraphicRoute(
  width: number,
  height: number,
  rowMetrics: Array<{ top: number; height: number }>,
  isDesktop: boolean
): RouteGeometry {
  if (width <= 0 || height <= 0 || rowMetrics.length === 0) {
    return { width: 1, height: 1, pathD: '', stopPoints: [], isDesktop };
  }

  const stopPoints: RoutePoint[] = [];

  if (isDesktop) {
    const rightLaneX = width * 0.65;
    const leftLaneX = width * 0.35;

    rowMetrics.forEach((m, idx) => {
      const stopX = idx % 2 === 0 ? rightLaneX : leftLaneX;
      const stopY = m.top + m.height * 0.44;
      stopPoints.push({ x: stopX, y: stopY });
    });

    const startX = width * 0.56;
    const startY = 16;
    const first = stopPoints[0];
    const leadDy = Math.max(80, first.y - startY);

    let d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    d += ` C ${(startX + width * 0.08).toFixed(1)} ${(startY + leadDy * 0.35).toFixed(1)}, ${first.x.toFixed(1)} ${(first.y - leadDy * 0.45).toFixed(1)}, ${first.x.toFixed(1)} ${first.y.toFixed(1)}`;

    for (let i = 0; i < stopPoints.length - 1; i++) {
      const curr = stopPoints[i];
      const next = stopPoints[i + 1];
      const dy = next.y - curr.y;
      const bowOut = i % 2 === 0 ? width * 0.045 : -width * 0.045;
      const c1x = curr.x + bowOut;
      const c1y = curr.y + dy * 0.52;
      const c2x = next.x - bowOut;
      const c2y = next.y - dy * 0.52;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    }

    const last = stopPoints[stopPoints.length - 1];
    const endX = width * 0.5;
    const endY = Math.max(last.y + 110, height - 22);
    const tailDy = endY - last.y;
    d += ` C ${last.x.toFixed(1)} ${(last.y + tailDy * 0.55).toFixed(1)}, ${(endX - width * 0.06).toFixed(1)} ${(endY - tailDy * 0.25).toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

    return { width, height, pathD: d, stopPoints, isDesktop };
  }

  // Mobile & Tablet (< 1024px): sweeping bends above each card + smooth outer margin glide
  const leftMarginX = Math.max(20, Math.min(30, width * 0.065));
  const rightMarginX = width - leftMarginX;
  const startX = width * 0.64;
  const startY = 14;

  let d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;
  let prevX = startX;
  let prevY = startY;

  rowMetrics.forEach((m, idx) => {
    const isLeftCurve = idx % 2 === 0;
    const marginX = isLeftCurve ? leftMarginX : rightMarginX;
    const stopX = isLeftCurve ? width * 0.2 : width * 0.8;
    const stopY = m.top + 38;
    stopPoints.push({ x: stopX, y: stopY });

    const sweepDy = Math.max(36, stopY - prevY);
    const cp1x = prevX;
    const cp1y = prevY + sweepDy * 0.58;
    const cp2x = stopX + (isLeftCurve ? width * 0.14 : -width * 0.14);
    const cp2y = stopY - sweepDy * 0.34;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${stopX.toFixed(1)} ${stopY.toFixed(1)}`;

    const laneTopY = m.top + 96;
    const laneBottomY = m.top + m.height - 16;
    d += ` C ${marginX.toFixed(1)} ${(stopY + 18).toFixed(1)}, ${marginX.toFixed(1)} ${(laneTopY - 20).toFixed(1)}, ${marginX.toFixed(1)} ${laneTopY.toFixed(1)}`;

    const midY = (laneTopY + laneBottomY) / 2;
    const waveOffset = isLeftCurve ? -5 : 5;
    d += ` Q ${(marginX + waveOffset).toFixed(1)} ${midY.toFixed(1)}, ${marginX.toFixed(1)} ${laneBottomY.toFixed(1)}`;

    prevX = marginX;
    prevY = laneBottomY;
  });

  const endX = width * 0.5;
  const endY = Math.max(prevY + 76, height - 18);
  d += ` C ${prevX.toFixed(1)} ${(prevY + 46).toFixed(1)}, ${(endX + width * 0.12).toFixed(1)} ${(endY - 26).toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

  return { width, height, pathD: d, stopPoints, isDesktop };
}

interface WeddingEventsFlowProps {
  onRsvpClick: () => void;
}

export const WeddingEventsFlow: React.FC<WeddingEventsFlowProps> = ({ onRsvpClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerFloralRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const basePathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const carPartsRef = useRef<VintageWeddingCarRefs>({
    tiltEl: null,
    frontLeftWheel: null,
    frontRightWheel: null,
  });

  const [route, setRoute] = useState<RouteGeometry>({
    width: 1,
    height: 1,
    pathD: '',
    stopPoints: [],
    isDesktop: true,
  });
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [reachedDayIdx, setReachedDayIdx] = useState(0);

  const activeDayRef = useRef(0);
  const reachedDayRef = useRef(0);
  const lastProgressRef = useRef(0.01);
  const lastWindowWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Measure container & 6 row positions safely (immune to iOS Safari URL-bar height jitter)
  const recomputeRoute = useCallback(() => {
    const journeyEl = journeyRef.current;
    if (!journeyEl) return;

    const width = Math.round(journeyEl.clientWidth);
    const height = Math.round(journeyEl.scrollHeight);
    if (width <= 0 || height <= 0) return;

    const isDesktop = window.innerWidth >= 1024;
    const metrics = WEDDING_EVENTS.map((_, idx) => {
      const row = rowRefs.current[idx];
      if (!row) return { top: idx * 420 + 80, height: 340 };
      return { top: row.offsetTop, height: row.offsetHeight };
    });

    setRoute((prev) => {
      // Ignore sub-threshold micro-reflows so iOS Safari never tears down ScrollTrigger mid-scroll
      if (
        prev.pathD &&
        prev.isDesktop === isDesktop &&
        Math.abs(prev.width - width) < 4 &&
        Math.abs(prev.height - height) < 18
      ) {
        return prev;
      }
      return buildCalligraphicRoute(width, height, metrics, isDesktop);
    });
  }, []);

  useLayoutEffect(() => {
    recomputeRoute();

    const journeyEl = journeyRef.current;
    let debounceTimer: number | null = null;
    const scheduleMeasure = () => {
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        recomputeRoute();
      }, 180);
    };

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleMeasure) : null;
    if (ro && journeyEl) {
      ro.observe(journeyEl);
    }

    // Only react to genuine horizontal resizes / orientation changes — ignore iPhone URL-bar vertical resize!
    const handleResize = () => {
      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - lastWindowWidthRef.current) >= 4) {
        lastWindowWidthRef.current = nextWidth;
        scheduleMeasure();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.fonts?.ready.then(scheduleMeasure);

    return () => {
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      ro?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [recomputeRoute]);

  // Lightweight one-shot DrawSVG floral blooms (plays once on arrival — zero per-frame scroll CPU drag on iPhone!)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    const headerEl = headerFloralRef.current;
    if (headerEl) {
      const vines = headerEl.querySelectorAll('.draw-vine');
      const leaves = headerEl.querySelectorAll('.draw-leaf');
      const petals = headerEl.querySelectorAll('.draw-petal');
      const bloomFills = headerEl.querySelectorAll('.bloom-fill');
      const bloomGroups = headerEl.querySelectorAll('.bloom-group');
      const dots = headerEl.querySelectorAll('.bloom-dot');

      if (reduceMotion) {
        gsap.set([vines, leaves, petals], { drawSVG: '100%' });
        gsap.set(leaves, { fillOpacity: 0.16 });
        gsap.set(bloomFills, { fillOpacity: 0.22 });
        gsap.set(bloomGroups, { scale: 1 });
        gsap.set(dots, { scale: 1, autoAlpha: 1 });
      } else {
        gsap.set([vines, leaves, petals], { drawSVG: '0%' });
        gsap.set([leaves, bloomFills], { fillOpacity: 0 });
        gsap.set(bloomGroups, { scale: 0.86, transformOrigin: '50% 80%' });
        gsap.set(dots, { scale: 0, autoAlpha: 0, transformOrigin: 'center center' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 86%',
            once: true,
          },
        });

        tl.to(vines, { drawSVG: '100%', duration: 0.55, stagger: 0.05, ease: 'power1.inOut' }, 0)
          .to(leaves, { drawSVG: '100%', duration: 0.45, stagger: 0.04, ease: 'power2.out' }, 0.2)
          .to(leaves, { fillOpacity: 0.16, duration: 0.35, ease: 'none' }, 0.4)
          .to(petals, { drawSVG: '100%', duration: 0.55, stagger: 0.04, ease: 'power2.out' }, 0.35)
          .to(bloomGroups, { scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.4)
          .to(bloomFills, { fillOpacity: 0.22, duration: 0.35, stagger: 0.03, ease: 'none' }, 0.55)
          .to(dots, { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(1.8)' }, 0.68);

        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      }
    }

    cardRefs.current.forEach((card) => {
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
            once: true,
          },
        });

        cardTl
          .to(stems, { drawSVG: '100%', duration: 0.45, stagger: 0.05, ease: 'power1.inOut' }, 0)
          .to(petals, { drawSVG: '100%', duration: 0.55, stagger: 0.04, ease: 'power2.out' }, 0.18)
          .to(petals, { fillOpacity: 0.22, duration: 0.35, stagger: 0.03, ease: 'none' }, 0.45)
          .to(dots, { scale: 1, autoAlpha: 1, duration: 0.28, stagger: 0.04, ease: 'back.out(1.8)' }, 0.6);

        cleanups.push(() => {
          cardTl.scrollTrigger?.kill();
          cardTl.kill();
        });
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Ultra-fast O(1) LUT-driven 3D Vintage Car scroll animation (zero SVG geometry queries during scroll!)
  useEffect(() => {
    const journeyEl = journeyRef.current;
    const basePathEl = basePathRef.current;
    const activePathEl = activePathRef.current;
    const carEl = carWrapperRef.current;

    if (!journeyEl || !basePathEl || !activePathEl || !carEl || !route.pathD) return;

    const totalLength = basePathEl.getTotalLength();
    if (!totalLength || !Number.isFinite(totalLength)) return;

    // 1. Precompute 360-entry lookup table ONCE (zero getPointAtLength calls during scroll!)
    const LUT_STEPS = 360;
    const lut: PathSample[] = new Array(LUT_STEPS + 1);
    let prevAngleDeg: number | null = null;

    for (let s = 0; s <= LUT_STEPS; s++) {
      const t = s / LUT_STEPS;
      const len = t * totalLength;
      const pt = basePathEl.getPointAtLength(len);
      const ptBehind = basePathEl.getPointAtLength(Math.max(0, len - 10));
      const ptAhead = basePathEl.getPointAtLength(Math.min(totalLength, len + 10));

      const headingRad = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x);
      let angleDeg = (headingRad * 180) / Math.PI;

      // Unwrap heading continuously so interpolating across -180/+180 never flips the car
      if (prevAngleDeg !== null) {
        while (angleDeg - prevAngleDeg > 180) angleDeg -= 360;
        while (angleDeg - prevAngleDeg < -180) angleDeg += 360;
      }
      prevAngleDeg = angleDeg;

      const ptFarAhead = basePathEl.getPointAtLength(Math.min(totalLength, len + 34));
      const aheadRad = Math.atan2(ptFarAhead.y - pt.y, ptFarAhead.x - pt.x);
      let deltaRad = aheadRad - headingRad;
      while (deltaRad > Math.PI) deltaRad -= Math.PI * 2;
      while (deltaRad < -Math.PI) deltaRad += Math.PI * 2;
      const deltaDeg = (deltaRad * 180) / Math.PI;

      lut[s] = {
        x: pt.x,
        y: pt.y,
        angleDeg,
        steerDeg: Math.max(-22, Math.min(22, deltaDeg * 1.35)),
        bankDeg: Math.max(-12, Math.min(12, deltaDeg * 0.65)),
      };
    }

    // 2. Match each stop medallion to its exact normalized path ratio using the LUT
    const stopRatios = route.stopPoints.map((sp) => {
      let bestIdx = 0;
      let bestDistSq = Infinity;
      for (let s = 0; s <= LUT_STEPS; s++) {
        const dx = lut[s].x - sp.x;
        const dy = lut[s].y - sp.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < bestDistSq) {
          bestDistSq = dSq;
          bestIdx = s;
        }
      }
      return bestIdx / LUT_STEPS;
    });

    activePathEl.style.strokeDasharray = `${totalLength.toFixed(1)}`;
    const carScale = route.isDesktop ? 1 : 0.72;

    const applyCarPose = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      lastProgressRef.current = clamped;

      const exactIdx = clamped * LUT_STEPS;
      const i0 = Math.min(LUT_STEPS - 1, Math.floor(exactIdx));
      const i1 = i0 + 1;
      const frac = exactIdx - i0;

      const a = lut[i0];
      const b = lut[i1];

      const x = a.x + (b.x - a.x) * frac;
      const y = a.y + (b.y - a.y) * frac;
      const angleDeg = a.angleDeg + (b.angleDeg - a.angleDeg) * frac;
      const steerDeg = a.steerDeg + (b.steerDeg - a.steerDeg) * frac;
      const bankDeg = a.bankDeg + (b.bankDeg - a.bankDeg) * frac;

      // Single pure GPU-composited transform on the car wrapper
      carEl.style.transform = `translate3d(${(x - 54).toFixed(1)}px, ${(y - 32).toFixed(1)}px, 0) scale(${carScale}) rotate(${angleDeg.toFixed(2)}deg)`;

      // Lightweight direct ref updates (zero CSS variable style recalc!)
      const parts = carPartsRef.current;
      if (parts.tiltEl) {
        parts.tiltEl.style.transform = `perspective(520px) rotateX(${(20 + bankDeg).toFixed(1)}deg)`;
      }
      if (parts.frontLeftWheel) {
        parts.frontLeftWheel.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 104 15)`);
      }
      if (parts.frontRightWheel) {
        parts.frontRightWheel.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 104 69)`);
      }

      // Trace glowing royal route line directly behind the car
      activePathEl.style.strokeDashoffset = `${(totalLength * (1 - clamped)).toFixed(1)}`;

      // Update React day state ONLY on integer stop crossings (max 6 times across entire journey)
      let furthestReached = 0;
      let closestIdx = 0;
      let closestDist = Infinity;

      for (let idx = 0; idx < stopRatios.length; idx++) {
        const ratio = stopRatios[idx];
        if (clamped >= ratio - 0.045) {
          furthestReached = idx;
        }
        const dist = Math.abs(clamped - ratio);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      }

      if (reachedDayRef.current !== furthestReached) {
        reachedDayRef.current = furthestReached;
        setReachedDayIdx(furthestReached);
      }
      if (activeDayRef.current !== closestIdx) {
        activeDayRef.current = closestIdx;
        setActiveDayIdx(closestIdx);
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      reachedDayRef.current = WEDDING_EVENTS.length - 1;
      setReachedDayIdx(WEDDING_EVENTS.length - 1);
      applyCarPose(stopRatios[0] ?? 0.08);
      activePathEl.style.strokeDashoffset = '0';
      return;
    }

    // Preserve previous progress cleanly if route ever rebuilds on orientation change
    applyCarPose(lastProgressRef.current);

    const proxy = { progress: 0.01 };
    const tween = gsap.to(proxy, {
      progress: 0.99,
      ease: 'none',
      onUpdate: () => {
        applyCarPose(proxy.progress);
      },
      scrollTrigger: {
        trigger: journeyEl,
        start: route.isDesktop ? 'top 62%' : 'top 58%',
        end: route.isDesktop ? 'bottom 64%' : 'bottom 66%',
        scrub: route.isDesktop ? 0.45 : 0.18,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [route]);

  const scrollToDay = (index: number) => {
    const target = rowRefs.current[index];
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = window.innerWidth >= 1024 ? 140 : 96;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
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
      className="relative z-10 isolate bg-[#f7eedb] text-[#6b1d2f] overflow-x-clip"
    >
      {/* Full-Section Track Holding the Sticky Hand-Painted Indian Wedding Art Background (100lvh avoids iOS Safari bar jumps) */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="sticky top-0 h-screen h-[100lvh] w-full overflow-hidden">
          <img
            src="/src/assets/images/events_mural_bg_1795781142569.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 76% 68% at 50% 48%, rgba(250,243,228,0.9) 0%, rgba(250,243,228,0.62) 58%, rgba(247,238,219,0.28) 100%)',
            }}
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 pt-20 sm:pt-24 pb-24 sm:pb-32">
        {/* Unified Editorial Section Header (Desktop & Mobile) */}
        <header
          ref={headerFloralRef}
          className="max-w-2xl mx-auto px-5 text-center flex flex-col items-center space-y-3.5"
        >
          <StickyBotanicalGarlandSVG className="w-60 sm:w-76 h-auto mb-1" />

          <p className="font-archivo text-[0.72rem] sm:text-[0.78rem] tracking-[0.26em] uppercase text-[#9a6b20]">
            Six Days of Festivities · Udaipur
          </p>

          <h2
            id="events-flow-heading"
            className="font-archivo text-[clamp(2.4rem,5vw,4.1rem)] font-semibold uppercase tracking-[0.06em] leading-[1.02] text-[#6b1d2f]"
            style={{ textWrap: 'balance' }}
          >
            The Events{' '}
            <span className="font-playfair font-medium italic lowercase text-[clamp(2.85rem,5.6vw,4.7rem)] tracking-[0.01em] text-[#b84a27]">
              flow
            </span>
          </h2>

          <p className="font-playfair text-[1.18rem] sm:text-[1.3rem] leading-[1.48] text-[#532430] max-w-lg mx-auto">
            Scroll along our wedding route as Vaibhav &amp; Trisha&apos;s vintage floral roadster carries you through all six celebrations—from Mehandi melodies to our lakeside Reception.
          </p>
        </header>

        {/* Sleek Sticky Journey Stop Bar (Quick-jump to any day along the curve) */}
        <div className="sticky top-3 z-40 mt-7 sm:mt-9 px-3 sm:px-6 flex justify-center pointer-events-none">
          <nav
            aria-label="Jump along the 6-day wedding route"
            className="pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#fcf8ee]/96 border border-[#c59436]/55 shadow-[0_12px_32px_-12px_rgba(74,20,34,0.26)] max-w-full overflow-x-auto"
          >
            {WEDDING_EVENTS.map((ev, idx) => {
              const isCurrent = idx === activeDayIdx;
              const isVisited = idx <= reachedDayIdx;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => scrollToDay(idx)}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`min-h-[36px] px-2.5 sm:px-3.5 rounded-full font-archivo text-[0.64rem] sm:text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b84a27] ${
                    isCurrent
                      ? 'bg-[#6b1d2f] text-[#faf3e4] shadow-sm'
                      : isVisited
                        ? 'text-[#6b1d2f] hover:bg-[#e8c678]/30'
                        : 'text-[#6b1d2f]/55 hover:text-[#6b1d2f]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isCurrent
                        ? 'bg-[#e8c678]'
                        : isVisited
                          ? 'bg-[#b84a27]'
                          : 'bg-[#c59436]/45'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{ev.dayLabel}</span>
                  <span className="hidden md:inline opacity-80">· {ev.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* =====================================================================
            WINDING CALLIGRAPHIC CURVED ROUTE + 3D VINTAGE WEDDING CAR STAGE
           ===================================================================== */}
        <div
          ref={journeyRef}
          className="relative max-w-[78rem] mx-auto px-3 sm:px-6 lg:px-10 mt-6 sm:mt-10 pt-10 sm:pt-14 pb-20 sm:pb-28"
        >
          {/* Dynamic Pixel-Exact SVG Calligraphic Curve Route (Zero SVG blur filters = locked 60/120fps on iOS Safari!) */}
          <svg
            width={route.width}
            height={route.height}
            viewBox={`0 0 ${route.width} ${route.height}`}
            fill="none"
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="royalRouteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9a6b20" />
                <stop offset="28%" stopColor="#b84a27" />
                <stop offset="65%" stopColor="#6b1d2f" />
                <stop offset="100%" stopColor="#9a6b20" />
              </linearGradient>
            </defs>

            {route.pathD && (
              <>
                {/* Soft sunlit champagne halo behind the sweeping calligraphic curve (pure vector, zero filter cost) */}
                <path
                  d={route.pathD}
                  stroke="#e8c678"
                  strokeOpacity="0.28"
                  strokeWidth={route.isDesktop ? 16 : 11}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Unvisited delicate hand-drawn antique gold route curve */}
                <path
                  ref={basePathRef}
                  d={route.pathD}
                  stroke="#9a6b20"
                  strokeOpacity="0.34"
                  strokeWidth={route.isDesktop ? 2.8 : 2.2}
                  strokeDasharray="6 9"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Active scroll-traced royal garnet & gold ribbon painted live behind the vintage car */}
                <path
                  ref={activePathRef}
                  d={route.pathD}
                  stroke="url(#royalRouteGrad)"
                  strokeWidth={route.isDesktop ? 4 : 3.2}
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            )}

            {/* Ornate Milestone Medallions pinned directly on the curve for Day 1..Day 6 */}
            {route.stopPoints.map((pt, idx) => {
              const ev = WEDDING_EVENTS[idx];
              if (!ev) return null;
              const isReached = idx <= reachedDayIdx;
              const isCurrent = idx === activeDayIdx;

              const cardEdgeX =
                ev.side === 'left' ? route.width * 0.44 : route.width * 0.56;

              return (
                <g key={ev.id}>
                  {route.isDesktop && (
                    <line
                      x1={cardEdgeX}
                      y1={pt.y}
                      x2={pt.x}
                      y2={pt.y}
                      stroke={isReached ? ev.accentHex : '#c59436'}
                      strokeOpacity={isReached ? 0.6 : 0.3}
                      strokeWidth="1.4"
                      strokeDasharray="3 5"
                    />
                  )}

                  {isCurrent && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={route.isDesktop ? 28 : 22}
                      fill={ev.accentHex}
                      fillOpacity="0.16"
                      stroke={ev.accentHex}
                      strokeOpacity="0.45"
                      strokeWidth="1.2"
                    />
                  )}

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={route.isDesktop ? 19 : 16}
                    fill={isReached ? '#fcf8ee' : '#faf3e4'}
                    stroke={isReached ? ev.accentHex : '#c59436'}
                    strokeWidth={isCurrent ? 2.4 : 1.5}
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={route.isDesktop ? 15 : 12.5}
                    fill={isCurrent ? '#6b1d2f' : isReached ? ev.accentHex : 'transparent'}
                    fillOpacity={isCurrent ? 1 : isReached ? 0.14 : 0}
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isCurrent ? '#faf3e4' : isReached ? '#6b1d2f' : '#9a6b20'}
                    style={{
                      fontFamily: "'Cinzel', Georgia, serif",
                      fontSize: route.isDesktop ? '11px' : '9.5px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {ev.dayNumber}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 3D Miniature Vintage Cream MG Wedding Roadster gliding live along the curve */}
          <div
            ref={carWrapperRef}
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-0 left-0 z-30 will-change-transform"
            style={{
              transformOrigin: '54px 32px',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              opacity: route.pathD ? 1 : 0,
            }}
          >
            <VintageWeddingCar3D carPartsRef={carPartsRef} />
          </div>

          {/* 6 Chronological Event Stops Arranged Along the Curve */}
          <div className="relative z-20 space-y-12 lg:space-y-24">
            {WEDDING_EVENTS.map((event, idx) => {
              const isLeftDesktop = event.side === 'left';
              const isReached = idx <= reachedDayIdx;
              const isCurrent = idx === activeDayIdx;

              const mobileOffsetClass =
                idx % 2 === 0
                  ? 'ml-auto mr-0 w-[calc(100%-2.9rem)] sm:w-[calc(100%-4.5rem)]'
                  : 'mr-auto ml-0 w-[calc(100%-2.9rem)] sm:w-[calc(100%-4.5rem)]';

              const desktopLayoutClass = isLeftDesktop
                ? 'lg:w-[44%] lg:ml-0 lg:mr-auto'
                : 'lg:w-[44%] lg:ml-auto lg:mr-0';

              return (
                <div
                  key={event.id}
                  id={event.id}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className="relative pt-[5.25rem] lg:pt-0"
                >
                  {/* Floating Day Stop Label near mobile curve apex */}
                  <div
                    className={`lg:hidden absolute top-5 flex items-center gap-2 ${
                      idx % 2 === 0 ? 'left-[32%]' : 'right-[32%]'
                    }`}
                  >
                    <span className="font-archivo text-[0.68rem] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#fcf8ee] border border-[#c59436]/55 text-[#6b1d2f] shadow-sm">
                      {event.dayLabel} · {event.title}
                    </span>
                  </div>

                  {/* Pure-GPU Animated Event Card (No backdrop-blur or box-shadow transitions on iOS!) */}
                  <article
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    data-day-index={idx}
                    className={`group relative ${mobileOffsetClass} ${desktopLayoutClass} bg-[#fcf8ee] rounded-[1.6rem] sm:rounded-[1.85rem] p-3.5 sm:p-5 border transition-[transform,opacity] duration-500 ease-out will-change-transform ${
                      isCurrent
                        ? 'border-[#c59436] shadow-[0_24px_56px_-22px_rgba(74,20,34,0.3)]'
                        : isReached
                          ? 'border-[#c59436]/55 shadow-[0_18px_44px_-22px_rgba(74,20,34,0.22)]'
                          : 'border-[#c59436]/30 shadow-[0_12px_28px_-20px_rgba(74,20,34,0.16)]'
                    }`}
                    style={{
                      transform: isReached
                        ? 'translate3d(0, 0, 0) scale(1)'
                        : 'translate3d(0, 18px, 0) scale(0.97)',
                      opacity: isReached ? 1 : 0.52,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Event Photo (explicit aspect ratio prevents lazy-load height shifts!) */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-[1.15rem] sm:rounded-[1.3rem] overflow-hidden bg-[#e9dcc6]">
                      <img
                        src={event.image}
                        alt={event.imageAlt}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#4a1422]/82 via-[#4a1422]/25 to-transparent" />
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between gap-2 text-[#faf3e4]">
                        <span className="font-archivo text-[0.66rem] sm:text-[0.7rem] uppercase tracking-[0.18em] tabular-nums">
                          {event.dayLabel} · {event.date}
                        </span>
                        <span className="font-playfair italic text-sm sm:text-base text-[#e8c678] shrink-0">
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Event Details */}
                    <div className="pt-4 sm:pt-5 px-1 sm:px-1.5 pb-1 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span
                            className="block font-archivo text-[0.66rem] sm:text-[0.7rem] uppercase tracking-[0.2em] tabular-nums mb-1"
                            style={{ color: event.accentHex }}
                          >
                            Stop {event.dayNumber} / 06
                          </span>
                          <h3 className="font-archivo text-[1.55rem] sm:text-[1.9rem] font-semibold uppercase tracking-[0.06em] leading-none text-[#6b1d2f]">
                            {event.title}
                          </h3>
                        </div>
                        <EventFloralCrestSVG
                          kind={event.floralKind}
                          accentHex={event.accentHex}
                          className="w-11 h-11 sm:w-13 sm:h-13 shrink-0"
                        />
                      </div>

                      <p className="font-playfair italic text-[1.14rem] sm:text-[1.22rem] text-[#b84a27] leading-snug">
                        {event.subtitle}
                      </p>

                      <p className="font-playfair text-[1.04rem] sm:text-[1.12rem] leading-[1.46] text-[#532430]">
                        {event.description}
                      </p>

                      <EventFloralVineDividerSVG color={event.accentHex} className="w-full h-5 pt-0.5" />

                      <div className="pt-0.5 flex flex-col gap-1 text-[0.98rem] sm:text-[1.04rem] font-playfair text-[#6b1d2f]/85">
                        <div>
                          <span className="font-archivo text-[0.64rem] uppercase tracking-[0.16em] text-[#9a6b20] mr-2">
                            Venue
                          </span>
                          <span>{event.venue}</span>
                        </div>
                        <div>
                          <span className="font-archivo text-[0.64rem] uppercase tracking-[0.16em] text-[#9a6b20] mr-2">
                            Attire
                          </span>
                          <span>{event.dressCode}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={onRsvpClick}
                          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#4a1422] text-[#faf3e4] font-archivo text-[0.68rem] sm:text-[0.7rem] uppercase tracking-[0.18em] hover:bg-[#b84a27] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b84a27]"
                        >
                          Confirm for {event.dayLabel} · {event.title}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
