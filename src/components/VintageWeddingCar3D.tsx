import React from 'react';

export interface VintageWeddingCarRefs {
  tiltEl: HTMLDivElement | null;
  frontLeftWheel: SVGGElement | null;
  frontRightWheel: SVGGElement | null;
}

interface VintageWeddingCar3DProps {
  className?: string;
  carPartsRef?: React.MutableRefObject<VintageWeddingCarRefs>;
}

/**
 * Single-SVG GPU-accelerated 3D miniature vintage cream MG convertible wedding roadster.
 * Keeps every handcrafted detail (sculpted cream fenders, chrome MG grille, glowing twin
 * headlights, red-spoke steering wire wheels, saddle-tan quilted cockpit, split windshield,
 * cascading blush & peach roses, fluttering silk veil, and soft 3D shadow) inside ONE
 * lightweight composite layer — eliminating iOS Safari WebKit preserve-3d & CSS blur glitches
 * for locked 60/120fps scrolling on iPhone 14 / 15 / 15 Pro.
 */
export const VintageWeddingCar3D: React.FC<VintageWeddingCar3DProps> = React.memo(
  ({ className = '', carPartsRef }) => {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none relative ${className}`}
        style={{
          width: '108px',
          height: '64px',
          contain: 'layout style',
        }}
      >
        {/* Single GPU-promoted 3D tilt wrapper (no CSS transition fighting GSAP scrub) */}
        <div
          ref={(el) => {
            if (carPartsRef) carPartsRef.current.tiltEl = el;
          }}
          className="relative w-full h-full will-change-transform"
          style={{
            transform: 'perspective(520px) rotateX(20deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <svg
            viewBox="-28 -4 200 96"
            className="w-full h-full overflow-visible"
            shapeRendering="geometricPrecision"
          >
            <defs>
              {/* Soft volumetric 3D ground contact shadow (radial gradient = zero CPU blur cost!) */}
              <radialGradient id="car3dGroundShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3a121e" stopOpacity="0.42" />
                <stop offset="62%" stopColor="#3a121e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3a121e" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="carHeadlightCone" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#fff4c4" stopOpacity="0.52" />
                <stop offset="55%" stopColor="#ffe08a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="carTireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#352c2b" />
                <stop offset="50%" stopColor="#1b1616" />
                <stop offset="100%" stopColor="#2e2625" />
              </linearGradient>

              <linearGradient id="carCreamBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdf9f1" />
                <stop offset="28%" stopColor="#f2e7d3" />
                <stop offset="68%" stopColor="#e5d5bc" />
                <stop offset="100%" stopColor="#cbb79a" />
              </linearGradient>

              <linearGradient id="carCreamHoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#efe2cc" />
                <stop offset="45%" stopColor="#fffdf7" />
                <stop offset="100%" stopColor="#e6d6bc" />
              </linearGradient>

              <linearGradient id="carChromeTrim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#c9ced4" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#7a828c" />
              </linearGradient>

              <linearGradient id="carTanLeather" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b57b50" />
                <stop offset="55%" stopColor="#8d5834" />
                <stop offset="100%" stopColor="#653c21" />
              </linearGradient>

              <linearGradient id="carWindshieldGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#d9e8ef" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#8fa7b3" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* 1. Soft 3D Ground Shadow (offset slightly downward for elevated miniature depth) */}
            <ellipse cx="66" cy="48" rx="64" ry="34" fill="url(#car3dGroundShadow)" />

            {/* 2. Warm Golden Vintage Halogen Headlight Cones */}
            <path d="M124 23 L166 11 L166 36 Z" fill="url(#carHeadlightCone)" />
            <path d="M124 61 L166 48 L166 73 Z" fill="url(#carHeadlightCone)" />

            {/* 3. Trailing White Silk Wedding Ribbon & Floating Rose Petals */}
            <path
              d="M16 40 C4 36, -6 46, -18 42"
              stroke="#fffaf0"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeOpacity="0.84"
              fill="none"
            />
            <path
              d="M15 44 C2 50, -9 39, -22 47"
              stroke="#f4d8dc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.72"
              fill="none"
            />
            <circle cx="-8" cy="36" r="2.2" fill="#e598a6" opacity="0.88" />
            <circle cx="-17" cy="49" r="1.8" fill="#e8c678" opacity="0.88" />
            <circle cx="-25" cy="41" r="1.6" fill="#d97a8c" opacity="0.75" />

            {/* 4. Chassis Underbody & 4 Red-Hub Wire-Spoke Wheels */}
            <rect x="18" y="20" width="100" height="44" rx="16" fill="#2c2220" />

            {/* Rear Wheels */}
            <g>
              <rect x="24" y="10" width="22" height="10" rx="4" fill="url(#carTireGrad)" />
              <rect x="29" y="12.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="31" y="13.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>
            <g>
              <rect x="24" y="64" width="22" height="10" rx="4" fill="url(#carTireGrad)" />
              <rect x="29" y="67.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="31" y="68.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>

            {/* Steerable Front Wheels (rotated via direct SVG attribute on curve bends) */}
            <g
              ref={(el) => {
                if (carPartsRef) carPartsRef.current.frontLeftWheel = el;
              }}
            >
              <rect x="93" y="10" width="22" height="10" rx="4" fill="url(#carTireGrad)" />
              <rect x="98" y="12.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="100" y="13.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>
            <g
              ref={(el) => {
                if (carPartsRef) carPartsRef.current.frontRightWheel = el;
              }}
            >
              <rect x="93" y="64" width="22" height="10" rx="4" fill="url(#carTireGrad)" />
              <rect x="98" y="67.5" width="12" height="4" rx="1.5" fill="#b8242e" />
              <rect x="100" y="68.5" width="8" height="2" rx="1" fill="#e2e4e8" />
            </g>

            {/* 5. Sculpted 3D Cream MG Roadster Body & Chrome Bumpers */}
            <path
              d="M14 22 C10 31, 10 53, 14 62"
              stroke="url(#carChromeTrim)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M126 20 C131 30, 131 54, 126 64"
              stroke="url(#carChromeTrim)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sweeping Cream Mudguard Fenders */}
            <path
              d="M20 14 C36 11, 56 14, 70 20 L86 20 C98 14, 114 13, 122 20 C125 23, 125 28, 120 29 L22 29 C16 28, 15 17, 20 14 Z"
              fill="url(#carCreamBodyGrad)"
              stroke="#b7a082"
              strokeWidth="0.9"
            />
            <path
              d="M20 70 C36 73, 56 70, 70 64 L86 64 C98 70, 114 71, 122 64 C125 61, 125 56, 120 55 L22 55 C16 56, 15 67, 20 70 Z"
              fill="url(#carCreamBodyGrad)"
              stroke="#b7a082"
              strokeWidth="0.9"
            />

            {/* Main Fuselage & Tapered Long Hood */}
            <path
              d="M18 27 C24 22, 46 21, 76 23 L116 27 C124 28, 126 34, 126 42 C126 50, 124 56, 116 57 L76 61 C46 63, 24 62, 18 57 C14 53, 14 31, 18 27 Z"
              fill="url(#carCreamBodyGrad)"
              stroke="#b39a7c"
              strokeWidth="1.1"
            />

            {/* Raised Hood Ridge, Chrome Spine & Side Louver Vents */}
            <path
              d="M74 28 L120 31 C123 33, 123 51, 120 53 L74 56 Z"
              fill="url(#carCreamHoodGrad)"
              opacity="0.86"
            />
            <line
              x1="75"
              y1="42"
              x2="122"
              y2="42"
              stroke="url(#carChromeTrim)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <g stroke="#b79f80" strokeWidth="0.9" strokeLinecap="round" opacity="0.72">
              <line x1="88" y1="29" x2="94" y2="29.5" />
              <line x1="97" y1="29.5" x2="103" y2="30" />
              <line x1="88" y1="55" x2="94" y2="54.5" />
              <line x1="97" y1="54.5" x2="103" y2="54" />
            </g>

            {/* Iconic Vertical Chrome MG Radiator Grille & Crimson Badge */}
            <rect
              x="121"
              y="32"
              width="5"
              height="20"
              rx="2.5"
              fill="url(#carChromeTrim)"
              stroke="#6c737d"
              strokeWidth="0.7"
            />
            <circle cx="122" cy="42" r="1.8" fill="#8c1931" />

            {/* Twin Round Chrome Headlights */}
            <ellipse cx="120" cy="23.5" rx="4.2" ry="3.8" fill="url(#carChromeTrim)" stroke="#7c848e" strokeWidth="0.7" />
            <ellipse cx="122.4" cy="23.5" rx="2.1" ry="2.8" fill="#fff9de" />
            <ellipse cx="120" cy="60.5" rx="4.2" ry="3.8" fill="url(#carChromeTrim)" stroke="#7c848e" strokeWidth="0.7" />
            <ellipse cx="122.4" cy="60.5" rx="2.1" ry="2.8" fill="#fff9de" />

            {/* Open Convertible Saddle-Tan Leather Cockpit */}
            <path
              d="M42 26 C53 24, 68 25, 75 28 L75 56 C68 59, 53 60, 42 58 C38 52, 38 32, 42 26 Z"
              fill="#462816"
              stroke="#c59436"
              strokeWidth="0.8"
            />
            <rect x="44" y="28" width="16" height="12.5" rx="4.5" fill="url(#carTanLeather)" stroke="#5c351c" strokeWidth="0.7" />
            <rect x="44" y="43.5" width="16" height="12.5" rx="4.5" fill="url(#carTanLeather)" stroke="#5c351c" strokeWidth="0.7" />
            <line x1="48" y1="31" x2="55" y2="31" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="37" x2="55" y2="37" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="47" x2="55" y2="47" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />
            <line x1="48" y1="53" x2="55" y2="53" stroke="#d9a87c" strokeWidth="0.7" opacity="0.65" />

            {/* Vintage Ivory Steering Wheel & Rear Chrome Rack */}
            <circle cx="67" cy="34.5" r="5.2" fill="none" stroke="#f5ecdc" strokeWidth="1.4" />
            <circle cx="67" cy="34.5" r="1.4" fill="#c59436" />
            <path
              d="M21 31 H31 M21 53 H31 M23 29 V55"
              stroke="url(#carChromeTrim)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* 6. Elevated Chrome Split Windshield (slightly raised via y-offset for crisp 3D depth) */}
            <path
              d="M72 24.5 L79.5 26.5 L79.5 57.5 L72 59.5 Z"
              fill="url(#carWindshieldGlass)"
              stroke="#eef2f6"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <line x1="75.8" y1="25.5" x2="75.8" y2="58.5" stroke="#ffffff" strokeWidth="0.9" opacity="0.78" />

            {/* 7. Lush Cascading Bridal Florals (Eucalyptus + Blush, Peach & Ivory Garden Roses) */}
            <g>
              <ellipse cx="33" cy="23.5" rx="6.5" ry="2.6" transform="rotate(-28 33 23.5)" fill="#5d785e" />
              <ellipse cx="26" cy="34.5" rx="6" ry="2.4" transform="rotate(14 26 34.5)" fill="#4f6a52" />
              <ellipse cx="30" cy="56.5" rx="7" ry="2.7" transform="rotate(26 30 56.5)" fill="#5d785e" />
              <ellipse cx="42" cy="60.5" rx="6.5" ry="2.4" transform="rotate(-18 42 60.5)" fill="#6e8b6b" />
              <ellipse cx="21" cy="47.5" rx="5.5" ry="2.2" transform="rotate(-35 21 47.5)" fill="#526d54" />
              <ellipse cx="40" cy="21.5" rx="5.5" ry="2.2" transform="rotate(24 40 21.5)" fill="#688467" />

              <circle cx="34" cy="29.5" r="5.2" fill="#e9a5b0" stroke="#c87484" strokeWidth="0.7" />
              <circle cx="34" cy="29.5" r="2.5" fill="#f7cfd6" />

              <circle cx="29" cy="41.5" r="5.6" fill="#f2c4a2" stroke="#cc8e67" strokeWidth="0.7" />
              <circle cx="29" cy="41.5" r="2.7" fill="#fce4cf" />

              <circle cx="36" cy="51.5" r="5.4" fill="#df8898" stroke="#b35c6e" strokeWidth="0.7" />
              <circle cx="36" cy="51.5" r="2.5" fill="#f5bcc7" />

              <circle cx="43" cy="57.5" r="4.3" fill="#faf0dc" stroke="#d4ba8f" strokeWidth="0.6" />
              <circle cx="43" cy="57.5" r="1.9" fill="#ffffff" />

              <circle cx="24" cy="51.5" r="4.1" fill="#e89fae" stroke="#bd6979" strokeWidth="0.6" />
              <circle cx="39" cy="23.5" r="3.8" fill="#f6d5b8" stroke="#cf9a72" strokeWidth="0.6" />
              <circle cx="26" cy="27.5" r="3.4" fill="#fff7e8" stroke="#d7bfa0" strokeWidth="0.6" />

              <circle cx="32" cy="45.5" r="1.5" fill="#e8c678" />
              <circle cx="46" cy="24.5" r="1.4" fill="#e8c678" />
              <circle cx="22" cy="38.5" r="1.5" fill="#e8c678" />
            </g>
          </svg>
        </div>
      </div>
    );
  }
);

VintageWeddingCar3D.displayName = 'VintageWeddingCar3D';
