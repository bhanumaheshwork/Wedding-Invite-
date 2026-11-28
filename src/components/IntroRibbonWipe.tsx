import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

const INTRO_SEEN_KEY = 'ram_sita_wedding_intro_seen_v1';

export function hasSeenIntroBefore(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }
  try {
    if (window.localStorage.getItem(INTRO_SEEN_KEY) === '1') return true;
  } catch {
    // Ignore storage access restrictions
  }
  try {
    if (window.sessionStorage.getItem(INTRO_SEEN_KEY) === '1') return true;
  } catch {
    // Ignore storage access restrictions
  }
  return false;
}

export function markIntroSeen(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Ignore storage access restrictions
  }
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Ignore storage access restrictions
  }
}

interface IntroRibbonWipeProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

/**
 * First-visit-only GSAP DrawSVG orange ribbon reveal overlay.
 * Uses preserveAspectRatio="xMidYMid slice" so circular curves remain
 * distortion-free on both wide desktops and tall mobile screens.
 */
export const IntroRibbonWipe: React.FC<IntroRibbonWipeProps> = ({
  onRevealStart,
  onComplete,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const onRevealStartRef = useRef(onRevealStart);
  const onCompleteRef = useRef(onComplete);

  onRevealStartRef.current = onRevealStart;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const pathEl = pathRef.current;
    const backdropEl = backdropRef.current;

    // Mark as seen as soon as the first-visit animation starts so reloads skip it
    markIntroSeen();

    if (!pathEl || !backdropEl) {
      onRevealStartRef.current();
      onCompleteRef.current();
      return;
    }

    let cancelled = false;
    let tl: gsap.core.Timeline | null = null;

    // Failsafe: never allow the overlay to block the page beyond 3.5s
    const failsafeTimer = window.setTimeout(() => {
      if (!cancelled) {
        onRevealStartRef.current();
        onCompleteRef.current();
      }
    }, 3500);

    const startRibbonTimeline = () => {
      if (cancelled) return;

      const isPortrait = window.innerHeight > window.innerWidth;
      const startStrokeWidth = isPortrait ? 430 : 350;
      const endStrokeWidth = isPortrait ? 48 : 38;

      gsap.set(pathEl, {
        drawSVG: '0% 100%',
        attr: { 'stroke-width': startStrokeWidth },
        strokeOpacity: 1,
      });
      gsap.set(backdropEl, { autoAlpha: 1 });

      tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(failsafeTimer);
          if (!cancelled) {
            onCompleteRef.current();
          }
        },
      });

      // Reveal the hero content behind the unwinding silk ribbon
      tl.call(() => {
        if (!cancelled) onRevealStartRef.current();
      }, undefined, 0.22);

      // Smoothly dissolve the cream veil so the hero shines through the ribbon
      tl.to(
        backdropEl,
        {
          autoAlpha: 0,
          duration: 0.42,
          ease: 'power2.out',
        },
        0.24
      );

      // Unwind the vermilion ribbon smoothly off-screen along its spiral curve
      tl.to(
        pathEl,
        {
          drawSVG: '100% 100%',
          attr: { 'stroke-width': endStrokeWidth },
          duration: 1.25,
          ease: 'power2.inOut',
        },
        0.24
      );

      // Soft silk fade on the final tip so square/unusual viewports never clip abruptly
      tl.to(
        pathEl,
        {
          strokeOpacity: 0,
          duration: 0.22,
          ease: 'power1.in',
        },
        1.27
      );
    };

    // Wait briefly for fonts (max 450ms) so the hero typography is crisp on reveal
    const fontWait = document.fonts?.ready ?? Promise.resolve();
    const maxDelay = new Promise<void>((resolve) => window.setTimeout(resolve, 450));
    Promise.race([fontWait, maxDelay]).then(startRibbonTimeline);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafeTimer);
      tl?.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden select-none"
    >
      {/* Cream veil that fades away as the ribbon unwinds */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#faf3e4]"
        style={{ willChange: 'opacity' }}
      />

      {/* Uniform-aspect swirling vermilion ribbon that scales cleanly for desktop & mobile */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        className="relative w-full h-full block"
      >
        <path
          ref={pathRef}
          d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001"
          fill="none"
          stroke="#b84a27"
          strokeWidth="360"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
