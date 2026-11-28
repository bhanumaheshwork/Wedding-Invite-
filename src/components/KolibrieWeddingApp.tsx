import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Calendar, MapPin, X, Volume2, VolumeX } from 'lucide-react';
import { LoveStoryStack } from './LoveStoryStack';
import { ElegantCountdown } from './ElegantCountdown';
import { WeddingEventsFlow } from './WeddingEventsFlow';
import { IntroRibbonWipe, hasSeenIntroBefore } from './IntroRibbonWipe';
import { ScratchRevealInvite } from './ScratchRevealInvite';
import { RoyalEnvelopeDoors } from './RoyalEnvelopeDoors';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export const KolibrieWeddingApp: React.FC = () => {
  const [showIntroWipe, setShowIntroWipe] = useState<boolean>(() => !hasSeenIntroBefore());
  const [pageReady, setPageReady] = useState<boolean>(() => hasSeenIntroBefore());
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [invitationUnlocked, setInvitationUnlocked] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicBtnRef = useRef<HTMLButtonElement | null>(null);
  const userMutedRef = useRef(false);
  const isAttemptingPlayRef = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  const WEDDING_SONG_SRC = '/assets/wedding-song-1m07s.mp3';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;
    audio.muted = false;

    const removeUnlockListeners = () => {
      window.removeEventListener('touchend', handleFirstInteraction, true);
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
    };

    const handlePlay = () => {
      isAttemptingPlayRef.current = false;
      setIsPlayingMusic(true);
      removeUnlockListeners();
    };

    const handlePause = () => {
      isAttemptingPlayRef.current = false;
      setIsPlayingMusic(false);
    };

    const tryAutoPlay = () => {
      if (userMutedRef.current || !audio.paused || isAttemptingPlayRef.current) return;
      isAttemptingPlayRef.current = true;
      audio.muted = false;
      audio.volume = 0.6;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAttemptingPlayRef.current = false;
            setIsPlayingMusic(true);
            removeUnlockListeners();
          })
          .catch(() => {
            // Mobile/desktop browser blocked autoplay before a valid user tap/click; keep listeners active
            isAttemptingPlayRef.current = false;
            setIsPlayingMusic(false);
          });
      } else {
        isAttemptingPlayRef.current = false;
      }
    };

    const handleFirstInteraction = (e: Event) => {
      if (userMutedRef.current) {
        removeUnlockListeners();
        return;
      }
      // Let the music toggle button handle taps on itself without double-triggering
      if (musicBtnRef.current && e.target instanceof Node && musicBtnRef.current.contains(e.target)) {
        return;
      }
      tryAutoPlay();
    };

    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Attach mobile-safe gesture unlock listeners (touchend + click + keydown avoid touchstart scroll-abort)
    window.addEventListener('touchend', handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { capture: true, passive: true });

    // Attempt immediate autoplay on page open
    tryAutoPlay();

    return () => {
      removeUnlockListeners();
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (pageReady) {
      document.documentElement.setAttribute('data-page-ready', 'true');
    }
  }, [pageReady]);

  // Strictly lock page scroll at the top until the guest opens the envelope
  useEffect(() => {
    if (invitationUnlocked) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverscroll = body.style.overscrollBehavior;

    window.scrollTo(0, 0);
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';

    const blockWheelOrTouchMove = (e: Event) => {
      e.preventDefault();
    };

    const blockScrollKeys = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (!scrollKeys.includes(e.key)) return;
      // Preserve Space/Enter activation when keyboard-focused on a button (like the wax seal)
      const activeTag = document.activeElement?.tagName;
      if (e.key === ' ' && activeTag === 'BUTTON') return;
      e.preventDefault();
    };

    window.addEventListener('wheel', blockWheelOrTouchMove, { passive: false });
    window.addEventListener('touchmove', blockWheelOrTouchMove, { passive: false });
    window.addEventListener('keydown', blockScrollKeys, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overscrollBehavior = prevBodyOverscroll;
      window.removeEventListener('wheel', blockWheelOrTouchMove);
      window.removeEventListener('touchmove', blockWheelOrTouchMove);
      window.removeEventListener('keydown', blockScrollKeys);
    };
  }, [invitationUnlocked]);

  // Keep all GSAP pinned sections perfectly synchronized after fonts, images, and layout settle in production
  useEffect(() => {
    if (!invitationUnlocked) return;

    let timerId: number | null = null;
    const scheduleRefresh = () => {
      if (timerId !== null) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };

    scheduleRefresh();
    window.addEventListener('load', scheduleRefresh);
    document.fonts?.ready.then(scheduleRefresh);

    const mainEl = mainRef.current;
    const imgCleanups: Array<() => void> = [];
    let ro: ResizeObserver | null = null;

    if (mainEl) {
      const imgs = Array.from(mainEl.querySelectorAll('img'));
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', scheduleRefresh, { once: true });
          img.addEventListener('error', scheduleRefresh, { once: true });
          imgCleanups.push(() => {
            img.removeEventListener('load', scheduleRefresh);
            img.removeEventListener('error', scheduleRefresh);
          });
        }
      });

      // Observe only non-pinned sections above pinned triggers to avoid pin-spacer feedback loops
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(scheduleRefresh);
        const scratchEl = mainEl.querySelector('#scratch-invite');
        const celebrationsEl = mainEl.querySelector('#celebrations');
        if (scratchEl) ro.observe(scratchEl);
        if (celebrationsEl) ro.observe(celebrationsEl);
      }
    }

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener('load', scheduleRefresh);
      imgCleanups.forEach((fn) => fn());
      ro?.disconnect();
    };
  }, [pageReady, showIntroWipe, invitationUnlocked]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userMutedRef.current = true;
      isAttemptingPlayRef.current = false;
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      userMutedRef.current = false;
      isAttemptingPlayRef.current = true;
      audio.muted = false;
      audio.volume = 0.6;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAttemptingPlayRef.current = false;
            setIsPlayingMusic(true);
          })
          .catch(() => {
            isAttemptingPlayRef.current = false;
            setIsPlayingMusic(false);
          });
      } else {
        isAttemptingPlayRef.current = false;
      }
    }
  };

  const handleEnvelopeOpenStart = () => {
    setEnvelopeOpened(true);
    const audio = audioRef.current;
    if (audio && audio.paused && !userMutedRef.current && !isAttemptingPlayRef.current) {
      isAttemptingPlayRef.current = true;
      audio.muted = false;
      audio.volume = 0.6;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAttemptingPlayRef.current = false;
            setIsPlayingMusic(true);
          })
          .catch(() => {
            isAttemptingPlayRef.current = false;
          });
      } else {
        isAttemptingPlayRef.current = false;
      }
    }
  };

  return (
    <div
      className={`relative selection:bg-[#b84a27] selection:text-[#faf3e4] ${
        invitationUnlocked ? 'min-h-screen' : 'h-screen h-[100dvh] overflow-hidden'
      }`}
    >
      {/* Pre-trimmed custom wedding song starting cleanly at 1m 07s */}
      <audio
        ref={audioRef}
        src={WEDDING_SONG_SRC}
        loop
        playsInline
        preload="auto"
      />

      {/* 5.1 First-Visit-Only Orange Ribbon Load Wipe */}
      {showIntroWipe && (
        <IntroRibbonWipe
          onRevealStart={() => {
            setPageReady(true);
            document.documentElement.setAttribute('data-page-ready', 'true');
          }}
          onComplete={() => setShowIntroWipe(false)}
        />
      )}

      {/* Music Toggle Floating Button */}
      <button
        ref={musicBtnRef}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlayingMusic ? 'Mute wedding music' : 'Play wedding music'}
        aria-pressed={isPlayingMusic}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#faf3e4]/95 backdrop-blur-sm text-[#6b1d2f] border border-[#c59436] px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-full shadow-[0_10px_28px_-8px_rgba(74,20,34,0.32)] hover:bg-[#6b1d2f] hover:border-[#6b1d2f] hover:text-[#faf3e4] transition-all flex items-center gap-2 font-archivo text-[0.7rem] uppercase tracking-[0.18em] cursor-pointer"
      >
        {isPlayingMusic ? <Volume2 className="w-4 h-4 shrink-0" /> : <VolumeX className="w-4 h-4 shrink-0" />}
        <span>{isPlayingMusic ? "Mute" : "Play Music"}</span>
      </button>

      <main ref={mainRef} className={`transition-opacity duration-700 ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* 5.4 Hero */}
        <section 
          className="relative z-10 isolate bg-[#faf3e4] h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center cursor-default select-none"
        >
          {/* Fine-Art Rajasthani Royal Udaipur Watercolor Backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[#faf3e4] overflow-hidden">
            <img
              src="/src/assets/images/hero_royal_udaipur_art_1795854678329.jpg"
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out ${
                envelopeOpened ? 'scale-100' : 'scale-105'
              }`}
            />
            {/* Soft luminous ivory center wash so Imperial Garnet hero typography stays crisp while painted borders & palace shine */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 68% 54% at 50% 44%, rgba(250,243,228,0.48) 0%, rgba(250,243,228,0.14) 64%, rgba(250,243,228,0) 100%)',
              }}
            />
          </div>

          {/* Subtle royal gold inner hairline frame visible once the envelope doors part */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-3 sm:inset-5 z-10 border border-[#c59436]/40 transition-opacity duration-1000 ${
              envelopeOpened ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hero Content */}
          <div
            className={`relative z-20 flex flex-col items-center text-center mt-[-3.5rem] sm:mt-[-4.5rem] px-6 max-w-4xl transition-all duration-1000 ease-out ${
              envelopeOpened ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
            }`}
          >
            <p className="font-archivo text-[0.68rem] sm:text-[0.82rem] font-medium uppercase tracking-[0.3em] text-[#9a6b20] mb-3 sm:mb-4">
              Shubh Vivah <span aria-hidden="true">·</span> December 15, 2026
            </p>

            <h1
              className="font-archivo font-semibold uppercase tracking-[0.06em] leading-[1.04] text-[#6b1d2f] text-[clamp(2.55rem,6.4vw,5.4rem)]"
              style={{ textWrap: 'balance' }}
            >
              Vaibhav{' '}
              <span className="font-playfair font-normal italic lowercase text-[#b84a27] text-[clamp(2.9rem,7.2vw,6.1rem)] mx-0.5 sm:mx-2 align-baseline">
                &amp;
              </span>{' '}
              Trisha
            </h1>

            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#c59436]" aria-hidden="true" />
              <p className="font-playfair italic font-medium text-[clamp(1.6rem,3.3vw,2.55rem)] tracking-[0.02em] text-[#b84a27] leading-none">
                forever united
              </p>
              <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#c59436]" aria-hidden="true" />
            </div>

            <a
              href="#celebrations"
              className="group mt-7 sm:mt-9 inline-flex items-center gap-3 font-playfair italic text-[1.45rem] sm:text-[1.75rem] font-medium tracking-[0.01em] text-[#6b1d2f] hover:text-[#b84a27] transition-colors border-b border-[#c59436]/75 hover:border-[#b84a27] pb-1"
            >
              <span>See the itinerary</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#c59436] bg-[#faf3e4]/90 text-[#6b1d2f] group-hover:bg-[#6b1d2f] group-hover:border-[#6b1d2f] group-hover:text-[#faf3e4] text-sm not-italic flex items-center justify-center transition-all group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>

          {/* Blessings Marquee */}
          <div
            className={`absolute bottom-5 sm:bottom-6 left-0 right-0 z-20 overflow-hidden pointer-events-none py-2.5 border-y border-[#c59436]/35 bg-[#faf3e4]/82 backdrop-blur-sm transition-opacity duration-700 ${
              envelopeOpened ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="animate-marquee flex gap-10 sm:gap-12 items-center font-archivo text-xs sm:text-sm font-medium uppercase tracking-[0.26em] text-[#6b1d2f]/85">
              <span>UDAIPUR PALACE 2026</span>
              <span className="text-[#c59436]">✦</span>
              <span>ROYAL BLESSINGS</span>
              <span className="text-[#c59436]">✦</span>
              <span>VAIBHAV &amp; TRISHA</span>
              <span className="text-[#c59436]">✦</span>
              <span>SEVEN PHERAS</span>
              <span className="text-[#c59436]">✦</span>
              <span>UDAIPUR PALACE 2026</span>
              <span className="text-[#c59436]">✦</span>
              <span>ROYAL BLESSINGS</span>
              <span className="text-[#c59436]">✦</span>
              <span>VAIBHAV &amp; TRISHA</span>
              <span className="text-[#c59436]">✦</span>
              <span>SEVEN PHERAS</span>
              <span className="text-[#c59436]">✦</span>
            </div>
          </div>

          {/* Royal Gatefold Envelope Doors with Embossed Wax Seal */}
          <RoyalEnvelopeDoors
            onOpenStart={handleEnvelopeOpenStart}
            onOpened={() => setInvitationUnlocked(true)}
          />
        </section>

        {/* All invitation sections remain inaccessible until the guest taps the wax seal and opens the envelope */}
        {invitationUnlocked && (
          <>
            {/* Interactive Metallic Burgundy Scratch Medallion with Rose Petals Burst */}
            <ScratchRevealInvite />

            {/* Pinned Editorial Countdown under Hero */}
            <ElegantCountdown />

        {/* 5.5 Bride & Groom Showcase with Royal Indian Wedding Art Background */}
        <section
          id="celebrations"
          className="relative z-10 isolate py-24 md:py-36 px-5 sm:px-8 bg-[#faf3e4] overflow-hidden"
        >
          {/* Full-Section Fine-Art Indian Wedding Background */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img
              src="/src/assets/images/wedding_art_bg_1795778629953.jpg"
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf3e4]/50 via-[#faf3e4]/28 to-[#faf3e4]/55" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <p className="font-playfair italic text-[1.45rem] sm:text-[1.75rem] font-medium leading-[1.28] text-[#6b1d2f]/90 max-w-md mx-auto lg:mx-0">
                Two hearts, one royal promise. Join us in Udaipur as we celebrate the sacred union of
              </p>
              <h2
                className="font-archivo text-[clamp(2.65rem,5.2vw,4.5rem)] font-semibold uppercase tracking-[0.05em] leading-[1.02] text-[#6b1d2f]"
                style={{ textWrap: 'balance' }}
              >
                Bride &amp; <br />
                <span className="font-playfair font-medium italic lowercase text-[clamp(3.1rem,5.8vw,5.1rem)] tracking-[0.01em] text-[#b84a27]">
                  groom
                </span>
              </h2>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-3 border-t border-[#c59436]/40 max-w-md mx-auto lg:mx-0 text-[#6b1d2f]">
                <span className="inline-flex items-center gap-2 font-archivo text-xs sm:text-[0.8rem] uppercase tracking-[0.16em]">
                  <Calendar className="w-3.5 h-3.5 text-[#b84a27]" />
                  December 15, 2026
                </span>
                <span aria-hidden="true" className="text-[#c59436]">·</span>
                <span className="inline-flex items-center gap-2 font-archivo text-xs sm:text-[0.8rem] uppercase tracking-[0.16em]">
                  <MapPin className="w-3.5 h-3.5 text-[#b84a27]" />
                  The Leela Palace, Udaipur
                </span>
              </div>
            </div>

            {/* Right Stage: Bride & Groom Editorial Portraits */}
            <div className="lg:col-span-7 relative">
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Decorative & Emblem between portraits on desktop/tablet */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#faf3e4] border border-[#c59436] shadow-xl"
                >
                  <span className="font-playfair italic text-4xl text-[#b84a27] leading-none">&amp;</span>
                </div>

                {/* Groom Portrait Card */}
                <article className="group bg-[#faf3e4]/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-[2rem] shadow-2xl border border-[#c59436]/45 transition-transform duration-500 sm:-rotate-2 hover:rotate-0">
                  <div className="relative aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden bg-[#e9dcc6]">
                    <img
                      src="/src/assets/images/indian_groom_royal_1795778663105.jpg"
                      alt="Vaibhav, the Groom in royal ivory and gold sherwani"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#4a1422]/75 via-[#4a1422]/20 to-transparent" />
                    <span className="absolute bottom-3.5 left-4 font-archivo text-[0.68rem] uppercase tracking-[0.22em] text-[#e8c678]">
                      The Groom
                    </span>
                  </div>
                  <div className="pt-4 pb-2 px-2 text-center">
                    <h3 className="font-archivo text-2xl sm:text-[1.85rem] font-semibold uppercase tracking-[0.1em] text-[#6b1d2f]">
                      Vaibhav
                    </h3>
                    <p className="font-playfair italic text-base sm:text-lg text-[#6b1d2f]/80 mt-1">
                      With love &amp; blessings from his family
                    </p>
                  </div>
                </article>

                {/* Bride Portrait Card */}
                <article className="group bg-[#faf3e4]/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-[2rem] shadow-2xl border border-[#c59436]/45 transition-transform duration-500 sm:mt-10 sm:rotate-2 hover:rotate-0">
                  <div className="relative aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden bg-[#e9dcc6]">
                    <img
                      src="/src/assets/images/indian_bride_portrait_1795778629288.jpg"
                      alt="Trisha, the Bride in regal bridal lehenga"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#4a1422]/75 via-[#4a1422]/20 to-transparent" />
                    <span className="absolute bottom-3.5 left-4 font-archivo text-[0.68rem] uppercase tracking-[0.22em] text-[#e8c678]">
                      The Bride
                    </span>
                  </div>
                  <div className="pt-4 pb-2 px-2 text-center">
                    <h3 className="font-archivo text-2xl sm:text-[1.85rem] font-semibold uppercase tracking-[0.1em] text-[#6b1d2f]">
                      Trisha
                    </h3>
                    <p className="font-playfair italic text-base sm:text-lg text-[#6b1d2f]/80 mt-1">
                      With love &amp; blessings from her family
                    </p>
                  </div>
                </article>
              </div>
            </div>

          </div>
        </section>

        {/* 5-Chapter Pinned 3D Editorial Love Story */}
        <LoveStoryStack />

        {/* 6-Day Wedding Events Flow with Painted Rajasthani Mural Art Background */}
        <WeddingEventsFlow onRsvpClick={() => setRsvpOpen(true)} />

        {/* Footer / Final Invitation */}
        <footer className="relative z-20 isolate py-24 px-6 bg-[#4a1422] text-[#faf3e4] text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="font-playfair italic text-4xl sm:text-5xl text-[#e8c678] block">
              Vaibhav &amp; Trisha
            </span>
            <h2
              className="font-archivo text-3xl sm:text-5xl font-semibold uppercase tracking-[0.08em] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Forever United in Udaipur
            </h2>
            <p className="font-playfair italic text-xl sm:text-2xl text-[#faf3e4]/85">
              “With joyful hearts, we invite you to celebrate the beginning of our forever.”
            </p>
            <div className="pt-6 flex justify-center gap-4">
              <button
                onClick={() => setRsvpOpen(true)}
                className="px-9 py-4 bg-[#b84a27] text-[#faf3e4] rounded-full font-archivo text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] hover:bg-[#e8c678] hover:text-[#4a1422] transition-colors cursor-pointer"
              >
                RSVP Now
              </button>
            </div>
          </div>
        </footer>
          </>
        )}

      </main>

      {/* RSVP Modal */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 bg-[#3a0f1b]/88 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#faf3e4] text-[#6b1d2f] rounded-3xl p-8 shadow-2xl border-2 border-[#c59436]">
            <button
              onClick={() => setRsvpOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#4a1422] text-[#faf3e4] rounded-full hover:bg-[#b84a27] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#b84a27] text-[#faf3e4] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-archivo text-2xl sm:text-3xl font-semibold uppercase tracking-[0.06em] text-[#6b1d2f]">
                  You&apos;re Confirmed
                </h3>
                <p className="font-playfair italic text-xl text-[#6b1d2f]/85">
                  We are thrilled to celebrate with you in Udaipur.
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="px-7 py-2.5 bg-[#4a1422] text-[#faf3e4] rounded-full font-archivo text-xs uppercase tracking-[0.18em] cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#b84a27', '#e8c678', '#c59436', '#6b1d2f'] });
                }}
                className="space-y-4"
              >
                <h3 className="font-archivo text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em] text-center mb-6 text-[#6b1d2f]">
                  Wedding RSVP
                </h3>

                <div>
                  <label className="block font-archivo text-xs uppercase tracking-[0.16em] mb-1.5 text-[#6b1d2f]">Your Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Aarav Mehta"
                    className="w-full bg-white text-[#6b1d2f] placeholder:text-[#6b1d2f]/45 border border-[#c59436]/55 rounded-xl px-4 py-3 font-playfair text-xl focus:outline-none focus:border-[#b84a27]" 
                  />
                </div>

                <div>
                  <label className="block font-archivo text-xs uppercase tracking-[0.16em] mb-1.5 text-[#6b1d2f]">Will you attend?</label>
                  <select className="w-full bg-white text-[#6b1d2f] border border-[#c59436]/55 rounded-xl px-4 py-3 font-playfair text-xl focus:outline-none focus:border-[#b84a27]">
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>

                <div>
                  <label className="block font-archivo text-xs uppercase tracking-[0.16em] mb-1.5 text-[#6b1d2f]">Number of Guests</label>
                  <select className="w-full bg-white text-[#6b1d2f] border border-[#c59436]/55 rounded-xl px-4 py-3 font-playfair text-xl focus:outline-none focus:border-[#b84a27]">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#6b1d2f] text-[#faf3e4] rounded-full font-archivo text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] hover:bg-[#b84a27] transition-colors shadow-lg cursor-pointer"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
