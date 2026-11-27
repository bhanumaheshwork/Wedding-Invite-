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
  ['#ef4a23', '#b82914'], // Vermilion sindoor petal
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

  // Paint the metallic royal gold-leaf foil onto the scratch canvas
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

    // Metallic brushed gold-leaf radial + linear sheen
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#c6922e');
    grad.addColorStop(0.24, '#f3dc93');
    grad.addColorStop(0.48, '#d4a13c');
    grad.addColorStop(0.72, '#fae6a8');
    grad.addColorStop(1, '#a8741e');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Soft radial highlight in upper-left for hammered gold-coin depth
    const radHighlight = ctx.createRadialGradient(cx * 0.72, cy * 0.65, r * 0.05, cx, cy, r);
    radHighlight.addColorStop(0, 'rgba(255, 250, 224, 0.45)');
    radHighlight.addColorStop(0.6, 'rgba(255, 240, 185, 0.05)');
    radHighlight.addColorStop(1, 'rgba(115, 72, 14, 0.25)');
    ctx.fillStyle = radHighlight;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fine diagonal brushed foil micro-lines
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255, 248, 220, 0.14)';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - h * 0.55, h);
      ctx.stroke();
    }
    ctx.restore();

    // Delicate embossed ornamental rings
    ctx.strokeStyle = 'rgba(105, 66, 12, 0.34)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = 'rgba(105, 66, 12, 0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Small engraved 8-petal lotus emblem above foil copy
    ctx.save();
    ctx.translate(cx, cy - r * 0.34);
    ctx.strokeStyle = 'rgba(102, 60, 10, 0.55)';
    ctx.lineWidth = 1.4;
    for (let a = 0; a < 8; a++) {
      ctx.save();
      ctx.rotate((a * Math.PI) / 4);
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.quadraticCurveTo(5, -13, 0, -21);
      ctx.quadraticCurveTo(-5, -13, 0, -4);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(102, 60, 10, 0.55)';
    ctx.fill();
    ctx.restore();

    // Engraved prompt text on the gold seal
    ctx.fillStyle = '#5f3708';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const titleSize = Math.max(15, Math.round(w * 0.068));
    ctx.font = `700 ${titleSize}px Archivo, sans-serif`;
    ctx.fillText('SCRATCH HERE', cx, cy + r * 0.04);

    const subSize = Math.max(13, Math.round(w * 0.056));
    ctx.fillStyle = 'rgba(95, 55, 8, 0.8)';
    ctx.font = `italic 500 ${subSize}px Playfair, Georgia, serif`;
    ctx.fillText('rub gently to unseal', cx, cy + r * 0.24);

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
      const baseRadius = Math.max(20, rect.width * (pointerType === 'touch' ? 0.085 : 0.072));
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
      className="relative z-10 bg-[#faf3e4] text-[#5c1a1b] py-16 sm:py-24 px-5 sm:px-8 overflow-hidden"
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
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(255,212,110,0.34) 0%, rgba(239,74,35,0.08) 48%, rgba(250,243,228,0) 74%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Eyebrow & Title */}
        <p className="font-playfair text-[0.92rem] sm:text-[1.05rem] tracking-[0.16em] uppercase text-[#8f661d]">
          A Royal Keepsake · Udaipur
        </p>
        <h2
          id="scratch-invite-heading"
          className="mt-2 font-archivo text-[2.9rem] sm:text-[4.2rem] lg:text-[4.8rem] font-extrabold uppercase tracking-[-0.025em] leading-[0.88] text-[#5c1a1b]"
          style={{ textWrap: 'balance' }}
        >
          Unseal Your{' '}
          <span className="font-playfair font-light italic lowercase text-[2.7rem] sm:text-[3.9rem] lg:text-[4.5rem] text-[#ef4a23]">
            invitation
          </span>
        </h2>
        <p className="mt-3 sm:mt-4 font-playfair text-[1.08rem] sm:text-[1.24rem] text-[#5c1a1b]/80 max-w-md leading-relaxed">
          {isRevealed
            ? 'Rose petals are in the air—we cannot wait to celebrate with you by Lake Pichola.'
            : 'Sweep your cursor or rub gently with your finger over the gold seal to reveal your message.'}
        </p>

        {/* Ornate Circular Gold-Leaf Scratch Medallion */}
        <div
          ref={medallionRef}
          className="relative mt-9 sm:mt-11 flex items-center justify-center w-[min(20.5rem,82vw)] h-[min(20.5rem,82vw)] sm:w-[23rem] sm:h-[23rem]"
        >
          {/* Decorative Outer Royal Lotus Halo SVG Ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -inset-5 sm:-inset-6 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] sm:h-[calc(100%+3rem)] text-[#c59436]"
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
                  fill={deg % 60 === 0 ? '#ef4a23' : '#c59436'}
                  fillOpacity={deg % 60 === 0 ? '0.68' : '0.45'}
                />
              </g>
            ))}
          </svg>

          {/* Circular Medallion Shell */}
          <div className="relative w-full h-full rounded-full shadow-[0_26px_70px_-24px_rgba(92,26,27,0.38)] border-[3px] border-[#c59436]/75 bg-[#fcf7ea] overflow-hidden select-none">
            {/* Revealed Keepsake Content Underneath */}
            <div
              ref={revealCardRef}
              className="absolute inset-0 flex flex-col items-center justify-center p-7 sm:p-9 text-center"
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, #fffdf7 0%, #faf0d7 68%, #f2e1bc 100%)',
              }}
            >
              {/* Inner delicate filigree border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 sm:inset-4 rounded-full border border-[#c59436]/45"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[1.15rem] sm:inset-[1.35rem] rounded-full border border-dashed border-[#ef4a23]/25"
              />

              {/* Painted Rose / Lotus Flourish */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 40"
                className="w-11 h-7 sm:w-12 sm:h-8 text-[#ef4a23] mb-2"
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

              <span className="font-archivo text-[0.68rem] sm:text-[0.76rem] uppercase tracking-[0.22em] text-[#8f661d]">
                Ram &amp; Sita
              </span>

              <h3 className="mt-1.5 font-archivo text-[2.25rem] sm:text-[2.75rem] font-extrabold uppercase tracking-[-0.025em] leading-[0.9] text-[#5c1a1b]">
                You Are
                <span className="block font-playfair font-normal italic lowercase text-[2.5rem] sm:text-[3.1rem] text-[#ef4a23] leading-[0.95] mt-0.5">
                  Invited
                </span>
              </h3>

              <div className="mt-3 pt-2.5 border-t border-[#c59436]/40 max-w-[14rem]">
                <p className="font-playfair italic text-[0.9rem] sm:text-[1rem] text-[#5c1a1b]/85 leading-snug">
                  December 15, 2026
                </p>
                <p className="font-archivo text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.14em] text-[#8f661d] mt-1">
                  The Leela Palace · Udaipur
                </p>
              </div>
            </div>

            {/* Interactive Metallic Gold-Leaf Scratch Canvas */}
            <canvas
              ref={scratchCanvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onPointerLeave={handlePointerEnd}
              aria-label="Scratch off gold seal to reveal your wedding invitation"
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
                <span className="font-archivo text-xs uppercase tracking-[0.16em] text-[#8f661d] tabular-nums">
                  Unsealing · {Math.min(99, Math.round((scratchProgress / 42) * 100))}%
                </span>
              )}
              <button
                type="button"
                onClick={triggerReveal}
                className="min-h-[44px] px-5 py-2 rounded-full border border-[#c59436]/55 bg-[#fcf7ea] text-[#5c1a1b] font-archivo text-xs uppercase tracking-[0.14em] hover:bg-[#ef4a23] hover:border-[#ef4a23] hover:text-[#faf3e4] transition-colors cursor-pointer inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23]"
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
                className="min-h-[44px] px-5 py-2 rounded-full bg-[#ef4a23] text-[#faf3e4] font-archivo text-xs uppercase tracking-[0.14em] hover:bg-[#471418] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Toss More Rose Petals
              </button>
              <button
                type="button"
                onClick={resetScratch}
                className="min-h-[44px] px-4 py-2 rounded-full border border-[#5c1a1b]/25 text-[#5c1a1b]/80 font-archivo text-xs uppercase tracking-[0.14em] hover:text-[#5c1a1b] hover:border-[#5c1a1b]/50 transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4a23]"
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
