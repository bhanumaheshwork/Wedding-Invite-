import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles, RotateCcw } from 'lucide-react';

interface RosePetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  colorStart: string;
  colorEnd: string;
  opacity: number;
  life: number;
  maxLife: number;
  kind: 'petal' | 'gold';
}

const PETAL_PALETTES: Array<[string, string]> = [
  ['#d92638', '#8f1222'], // Deep Indian bridal rose
  ['#b84a27', '#8b2416'], // Saffron sindoor petal
  ['#f26d85', '#c83454'], // Warm coral rose
  ['#f7a8bc', '#df6283'], // Soft blush gulab
  ['#e13b56', '#9b1831'], // Velvet crimson
];

const GOLD_PALETTES: Array<[string, string]> = [
  ['#ffe596', '#c59436'],
  ['#ffd46e', '#a9741c'],
];

export const ScratchRevealInvite: React.FC = () => {
  const medallionRef = useRef<HTMLDivElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const petalCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealCardRef = useRef<HTMLDivElement>(null);

  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef(0);
  const isRevealedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const petalsRef = useRef<RosePetal[]>([]);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Paint the metallic red-burgundy foil onto the scratch canvas
  const paintGoldFoil = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    // Brushed metallic red-burgundy foil diagonal sheen
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#4c0a1a');
    grad.addColorStop(0.22, '#911d36');
    grad.addColorStop(0.42, '#ba344e');
    grad.addColorStop(0.58, '#6e1125');
    grad.addColorStop(0.78, '#a62842');
    grad.addColorStop(1, '#3b0613');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Soft radial specular highlight in upper-left for sculpted metallic-foil depth
    const radHighlight = ctx.createRadialGradient(cx * 0.68, cy * 0.62, r * 0.04, cx, cy, r);
    radHighlight.addColorStop(0, 'rgba(255, 212, 222, 0.36)');
    radHighlight.addColorStop(0.45, 'rgba(214, 78, 108, 0.12)');
    radHighlight.addColorStop(1, 'rgba(34, 4, 12, 0.44)');
    ctx.fillStyle = radHighlight;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fine diagonal brushed-metal micro-lines & subtle satin glint
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255, 224, 232, 0.11)';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 5) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - h * 0.55, h);
      ctx.stroke();
    }
    const sheenBand = ctx.createLinearGradient(w * 0.15, 0, w * 0.85, h);
    sheenBand.addColorStop(0, 'rgba(255, 230, 236, 0)');
    sheenBand.addColorStop(0.46, 'rgba(255, 230, 236, 0.16)');
    sheenBand.addColorStop(0.54, 'rgba(255, 230, 236, 0)');
    ctx.fillStyle = sheenBand;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Delicate gold-stamped ornamental rings on metallic burgundy
    ctx.strokeStyle = 'rgba(232, 198, 120, 0.65)';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([3.5, 4.5]);
    ctx.strokeStyle = 'rgba(232, 198, 120, 0.48)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Small gold-embossed 8-petal lotus emblem above foil copy
    const lotusScale = Math.min(1, w / 260);
    ctx.save();
    ctx.translate(cx, cy - r * 0.34);
    ctx.scale(lotusScale, lotusScale);
    ctx.strokeStyle = 'rgba(244, 217, 152, 0.78)';
    ctx.lineWidth = 1.4;
    for (let a = 0; a < 8; a++) {
      ctx.save();
      ctx.rotate((a * Math.PI) / 4);
      ctx.beginPath();
      ctx.moveTo(0, -3.5);
      ctx.quadraticCurveTo(4.5, -11, 0, -18);
      ctx.quadraticCurveTo(-4.5, -11, 0, -3.5);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 217, 152, 0.85)';
    ctx.fill();
    ctx.restore();

    // Gold-stamped prompt text on the metallic burgundy seal
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(36, 4, 12, 0.65)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 1;

    const titleSize = Math.max(12, Math.round(w * 0.064));
    ctx.fillStyle = '#f6dfa0';
    ctx.font = `600 ${titleSize}px Cinzel, Georgia, serif`;
    ctx.fillText('SCRATCH HERE', cx, cy + r * 0.05);

    const subSize = Math.max(12, Math.round(w * 0.062));
    ctx.fillStyle = 'rgba(244, 220, 162, 0.9)';
    ctx.font = `italic 500 ${subSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('rub gently to unseal', cx, cy + r * 0.25);
    ctx.restore();

    ctx.restore();
  }, []);

  // Initialize foil and keep crisp on resize while unrevealed
  useEffect(() => {
    const paintWhenReady = () => {
      if (!isRevealedRef.current) {
        paintGoldFoil();
      }
    };

    paintWhenReady();
    document.fonts?.ready.then(paintWhenReady);

    const onResize = () => {
      if (!isRevealedRef.current) {
        paintGoldFoil();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [paintGoldFoil]);

  // Spawn & animate realistic 3D-tumbling rose petals + gold-leaf flecks
  const launchRosePetalsBurst = useCallback(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const petalCanvas = petalCanvasRef.current;
    const medallionEl = medallionRef.current;
    if (!petalCanvas) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    petalCanvas.width = Math.round(vw * dpr);
    petalCanvas.height = Math.round(vh * dpr);

    // Burst origin at the center of the medallion in viewport coordinates
    let originX = vw / 2;
    let originY = vh / 2;
    if (medallionEl) {
      const rect = medallionEl.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    const isMobile = vw < 640;
    const burstCount = isMobile ? 68 : 115;
    const showerCount = isMobile ? 28 : 48;
    const newPetals: RosePetal[] = [];

    // 1. Explosive celebratory radial rose-petal burst from the gold seal
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.35;
      const speed = (isMobile ? 4.5 : 6.2) + Math.random() * (isMobile ? 8.5 : 12.5);
      const isGold = i % 7 === 0;
      const palette = isGold
        ? GOLD_PALETTES[i % GOLD_PALETTES.length]
        : PETAL_PALETTES[i % PETAL_PALETTES.length];

      newPetals.push({
        x: originX + (Math.random() - 0.5) * 32,
        y: originY + (Math.random() - 0.5) * 32,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (2.8 + Math.random() * 4.5), // Upward fountain lift
        size: isGold ? 5 + Math.random() * 5 : (isMobile ? 11 : 14) + Math.random() * 11,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.14,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.05 + Math.random() * 0.1,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.025 + Math.random() * 0.035,
        swayAmp: 0.35 + Math.random() * 0.85,
        colorStart: palette[0],
        colorEnd: palette[1],
        opacity: 1,
        life: 0,
        maxLife: 170 + Math.random() * 110,
        kind: isGold ? 'gold' : 'petal',
      });
    }

    // 2. Gentle celebratory rose-petal shower drifting down from the top
    for (let i = 0; i < showerCount; i++) {
      const isGold = i % 8 === 0;
      const palette = isGold
        ? GOLD_PALETTES[i % GOLD_PALETTES.length]
        : PETAL_PALETTES[i % PETAL_PALETTES.length];

      newPetals.push({
        x: Math.random() * vw,
        y: -24 - Math.random() * (vh * 0.45),
        vx: (Math.random() - 0.5) * 1.4,
        vy: 1.5 + Math.random() * 2.4,
        size: isGold ? 5 + Math.random() * 4 : (isMobile ? 11 : 13) + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.09,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.04 + Math.random() * 0.08,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.03 + Math.random() * 0.03,
        swayAmp: 0.6 + Math.random() * 1.1,
        colorStart: palette[0],
        colorEnd: palette[1],
        opacity: 0.96,
        life: 0,
        maxLife: 210 + Math.random() * 110,
        kind: isGold ? 'gold' : 'petal',
      });
    }

    petalsRef.current = [...petalsRef.current, ...newPetals];

    const ctx = petalCanvas.getContext('2d');
    if (!ctx) return;

    if (rafRef.current !== null) return; // Loop already running

    const drawRosePetal = (p: RosePetal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleY = 0.35 + Math.abs(Math.cos(p.flip)) * 0.65;
      ctx.scale(1, scaleY);
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.kind === 'gold') {
        // Delicate diamond gold-leaf flake
        const g = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        g.addColorStop(0, p.colorStart);
        g.addColorStop(1, p.colorEnd);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.72, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.72, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        // Organic curved Indian rose petal silhouette with subtle inner crease highlight
        const s = p.size;
        const grad = ctx.createRadialGradient(-s * 0.2, -s * 0.2, s * 0.08, 0, 0, s);
        grad.addColorStop(0, p.colorStart);
        grad.addColorStop(1, p.colorEnd);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, s * 0.72);
        ctx.bezierCurveTo(-s * 0.85, s * 0.35, -s * 0.95, -s * 0.55, -s * 0.12, -s * 0.72);
        ctx.quadraticCurveTo(0, -s * 0.55, s * 0.14, -s * 0.72);
        ctx.bezierCurveTo(s * 0.95, -s * 0.52, s * 0.85, s * 0.38, 0, s * 0.72);
        ctx.closePath();
        ctx.fill();

        // Soft velvet specular highlight along petal curve
        ctx.strokeStyle = 'rgba(255, 240, 244, 0.28)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(-s * 0.22, s * 0.25);
        ctx.quadraticCurveTo(-s * 0.35, -s * 0.15, -s * 0.08, -s * 0.42);
        ctx.stroke();
      }

      ctx.restore();
    };

    const tick = () => {
      const currentVw = window.innerWidth;
      const currentVh = window.innerHeight;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, currentVw, currentVh);

      const remaining: RosePetal[] = [];

      for (const p of petalsRef.current) {
        p.life += 1;
        // Air drag + gentle gravity + realistic petal flutter sway
        p.vx *= 0.972;
        p.vy = p.vy * 0.978 + 0.095;
        p.swayPhase += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmp;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        const progress = p.life / p.maxLife;
        if (progress > 0.7) {
          p.opacity = Math.max(0, 1 - (progress - 0.7) / 0.3);
        }

        if (p.life < p.maxLife && p.y < currentVh + 60 && p.opacity > 0.01) {
          drawRosePetal(p);
          remaining.push(p);
        }
      }

      ctx.restore();
      petalsRef.current = remaining;

      if (remaining.length > 0) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
      }
    };

    rafRef.current = window.requestAnimationFrame(tick);
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const triggerReveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchProgress(100);
    setHasInteracted(true);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scratchCanvas = scratchCanvasRef.current;

    if (scratchCanvas) {
      if (reduceMotion) {
        gsap.set(scratchCanvas, { autoAlpha: 0 });
      } else {
        gsap.to(scratchCanvas, {
          autoAlpha: 0,
          scale: 1.07,
          duration: 0.55,
          ease: 'power2.out',
        });
      }
    }

    if (revealCardRef.current && !reduceMotion) {
      gsap.fromTo(
        revealCardRef.current,
        { scale: 0.94 },
        { scale: 1, duration: 0.65, ease: 'back.out(1.6)' }
      );
    }

    launchRosePetalsBurst();
  }, [launchRosePetalsBurst]);

  const resetScratch = () => {
    isRevealedRef.current = false;
    setIsRevealed(false);
    setScratchProgress(0);
    setHasInteracted(false);
    lastPointRef.current = null;
    isPointerDownRef.current = false;

    const scratchCanvas = scratchCanvasRef.current;
    if (scratchCanvas) {
      gsap.killTweensOf(scratchCanvas);
      gsap.set(scratchCanvas, { autoAlpha: 1, scale: 1 });
    }
    paintGoldFoil();
  };

  const evaluateScratchedRatio = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const now = performance.now();
    if (now - lastCheckTimeRef.current < 90) return;
    lastCheckTimeRef.current = now;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const imageData = ctx.getImageData(0, 0, width, height).data;
    const cx = width / 2;
    const cy = height / 2;
    const radiusSq = Math.pow(Math.min(width, height) * 0.48, 2);

    let totalInside = 0;
    let clearedInside = 0;
    const step = 8;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= radiusSq) {
          totalInside += 1;
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 40) clearedInside += 1;
        }
      }
    }

    if (totalInside === 0) return;
    const pct = Math.min(100, Math.round((clearedInside / totalInside) * 100));
    setScratchProgress(pct);

    if (pct >= 42) {
      triggerReveal();
    }
  }, [triggerReveal]);

  const scratchAtPoint = useCallback(
    (clientX: number, clientY: number, isPressed: boolean, pointerType: string) => {
      if (isRevealedRef.current) return;
      const canvas = scratchCanvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const dpr = canvas.width / rect.width;
      const baseRadius = Math.max(15, rect.width * (pointerType === 'touch' ? 0.09 : 0.078));
      const brushRadius = isPressed ? baseRadius * 1.18 : baseRadius;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushRadius * 2;

      const prev = lastPointRef.current;
      if (prev) {
        const dist = Math.hypot(x - prev.x, y - prev.y);
        if (dist < rect.width * 0.6) {
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      lastPointRef.current = { x, y };
      if (!hasInteracted) setHasInteracted(true);
      evaluateScratchedRatio();
    },
    [evaluateScratchedRatio, hasInteracted]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current) return;
    isPointerDownRef.current = true;
    lastPointRef.current = null;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    scratchAtPoint(e.clientX, e.clientY, true, e.pointerType);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current) return;
    // Desktop mouse scratches gracefully on hover sweep OR click-drag; touch scratches while rubbing
    if (e.pointerType === 'mouse' || isPointerDownRef.current) {
      scratchAtPoint(e.clientX, e.clientY, isPointerDownRef.current, e.pointerType);
    }
  };

  const handlePointerEnd = () => {
    isPointerDownRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <section
      id="scratch-invite"
      aria-labelledby="scratch-invite-heading"
      className="relative z-10 bg-[#faf3e4] text-[#6b1d2f] py-16 sm:py-24 px-5 sm:px-8 overflow-hidden"
    >
      {/* Full-viewport celebratory rose-petal particle overlay */}
      <canvas
        ref={petalCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-[120]"
      />

      {/* Subtle warm radial glow behind the medallion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(138,24,48,0.16) 0%, rgba(232,198,120,0.22) 44%, rgba(250,243,228,0) 74%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Eyebrow & Title */}
        <p className="font-archivo text-[0.76rem] sm:text-[0.86rem] tracking-[0.26em] uppercase text-[#9a6b20]">
          A Royal Keepsake · Udaipur
        </p>
        <h2
          id="scratch-invite-heading"
          className="mt-2.5 font-archivo text-[clamp(2.35rem,4.8vw,3.9rem)] font-semibold uppercase tracking-[0.06em] leading-[1.04] text-[#6b1d2f]"
          style={{ textWrap: 'balance' }}
        >
          Unseal Your{' '}
          <span className="font-playfair font-medium italic lowercase text-[clamp(2.75rem,5.4vw,4.5rem)] tracking-[0.01em] text-[#b84a27]">
            invitation
          </span>
        </h2>
        <p className="mt-3 sm:mt-4 font-playfair text-[1.2rem] sm:text-[1.38rem] text-[#6b1d2f]/85 max-w-md leading-relaxed">
          {isRevealed
            ? 'Rose petals are in the air—we cannot wait to celebrate with you by Lake Pichola.'
            : 'Sweep your cursor or rub gently with your finger over the burgundy seal to reveal your message.'}
        </p>

        {/* Ornate Circular Metallic Burgundy Scratch Medallion */}
        <div
          ref={medallionRef}
          className="relative mt-8 sm:mt-9 flex items-center justify-center w-[min(14.5rem,64vw)] h-[min(14.5rem,64vw)] sm:w-[16rem] sm:h-[16rem]"
        >
          {/* Decorative Outer Royal Lotus Halo SVG Ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -inset-3.5 sm:-inset-4 w-[calc(100%+1.75rem)] h-[calc(100%+1.75rem)] sm:w-[calc(100%+2rem)] sm:h-[calc(100%+2rem)] text-[#c59436]"
            fill="none"
          >
            <circle cx="200" cy="200" r="192" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
            <circle
              cx="200"
              cy="200"
              r="184"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 6"
              strokeOpacity="0.55"
            />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 200 200)`}>
                <path
                  d="M200 4C204 11 204 16 200 21C196 16 196 11 200 4Z"
                  fill={deg % 60 === 0 ? '#8c1931' : '#c59436'}
                  fillOpacity={deg % 60 === 0 ? '0.78' : '0.45'}
                />
              </g>
            ))}
          </svg>

          {/* Circular Medallion Shell */}
          <div className="relative w-full h-full rounded-full shadow-[0_20px_54px_-18px_rgba(74,14,28,0.45)] border-[2.5px] border-[#c59436]/80 bg-[#fcf7ea] overflow-hidden select-none">
            {/* Revealed Keepsake Content Underneath */}
            <div
              ref={revealCardRef}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-5 text-center"
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, #fffdf7 0%, #faf0d7 68%, #f2e1bc 100%)',
              }}
            >
              {/* Inner delicate filigree border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 sm:inset-2.5 rounded-full border border-[#c59436]/45"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[0.8rem] sm:inset-[0.95rem] rounded-full border border-dashed border-[#8c1931]/28"
              />

              {/* Painted Rose / Lotus Flourish */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 40"
                className="w-8 h-5 sm:w-9 sm:h-6 text-[#8c1931] mb-1"
                fill="none"
              >
                <path
                  d="M32 6C36 14 37 22 32 32C27 22 28 14 32 6Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="currentColor"
                  fillOpacity="0.16"
                />
                <path
                  d="M32 32C23 29 18 22 17 13C24 15 29 21 32 32Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
                <path
                  d="M32 32C41 29 46 22 47 13C40 15 35 21 32 32Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
                <path
                  d="M12 34C20 35 26 34 32 32C38 34 44 35 52 34"
                  stroke="#c59436"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>

              <span className="font-archivo text-[0.54rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-[#9a6b20]">
                Vaibhav &amp; Trisha
              </span>

              <h3 className="mt-1 font-archivo text-[1.2rem] sm:text-[1.42rem] font-semibold uppercase tracking-[0.06em] leading-[1.02] text-[#6b1d2f]">
                You Are
                <span className="block font-playfair font-medium italic lowercase text-[1.68rem] sm:text-[2rem] text-[#8c1931] leading-[0.94] mt-0.5">
                  Invited
                </span>
              </h3>

              <div className="mt-2 pt-1.5 border-t border-[#c59436]/40 max-w-[10.5rem]">
                <p className="font-playfair italic text-[0.84rem] sm:text-[0.92rem] text-[#6b1d2f]/85 leading-snug">
                  December 15, 2026
                </p>
                <p className="font-archivo text-[0.48rem] sm:text-[0.54rem] uppercase tracking-[0.15em] text-[#9a6b20] mt-0.5">
                  The Leela Palace · Udaipur
                </p>
              </div>
            </div>

            {/* Interactive Metallic Red-Burgundy Scratch Canvas */}
            <canvas
              ref={scratchCanvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onPointerLeave={handlePointerEnd}
              aria-label="Scratch off metallic burgundy seal to reveal your wedding invitation"
              className={`absolute inset-0 w-full h-full rounded-full touch-none ${
                isRevealed ? 'pointer-events-none' : 'cursor-pointer'
              }`}
            />
          </div>
        </div>

        {/* Status / Accessible Fallback & Replay Controls */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 min-h-[2.75rem]">
          {!isRevealed ? (
            <>
              {hasInteracted && scratchProgress > 0 && (
                <span className="font-archivo text-xs uppercase tracking-[0.18em] text-[#9a6b20] tabular-nums">
                  Unsealing · {Math.min(99, Math.round((scratchProgress / 42) * 100))}%
                </span>
              )}
              <button
                type="button"
                onClick={triggerReveal}
                className="min-h-[44px] px-6 py-2 rounded-full border border-[#c59436]/65 bg-[#fcf7ea] text-[#6b1d2f] font-archivo text-xs uppercase tracking-[0.16em] hover:bg-[#6b1d2f] hover:border-[#6b1d2f] hover:text-[#faf3e4] transition-colors cursor-pointer inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b84a27]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Tap to Unseal
              </button>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={launchRosePetalsBurst}
                className="min-h-[44px] px-6 py-2 rounded-full bg-[#b84a27] text-[#faf3e4] font-archivo text-xs uppercase tracking-[0.16em] hover:bg-[#4a1422] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b84a27]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Toss More Rose Petals
              </button>
              <button
                type="button"
                onClick={resetScratch}
                className="min-h-[44px] px-4 py-2 rounded-full border border-[#6b1d2f]/30 text-[#6b1d2f]/80 font-archivo text-xs uppercase tracking-[0.16em] hover:text-[#6b1d2f] hover:border-[#6b1d2f]/55 transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b84a27]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Scratch Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
