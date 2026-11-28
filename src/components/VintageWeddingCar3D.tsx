import React from 'react';

interface VintageWeddingCar3DProps {
  className?: string;
}

/**
 * Multi-layered 3D miniature vintage cream MG convertible wedding roadster,
 * crafted after the classic floral wedding car reference:
 * - Sculpted ivory/cream roadster fenders & louvered hood
 * - Iconic vertical chrome radiator grille & glowing twin round headlights
 * - Crimson-spoked wire wheels (front pair physically steers into curves)
 * - Saddle-tan leather convertible cockpit & chrome-framed windshield
 * - Cascading blush/peach garden roses, greenery & flowing white silk veil
 *
 * Driven purely via CSS custom properties (--car-steer, --car-bank, --car-speed)
 * updated on GPU-composited GSAP ScrollTrigger ticks for smooth 60fps motion.
 */
export const VintageWeddingCar3D: React.FC<VintageWeddingCar3DProps> = ({
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none relative ${className}`}
      style={{
        width: '108px',
        height: '64px',
        perspective: '520px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Isometric Camera + Dynamic Curve Banking Wrapper */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform:
            'rotateX(calc(24deg + var(--car-bank, 0deg))) rotateY(calc(var(--car-pitch, 0deg)))',
          transition: 'transform 110ms linear',
        }}
      >
        {/* LAYER 0: Soft Ground-Contact 3D Ambient Shadow */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(-3px, 6px, -10px) scale(0.98)',
            filter: 'blur(7px)',
            opacity: 0.42,
          }}
        >
          <svg viewBox="0 0 140 84" className="w-full h-full overflow-visible">
            <rect x="14" y="16" width="110" height="52" rx="22" fill="#3a121e" />
          </svg>
        </div>

        {/* LAYER 1: Headlight Beams + Chassis Underbody + 4 Red-Hub Wire Wheels */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(2px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 140 84" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="headlightCone" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#fff4c4" stopOpacity="0.52" />
                <stop offset="55%" stopColor="#ffe08a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="tireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#352c2b" />
                <stop offset="50%" stopColor="#1b1616" />
                <stop offset="100%" stopColor="#2e2625" />
              </linearGradient>
            </defs>

            {/* Warm golden vintage halogen headlight cones projecting forward (+X) */}
            <path
              d="M124 23 L166 11 L166 36 Z"
              fill="url(#headlightCone)"
            />
            <path
              d="M124 61 L166 48 L166 73 Z"
              fill="url(#headlightCone)"
            />

            {/* Trailing wispy white silk wedding ribbon & rose petals behind tail */}
            <path
              d="M16 40 C4 36, -6 46, -18 42"
              stroke="#fffaf0"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeOpacity="0.82"
              fill="none"
            />
            <path
              d="M15 44 C2 50, -9 39, -22 47"
              stroke="#f4d8dc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
              fill="none"
            />
            <circle cx="-8" cy="36" r="2.2" fill="#e598a6" opacity="0.85" />
            <circle cx="-17" cy="49" r="1.8" fill="#e8c678" opacity="0.85" />
            <circle cx="-25" cy="41" r="1.6" fill="#d97a8c" opacity="0.72" />

            {/* Dark chassis floorpan */}
            <rect x="18" y="20" width="100" height="44" rx="16" fill="#2c2220" />

            {/* Rear Left & Right Tires (with red wire-spoke hubs inspired by photo) */}
            <g>
              <rect x="24" y="10" width="22" height="10" rx="4" fill="url(#tireGrad)" />
              <rect x="29" y="12.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="31" y="13.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>
            <g>
              <rect x="24" y="64" width="22" height="10" rx="4" fill="url(#tireGrad)" />
              <rect x="29" y="67.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="31" y="68.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>

            {/* Front Left & Right Steerable Tires */}
            <g
              style={{
                transformOrigin: '104px 15px',
                transform: 'rotate(var(--car-steer, 0deg))',
              }}
            >
              <rect x="93" y="10" width="22" height="10" rx="4" fill="url(#tireGrad)" />
              <rect x="98" y="12.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="100" y="13.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>
            <g
              style={{
                transformOrigin: '104px 69px',
                transform: 'rotate(var(--car-steer, 0deg))',
              }}
            >
              <rect x="93" y="64" width="22" height="10" rx="4" fill="url(#tireGrad)" />
              <rect x="98" y="67.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="100" y="68.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>
          </svg>
        </div>

        {/* LAYER 2: Sculpted Cream MG Roadster Body, Chrome Grille, Headlights & Tan Leather Cabin */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(10px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 140 84" className="w-full h-full overflow-visible">
            <defs>
              {/* Sculpted vintage cream enamel paint */}
              <linearGradient id="creamBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdf9f1" />
                <stop offset="28%" stopColor="#f2e7d3" />
                <stop offset="68%" stopColor="#e5d5bc" />
                <stop offset="100%" stopColor="#cbb79a" />
              </linearGradient>
              <linearGradient id="creamHoodHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#efe2cc" />
                <stop offset="45%" stopColor="#fffdf7" />
                <stop offset="100%" stopColor="#e6d6bc" />
              </linearGradient>
              {/* Chrome trim gradient */}
              <linearGradient id="chromeTrim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#c9ced4" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#7a828c" />
              </linearGradient>
              {/* Saddle-tan quilted leather cockpit */}
              <linearGradient id="tanLeather" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b57b50" />
                <stop offset="55%" stopColor="#8d5834" />
                <stop offset="100%" stopColor="#653c21" />
              </linearGradient>
            </defs>

            {/* Chrome rear & front vintage curved bumpers */}
            <path
              d="M14 22 C10 31, 10 53, 14 62"
              stroke="url(#chromeTrim)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M126 20 C131 30, 131 54, 126 64"
              stroke="url(#chromeTrim)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sweeping vintage front & rear cream mudguard fenders */}
            <path
              d="M20 14 C36 11, 56 14, 70 20 L86 20 C98 14, 114 13, 122 20 C125 23, 125 28, 120 29 L22 29 C16 28, 15 17, 20 14 Z"
              fill="url(#creamBodyGrad)"
              stroke="#b7a082"
              strokeWidth="0.9"
            />
            <path
              d="M20 70 C36 73, 56 70, 70 64 L86 64 C98 70, 114 71, 122 64 C125 61, 125 56, 120 55 L22 55 C16 56, 15 67, 20 70 Z"
              fill="url(#creamBodyGrad)"
              stroke="#b7a082"
              strokeWidth="0.9"
            />

            {/* Main sculpted cream roadster fuselage & tapered long hood */}
            <path
              d="M18 27 C24 22, 46 21, 76 23 L116 27 C124 28, 126 34, 126 42 C126 50, 124 56, 116 57 L76 61 C46 63, 24 62, 18 57 C14 53, 14 31, 18 27 Z"
              fill="url(#creamBodyGrad)"
              stroke="#b39a7c"
              strokeWidth="1.1"
            />

            {/* Long tapered MG hood center ridge & chrome center spine */}
            <path
              d="M74 28 L120 31 C123 33, 123 51, 120 53 L74 56 Z"
              fill="url(#creamHoodHighlight)"
              opacity="0.82"
            />
            <line
              x1="75"
              y1="42"
              x2="122"
              y2="42"
              stroke="url(#chromeTrim)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Delicate side hood louver vents */}
            <g stroke="#b79f80" strokeWidth="0.9" strokeLinecap="round" opacity="0.7">
              <line x1="88" y1="29" x2="94" y2="29.5" />
              <line x1="97" y1="29.5" x2="103" y2="30" />
              <line x1="88" y1="55" x2="94" y2="54.5" />
              <line x1="97" y1="54.5" x2="103" y2="54" />
            </g>

            {/* Iconic vertical chrome MG radiator nose grille */}
            <rect
              x="121"
              y="32"
              width="5"
              height="20"
              rx="2.5"
              fill="url(#chromeTrim)"
              stroke="#6c737d"
              strokeWidth="0.7"
            />
            {/* Red MG crest badge */}
            <circle cx="122" cy="42" r="1.8" fill="#8c1931" />

            {/* Twin Round Chrome Headlights */}
            <g>
              <ellipse cx="120" cy="23.5" rx="4.2" ry="3.8" fill="url(#chromeTrim)" stroke="#7c848e" strokeWidth="0.7" />
              <ellipse cx="122.4" cy="23.5" rx="2.1" ry="2.8" fill="#fff9de" />
              <ellipse cx="120" cy="60.5" rx="4.2" ry="3.8" fill="url(#chromeTrim)" stroke="#7c848e" strokeWidth="0.7" />
              <ellipse cx="122.4" cy="60.5" rx="2.1" ry="2.8" fill="#fff9de" />
            </g>

            {/* Open Convertible Saddle-Tan Leather Cockpit */}
            <path
              d="M42 26 C53 24, 68 25, 75 28 L75 56 C68 59, 53 60, 42 58 C38 52, 38 32, 42 26 Z"
              fill="#462816"
              stroke="#c59436"
              strokeWidth="0.8"
            />
            {/* Twin Tan Leather Bucket Seats */}
            <rect x="44" y="28" width="16" height="12.5" rx="4.5" fill="url(#tanLeather)" stroke="#5c351c" strokeWidth="0.7" />
            <rect x="44" y="43.5" width="16" height="12.5" rx="4.5" fill="url(#tanLeather)" stroke="#5c351c" strokeWidth="0.7" />
            {/* Quilted leather seat stitching highlights */}
            <line x1="48" y1="31" x2="55" y2="31" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="37" x2="55" y2="37" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="47" x2="55" y2="47" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="53" x2="55" y2="53" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />

            {/* Vintage Ivory Steering Wheel */}
            <circle cx="67" cy="34.5" r="5.2" fill="none" stroke="#f5ecdc" strokeWidth="1.4" />
            <circle cx="67" cy="34.5" r="1.4" fill="#c59436" />

            {/* Chrome rear luggage rail */}
            <path
              d="M21 31 H31 M21 53 H31 M23 29 V55"
              stroke="url(#chromeTrim)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* LAYER 3: Elevated Chrome Windshield Glass + Lush Cascading Blush Wedding Florals */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(19px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 140 84" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="windshieldGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
                <stop offset="45%" stopColor="#d9e8ef" stopOpacity="0.62" />
                <stop offset="100%" stopColor="#8fa7b3" stopOpacity="0.48" />
              </linearGradient>
            </defs>

            {/* Elevated Chrome-Framed Vintage Split Windshield */}
            <path
              d="M72 25 L79 27 L79 57 L72 59 Z"
              fill="url(#windshieldGlass)"
              stroke="#eef2f6"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <line x1="75.5" y1="26" x2="75.5" y2="58" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />

            {/* Cascading Bridal Florals (Eucalyptus foliage + blush, peach & cream roses spilling over rear/side!) */}
            <g>
              {/* Soft eucalyptus & sage botanical sprigs */}
              <ellipse cx="33" cy="24" rx="6.5" ry="2.6" transform="rotate(-28 33 24)" fill="#5d785e" />
              <ellipse cx="26" cy="35" rx="6" ry="2.4" transform="rotate(14 26 35)" fill="#4f6a52" />
              <ellipse cx="30" cy="57" rx="7" ry="2.7" transform="rotate(26 30 57)" fill="#5d785e" />
              <ellipse cx="42" cy="61" rx="6.5" ry="2.4" transform="rotate(-18 42 61)" fill="#6e8b6b" />
              <ellipse cx="21" cy="48" rx="5.5" ry="2.2" transform="rotate(-35 21 48)" fill="#526d54" />
              <ellipse cx="40" cy="22" rx="5.5" ry="2.2" transform="rotate(24 40 22)" fill="#688467" />

              {/* Lush Blush, Peach & Ivory Garden Roses */}
              {/* Main roses cascading along rear deck & passenger side */}
              <circle cx="34" cy="30" r="5.2" fill="#e9a5b0" stroke="#c87484" strokeWidth="0.7" />
              <circle cx="34" cy="30" r="2.5" fill="#f7cfd6" />

              <circle cx="29" cy="42" r="5.6" fill="#f2c4a2" stroke="#cc8e67" strokeWidth="0.7" />
              <circle cx="29" cy="42" r="2.7" fill="#fce4cf" />

              <circle cx="36" cy="52" r="5.4" fill="#df8898" stroke="#b35c6e" strokeWidth="0.7" />
              <circle cx="36" cy="52" r="2.5" fill="#f5bcc7" />

              <circle cx="43" cy="58" r="4.3" fill="#faf0dc" stroke="#d4ba8f" strokeWidth="0.6" />
              <circle cx="43" cy="58" r="1.9" fill="#ffffff" />

              <circle cx="24" cy="52" r="4.1" fill="#e89fae" stroke="#bd6979" strokeWidth="0.6" />
              <circle cx="39" cy="24" r="3.8" fill="#f6d5b8" stroke="#cf9a72" strokeWidth="0.6" />
              <circle cx="26" cy="28" r="3.4" fill="#fff7e8" stroke="#d7bfa0" strokeWidth="0.6" />

              {/* Tiny champagne gold accent buds */}
              <circle cx="32" cy="46" r="1.5" fill="#e8c678" />
              <circle cx="46" cy="25" r="1.4" fill="#e8c678" />
              <circle cx="22" cy="39" r="1.5" fill="#e8c678" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
