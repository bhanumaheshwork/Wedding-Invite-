import React from 'react';

export type FloralDayKind =
  | 'mehandi'
  | 'haldi'
  | 'carnival'
  | 'sangeet'
  | 'wedding'
  | 'reception';

/**
 * Symmetrical Indian Lotus & Botanical Vine Crown designed for GSAP DrawSVGPlugin.
 * Elements are classed (.draw-vine, .draw-leaf, .draw-petal, .bloom-fill, .bloom-dot)
 * so ScrollTrigger can choreograph stems -> leaves -> blooming petals sequentially.
 */
export const StickyBotanicalGarlandSVG: React.FC<{
  className?: string;
  inverted?: boolean;
}> = ({ className = 'w-64 sm:w-80 h-auto', inverted = false }) => (
  <svg
    viewBox="0 0 360 96"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none overflow-visible ${
      inverted ? 'scale-y-[-1]' : ''
    } ${className}`}
  >
    {/* Sweeping left & right botanical vine stems */}
    <path
      className="draw-vine"
      d="M180 76 C148 76, 126 52, 88 54 C60 56, 38 66, 14 58"
      stroke="#8f661d"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      className="draw-vine"
      d="M180 76 C212 76, 234 52, 272 54 C300 56, 322 66, 346 58"
      stroke="#8f661d"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Secondary filigree scroll tendrils */}
    <path
      className="draw-vine"
      d="M126 62 C112 76, 86 79, 72 68 C65 62, 70 54, 78 57"
      stroke="#c59436"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      className="draw-vine"
      d="M234 62 C248 76, 274 79, 288 68 C295 62, 290 54, 282 57"
      stroke="#c59436"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Foliage leaves unfurling along both vines */}
    <path
      className="draw-leaf"
      d="M132 58 C122 42, 108 36, 98 40 C106 50, 118 58, 132 58 Z"
      stroke="#1f6f54"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="#1f6f54"
      fillOpacity="0"
    />
    <path
      className="draw-leaf"
      d="M228 58 C238 42, 252 36, 262 40 C254 50, 242 58, 228 58 Z"
      stroke="#1f6f54"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="#1f6f54"
      fillOpacity="0"
    />
    <path
      className="draw-leaf"
      d="M66 56 C58 43, 44 38, 34 44 C42 52, 54 57, 66 56 Z"
      stroke="#1f6f54"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="#1f6f54"
      fillOpacity="0"
    />
    <path
      className="draw-leaf"
      d="M294 56 C302 43, 316 38, 326 44 C318 52, 306 57, 294 56 Z"
      stroke="#1f6f54"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="#1f6f54"
      fillOpacity="0"
    />

    {/* Flanking jasmine blossoms */}
    <g className="bloom-group" style={{ transformOrigin: '86px 46px' }}>
      <path
        className="draw-petal bloom-fill"
        d="M86 30 C91 37, 91 44, 86 50 C81 44, 81 37, 86 30 Z"
        stroke="#b84a27"
        strokeWidth="1.3"
        fill="#b84a27"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M86 50 C77 48, 72 42, 72 35 C79 37, 84 42, 86 50 Z"
        stroke="#b84a27"
        strokeWidth="1.2"
        fill="#b84a27"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M86 50 C95 48, 100 42, 100 35 C93 37, 88 42, 86 50 Z"
        stroke="#b84a27"
        strokeWidth="1.2"
        fill="#b84a27"
        fillOpacity="0"
      />
    </g>

    <g className="bloom-group" style={{ transformOrigin: '274px 46px' }}>
      <path
        className="draw-petal bloom-fill"
        d="M274 30 C279 37, 279 44, 274 50 C269 44, 269 37, 274 30 Z"
        stroke="#b84a27"
        strokeWidth="1.3"
        fill="#b84a27"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M274 50 C265 48, 260 42, 260 35 C267 37, 272 42, 274 50 Z"
        stroke="#b84a27"
        strokeWidth="1.2"
        fill="#b84a27"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M274 50 C283 48, 288 42, 288 35 C281 37, 276 42, 274 50 Z"
        stroke="#b84a27"
        strokeWidth="1.2"
        fill="#b84a27"
        fillOpacity="0"
      />
    </g>

    {/* Central Sacred Padma Lotus */}
    <g className="bloom-group" style={{ transformOrigin: '180px 68px' }}>
      {/* Outer wide petals */}
      <path
        className="draw-petal bloom-fill"
        d="M180 72 C160 73, 144 65, 136 52 C152 50, 168 58, 180 72 Z"
        stroke="#c59436"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#e8c678"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M180 72 C200 73, 216 65, 224 52 C208 50, 192 58, 180 72 Z"
        stroke="#c59436"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#e8c678"
        fillOpacity="0"
      />
      {/* Mid petals */}
      <path
        className="draw-petal bloom-fill"
        d="M180 72 C162 64, 152 49, 152 31 C166 36, 175 50, 180 72 Z"
        stroke="#b84a27"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#b84a27"
        fillOpacity="0"
      />
      <path
        className="draw-petal bloom-fill"
        d="M180 72 C198 64, 208 49, 208 31 C194 36, 185 50, 180 72 Z"
        stroke="#b84a27"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#b84a27"
        fillOpacity="0"
      />
      {/* Center crown petal */}
      <path
        className="draw-petal bloom-fill"
        d="M180 14 C191 31, 192 52, 180 72 C168 52, 169 31, 180 14 Z"
        stroke="#b84a27"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#b84a27"
        fillOpacity="0"
      />
      {/* Center vein line */}
      <path
        className="draw-vine"
        d="M180 28 V68"
        stroke="#c59436"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </g>

    {/* Pollen & dewdrop gold accents */}
    <circle className="bloom-dot" cx="180" cy="84" r="2.6" fill="#c59436" />
    <circle className="bloom-dot" cx="150" cy="79" r="1.8" fill="#b84a27" />
    <circle className="bloom-dot" cx="210" cy="79" r="1.8" fill="#b84a27" />
    <circle className="bloom-dot" cx="26" cy="54" r="2" fill="#c59436" />
    <circle className="bloom-dot" cx="334" cy="54" r="2" fill="#c59436" />
  </svg>
);

/**
 * Horizontal botanical divider vine drawn via DrawSVGPlugin inside each event card.
 */
export const EventFloralVineDividerSVG: React.FC<{
  color: string;
  className?: string;
}> = ({ color, className = 'w-full h-5' }) => (
  <svg
    viewBox="0 0 280 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    className={`pointer-events-none select-none overflow-visible ${className}`}
  >
    <path
      className="card-draw-stem"
      d="M4 12 C48 12, 82 12, 124 12"
      stroke="#c59436"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      className="card-draw-stem"
      d="M276 12 C232 12, 198 12, 156 12"
      stroke="#c59436"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      className="card-draw-petal"
      d="M140 3 C145 7.5, 145 16.5, 140 21 C135 16.5, 135 7.5, 140 3 Z"
      stroke={color}
      strokeWidth="1.4"
      fill={color}
      fillOpacity="0"
    />
    <path
      className="card-draw-petal"
      d="M126 12 C131 7, 136 8, 140 12 C136 16, 131 17, 126 12 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0"
    />
    <path
      className="card-draw-petal"
      d="M154 12 C149 7, 144 8, 140 12 C144 16, 149 17, 154 12 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0"
    />
    <circle className="card-bloom-dot" cx="114" cy="12" r="1.6" fill="#c59436" />
    <circle className="card-bloom-dot" cx="166" cy="12" r="1.6" fill="#c59436" />
  </svg>
);

/**
 * Distinct per-event blooming Indian floral crest animated with GSAP DrawSVGPlugin
 * as each event card scrolls into view.
 */
export const EventFloralCrestSVG: React.FC<{
  kind: FloralDayKind;
  accentHex: string;
  className?: string;
}> = ({ kind, accentHex, className = 'w-12 h-12 sm:w-14 sm:h-14 shrink-0' }) => {
  switch (kind) {
    case 'mehandi':
      // Henna Paisley & Botanical Leaf Bloom
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <path
            className="card-draw-stem"
            d="M32 56 C32 42, 26 30, 32 14"
            stroke="#c59436"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="card-draw-petal"
            d="M32 10 C45 11, 52 22, 50 34 C48 45, 38 53, 27 52 C17 51, 12 43, 14 34 C16 25, 24 22, 30 25 C35 28, 35 35, 30 38 C26 40, 22 38, 22 34"
            stroke={accentHex}
            strokeWidth="1.7"
            strokeLinecap="round"
            fill={accentHex}
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M15 24 C19 16, 25 12, 32 10 C27 17, 22 22, 15 24 Z"
            stroke="#c59436"
            strokeWidth="1.4"
            fill="#c59436"
            fillOpacity="0"
          />
          <circle className="card-bloom-dot" cx="28" cy="33" r="2.2" fill={accentHex} />
          <circle className="card-bloom-dot" cx="42" cy="24" r="1.6" fill="#c59436" />
          <circle className="card-bloom-dot" cx="43" cy="34" r="1.6" fill="#c59436" />
        </svg>
      );

    case 'haldi':
      // Radiant Sunburst Marigold Bloom
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <circle className="card-draw-stem" cx="32" cy="32" r="7" stroke="#b84a27" strokeWidth="1.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              className="card-draw-petal"
              d="M32 6 C37 13, 37 20, 32 25 C27 20, 27 13, 32 6 Z"
              stroke={accentHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="#e8c678"
              fillOpacity="0"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
          <circle className="card-bloom-dot" cx="32" cy="32" r="3" fill="#b84a27" />
        </svg>
      );

    case 'carnival':
      // Festive Jasmine & Scalloped Garland Blossom
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <path
            className="card-draw-stem"
            d="M12 46 C22 54, 42 54, 52 46"
            stroke="#c59436"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              className="card-draw-petal"
              d="M32 10 C37 16, 36 24, 32 28 C28 24, 27 16, 32 10 Z"
              stroke={accentHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="#f6a9c2"
              fillOpacity="0"
              transform={`rotate(${deg} 32 28)`}
            />
          ))}
          <circle className="card-bloom-dot" cx="32" cy="28" r="3.2" fill="#c59436" />
          <circle className="card-bloom-dot" cx="18" cy="49" r="1.8" fill={accentHex} />
          <circle className="card-bloom-dot" cx="46" cy="49" r="1.8" fill={accentHex} />
        </svg>
      );

    case 'sangeet':
      // Starlit Champa & Musical Petal Mandala
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <circle
            className="card-draw-stem"
            cx="32"
            cy="32"
            r="22"
            stroke="#c59436"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              className="card-draw-petal"
              d="M32 10 C38 17, 37 25, 32 32 C27 25, 26 17, 32 10 Z"
              stroke={accentHex}
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill={accentHex}
              fillOpacity="0"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
          <circle className="card-bloom-dot" cx="32" cy="32" r="3.4" fill="#c59436" />
        </svg>
      );

    case 'wedding':
      // Sacred Royal Padma Lotus
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <path
            className="card-draw-stem"
            d="M14 50 H50"
            stroke="#c59436"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            className="card-draw-petal"
            d="M32 46 C20 47, 11 42, 7 33 C16 32, 24 37, 32 46 Z"
            stroke="#c59436"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="#e8c678"
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M32 46 C44 47, 53 42, 57 33 C48 32, 40 37, 32 46 Z"
            stroke="#c59436"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="#e8c678"
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M32 46 C21 41, 15 31, 15 19 C24 22, 29 31, 32 46 Z"
            stroke={accentHex}
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill={accentHex}
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M32 46 C43 41, 49 31, 49 19 C40 22, 35 31, 32 46 Z"
            stroke={accentHex}
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill={accentHex}
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M32 10 C38 21, 39 33, 32 46 C25 33, 26 21, 32 10 Z"
            stroke={accentHex}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill={accentHex}
            fillOpacity="0"
          />
          <circle className="card-bloom-dot" cx="32" cy="55" r="2.2" fill={accentHex} />
        </svg>
      );

    case 'reception':
      // Twilight Rose & Gold Laurel Crest
      return (
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
          <path
            className="card-draw-stem"
            d="M16 48 C10 38, 12 22, 22 14"
            stroke="#c59436"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="card-draw-stem"
            d="M48 48 C54 38, 52 22, 42 14"
            stroke="#c59436"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="card-draw-petal"
            d="M32 22 C39 22, 44 27, 44 33 C44 40, 38 45, 32 45 C25 45, 20 40, 20 33 C20 27, 25 22, 32 22 Z"
            stroke={accentHex}
            strokeWidth="1.6"
            fill="#f6a9c2"
            fillOpacity="0"
          />
          <path
            className="card-draw-petal"
            d="M32 27 C36 27, 38 30, 38 33 C38 36.5, 35.5 39, 32 39 C28.5 39, 26 36.5, 26 33 C26 30, 28.5 27, 32 27 Z"
            stroke="#b84a27"
            strokeWidth="1.4"
            fill="#b84a27"
            fillOpacity="0"
          />
          <circle className="card-bloom-dot" cx="32" cy="33" r="2.2" fill="#c59436" />
          <circle className="card-bloom-dot" cx="32" cy="52" r="2" fill="#c59436" />
        </svg>
      );
  }
};
