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

gsap.registerPlugin(ScrollTrigger);

export const KolibrieWeddingApp: React.FC = () => {
  const [showIntroWipe, setShowIntroWipe] = useState<boolean>(() => !hasSeenIntroBefore());
  const [pageReady, setPageReady] = useState<boolean>(() => hasSeenIntroBefore());
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicBtnRef = useRef<HTMLButtonElement | null>(null);
  const userMutedRef = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  const WEDDING_SONG_SRC = '/assets/aistudio/Rathinamo-Female-Version_f1b1fb37.mp3';
  const WEDDING_SONG_START_SEC = 67; // 1m 07s

  useEffect(() => {
    const audio = new Audio(WEDDING_SONG_SRC);
    audio.preload = 'auto';
    audio.loop = false;
    audio.volume = 0.55;
    audioRef.current = audio;

    const ensureStartOffset = () => {
      if (audio.currentTime < WEDDING_SONG_START_SEC - 0.5) {
        try {
          audio.currentTime = WEDDING_SONG_START_SEC;
        } catch {
          // Will seek once metadata is ready
        }
      }
    };

    const handleEnded = () => {
      if (userMutedRef.current) return;
      audio.currentTime = WEDDING_SONG_START_SEC;
      audio.play().catch(() => {
        setIsPlayingMusic(false);
      });
    };

    const handlePlay = () => {
      ensureStartOffset();
      setIsPlayingMusic(true);
      removeUnlockListeners();
    };

    const handlePause = () => {
      setIsPlayingMusic(false);
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction, true);
      window.removeEventListener('touchstart', handleFirstInteraction, true);
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
    };

    const tryAutoPlay = () => {
      if (userMutedRef.current) return;
      ensureStartOffset();
      audio
        .play()
        .then(() => {
          ensureStartOffset();
          setIsPlayingMusic(true);
          removeUnlockListeners();
        })
        .catch(() => {
          // Browser blocked unmuted autoplay until first user gesture
          setIsPlayingMusic(false);
        });
    };

    const handleFirstInteraction = (e: Event) => {
      if (userMutedRef.current) {
        removeUnlockListeners();
        return;
      }
      // Let the music button's own onClick handle taps on the toggle button
      if (musicBtnRef.current && e.target instanceof Node && musicBtnRef.current.contains(e.target)) {
        return;
      }
      tryAutoPlay();
    };

    audio.addEventListener('loadedmetadata', ensureStartOffset);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Register first-gesture unlock listeners first, then attempt immediate autoplay
    window.addEventListener('pointerdown', handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { capture: true, passive: true });

    tryAutoPlay();

    return () => {
      removeUnlockListeners();
      audio.removeEventListener('loadedmetadata', ensureStartOffset);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (pageReady) {
      document.documentElement.setAttribute('data-page-ready', 'true');
    }
  }, [pageReady]);

  // Keep all GSAP pinned sections perfectly synchronized after fonts, images, and layout settle in production
  useEffect(() => {
    let timerId: number | null = null;
    const scheduleRefresh = () => {
      if (timerId !== null) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
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
  }, [pageReady, showIntroWipe]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userMutedRef.current = true;
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      userMutedRef.current = false;
      const seekIfNeeded = () => {
        if (audio.currentTime < WEDDING_SONG_START_SEC - 0.5) {
          try {
            audio.currentTime = WEDDING_SONG_START_SEC;
          } catch {
            // Seek will retry on loadedmetadata / playing
          }
        }
      };

      seekIfNeeded();
      audio
        .play()
        .then(() => {
          seekIfNeeded();
          setIsPlayingMusic(true);
        })
        .catch(() => {
          setIsPlayingMusic(false);
        });
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-[#ef4a23] selection:text-[#faf3e4]">
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
        className="fixed bottom-6 right-6 z-40 bg-[#faf3e4] text-[#5c1a1b] border-2 border-[#5c1a1b] p-3 rounded-full shadow-lg hover:bg-[#ef4a23] hover:border-[#ef4a23] hover:text-white transition-all flex items-center gap-2 font-archivo text-xs uppercase tracking-wider cursor-pointer"
      >
        {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        <span className="hidden sm:inline">{isPlayingMusic ? "Mute" : "Play Music"}</span>
      </button>

      <main ref={mainRef} className={`transition-opacity duration-700 ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* 5.4 Hero */}
        <section 
          className="relative z-10 isolate bg-[#faf3e4] h-screen w-full overflow-hidden flex items-center justify-center cursor-default select-none"
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
            poster="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224241_f6feccd5-1c45-4d22-b369-f927916f9973.png&w=2048&q=85"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_231342_88260d66-aa30-4612-9157-d7f1b5a66d8c.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#faf3e4]/30 backdrop-blur-[1px]" />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center text-center mt-[-3rem] px-4 max-w-5xl">
            <h1 className="font-archivo text-[6rem] sm:text-[8rem] md:text-[9rem] font-bold tracking-tighter uppercase leading-[0.8] mb-6 text-[#5c1a1b]">
              Ram & Sita <br />
              <span className="font-playfair font-light italic lowercase text-[5rem] sm:text-[7rem] md:text-[8rem] tracking-normal text-[#ef4a23]">
                forever <strong className="font-archivo font-bold uppercase not-italic">United</strong>
              </span>
            </h1>

            <a
              href="#celebrations"
              className="group inline-flex items-center gap-3 font-playfair text-[2.15rem] font-medium tracking-tight text-[#5c1a1b] hover:text-[#ef4a23] transition-colors mt-4"
            >
              <span className="relative">
                See the itinerary
                <span className="absolute left-0 top-[118%] w-full h-[0.6em] bg-[#ef4a23] rounded-full" />
              </span>
              <div className="w-[1em] h-[1em] bg-[#ef4a23] text-white rounded-full flex items-center justify-center group-hover:translate-y-1 transition-transform">
                ↓
              </div>
            </a>
          </div>

          {/* Client Marquee / Blessings Marquee */}
          <div className="absolute bottom-6 left-0 right-0 z-20 overflow-hidden pointer-events-none py-3 border-y border-[#5c1a1b]/15 bg-[#faf3e4]/80 backdrop-blur-sm">
            <div className="animate-marquee flex gap-12 items-center font-archivo text-xl font-bold uppercase tracking-widest text-[#5c1a1b]/80">
              <span>★ UDAIPUR PALACE 2026</span>
              <span>•</span>
              <span>ROYAL BLESSINGS</span>
              <span>•</span>
              <span>RAM & SITA</span>
              <span>•</span>
              <span>SEVEN PHERAS</span>
              <span>•</span>
              <span>UDAIPUR PALACE 2026</span>
              <span>•</span>
              <span>ROYAL BLESSINGS</span>
              <span>•</span>
              <span>RAM & SITA</span>
              <span>•</span>
              <span>SEVEN PHERAS</span>
            </div>
          </div>
        </section>

        {/* Interactive Gold-Leaf Scratch Medallion with Rose Petals Burst */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf3e4]/45 via-[#faf3e4]/25 to-[#faf3e4]/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <p className="font-playfair text-[1.6rem] sm:text-[1.95rem] font-medium leading-[1.15] tracking-tight text-[#5c1a1b] max-w-md mx-auto lg:mx-0">
                Two hearts, one royal promise. Join us in Udaipur as we celebrate the sacred union of
              </p>
              <h2 className="font-archivo text-[4.4rem] sm:text-[6.2rem] lg:text-[7rem] font-bold uppercase tracking-tighter leading-[0.85] text-[#5c1a1b]">
                Bride &amp; <br />
                <span className="font-playfair font-light italic lowercase text-[4rem] sm:text-[5.2rem] text-[#ef4a23]">
                  groom
                </span>
              </h2>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf3e4]/90 border border-[#5c1a1b]/20 font-archivo text-xs sm:text-sm uppercase tracking-wider text-[#5c1a1b] shadow-sm backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-[#ef4a23]" />
                  December 15, 2026
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf3e4]/90 border border-[#5c1a1b]/20 font-archivo text-xs sm:text-sm uppercase tracking-wider text-[#5c1a1b] shadow-sm backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-[#ef4a23]" />
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
                  className="hidden sm:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#faf3e4] border-2 border-[#ef4a23] shadow-xl"
                >
                  <span className="font-yellowtail text-4xl text-[#ef4a23] leading-none pr-1">&amp;</span>
                </div>

                {/* Groom Portrait Card */}
                <article className="group bg-[#faf3e4]/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-[2rem] shadow-2xl border-2 border-[#ef4a23]/25 transition-transform duration-500 sm:-rotate-2 hover:rotate-0">
                  <div className="relative aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden bg-[#e9dcc6]">
                    <img
                      src="/src/assets/images/indian_groom_royal_1795778663105.jpg"
                      alt="Ram Raghavan, the Groom in royal ivory and gold sherwani"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#471418]/70 via-[#471418]/20 to-transparent" />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#faf3e4]/95 text-[#ef4a23] font-archivo text-[0.7rem] font-bold uppercase tracking-widest shadow">
                      The Groom
                    </span>
                  </div>
                  <div className="pt-4 pb-2 px-2 text-center">
                    <h3 className="font-archivo text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#5c1a1b]">
                      Ram Raghavan
                    </h3>
                    <p className="font-playfair italic text-base sm:text-lg text-[#5c1a1b]/80 mt-1">
                      Son of Smt. Kamala &amp; Shri Ranganathan
                    </p>
                  </div>
                </article>

                {/* Bride Portrait Card */}
                <article className="group bg-[#faf3e4]/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-[2rem] shadow-2xl border-2 border-[#ef4a23]/25 transition-transform duration-500 sm:mt-10 sm:rotate-2 hover:rotate-0">
                  <div className="relative aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden bg-[#e9dcc6]">
                    <img
                      src="/src/assets/images/indian_bride_portrait_1795778629288.jpg"
                      alt="Sita Sharma, the Bride in regal vermilion and gold bridal lehenga"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#471418]/70 via-[#471418]/20 to-transparent" />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#ef4a23] text-[#faf3e4] font-archivo text-[0.7rem] font-bold uppercase tracking-widest shadow">
                      The Bride
                    </span>
                  </div>
                  <div className="pt-4 pb-2 px-2 text-center">
                    <h3 className="font-archivo text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#5c1a1b]">
                      Sita Sharma
                    </h3>
                    <p className="font-playfair italic text-base sm:text-lg text-[#5c1a1b]/80 mt-1">
                      Daughter of Smt. Ananya &amp; Shri Rajesh
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
        <footer className="relative z-20 isolate py-24 px-6 bg-[#471418] text-[#faf3e4] text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="font-yellowtail text-5xl text-[#ffd46e]">Ram & Sita</span>
            <h2 className="font-archivo text-4xl sm:text-6xl font-bold uppercase tracking-tight">
              Forever United in Udaipur
            </h2>
            <p className="font-playfair text-xl text-[#faf3e4]/85">
              “With joyful hearts, we invite you to celebrate the beginning of our forever.”
            </p>
            <div className="pt-6 flex justify-center gap-4">
              <button
                onClick={() => setRsvpOpen(true)}
                className="px-8 py-4 bg-[#ef4a23] text-white rounded-full font-archivo font-bold uppercase tracking-widest hover:bg-[#faf3e4] hover:text-[#5c1a1b] transition-colors"
              >
                RSVP Now
              </button>
            </div>
          </div>
        </footer>

      </main>

      {/* RSVP Modal */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 bg-[#3a1013]/88 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#faf3e4] text-[#5c1a1b] rounded-3xl p-8 shadow-2xl border-4 border-[#ef4a23]">
            <button
              onClick={() => setRsvpOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#471418] text-[#faf3e4] rounded-full hover:bg-[#ef4a23] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#ef4a23] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-archivo text-3xl font-bold uppercase text-[#5c1a1b]">You're Confirmed!</h3>
                <p className="font-playfair text-lg text-[#5c1a1b]/85">We are thrilled to celebrate with you in Udaipur.</p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="px-6 py-2 bg-[#471418] text-[#faf3e4] rounded-full font-archivo text-xs uppercase font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                }}
                className="space-y-4"
              >
                <h3 className="font-archivo text-3xl font-bold uppercase text-center mb-6 text-[#5c1a1b]">
                  Wedding RSVP
                </h3>

                <div>
                  <label className="block font-archivo text-xs uppercase font-bold tracking-wider mb-1 text-[#5c1a1b]">Your Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-white text-[#5c1a1b] placeholder:text-[#5c1a1b]/45 border-2 border-[#5c1a1b]/20 rounded-xl px-4 py-3 font-playfair text-lg focus:outline-none focus:border-[#ef4a23]" 
                  />
                </div>

                <div>
                  <label className="block font-archivo text-xs uppercase font-bold tracking-wider mb-1 text-[#5c1a1b]">Will you attend?</label>
                  <select className="w-full bg-white text-[#5c1a1b] border-2 border-[#5c1a1b]/20 rounded-xl px-4 py-3 font-playfair text-lg focus:outline-none focus:border-[#ef4a23]">
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>

                <div>
                  <label className="block font-archivo text-xs uppercase font-bold tracking-wider mb-1 text-[#5c1a1b]">Number of Guests</label>
                  <select className="w-full bg-white text-[#5c1a1b] border-2 border-[#5c1a1b]/20 rounded-xl px-4 py-3 font-playfair text-lg focus:outline-none focus:border-[#ef4a23]">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#ef4a23] text-white rounded-full font-archivo font-bold uppercase tracking-widest hover:bg-[#471418] transition-colors shadow-lg"
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
