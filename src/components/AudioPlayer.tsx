import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, togglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const WEDDING_SONG_SRC = '/assets/aistudio/Rathinamo-Female-Version_f1b1fb37.mp3';
  const WEDDING_SONG_START_SEC = 67; // 1m 07s

  useEffect(() => {
    const audio = new Audio(WEDDING_SONG_SRC);
    audio.preload = 'auto';
    audio.loop = false;
    audio.volume = 0.55;

    const ensureStartOffset = () => {
      if (audio.currentTime < WEDDING_SONG_START_SEC - 0.5) {
        try {
          audio.currentTime = WEDDING_SONG_START_SEC;
        } catch {
          // Will retry when metadata is ready
        }
      }
    };

    const handleEnded = () => {
      audio.currentTime = WEDDING_SONG_START_SEC;
      audio.play().catch(() => {});
    };

    audio.addEventListener('loadedmetadata', ensureStartOffset);
    audio.addEventListener('playing', ensureStartOffset);
    audio.addEventListener('ended', handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('loadedmetadata', ensureStartOffset);
      audio.removeEventListener('playing', ensureStartOffset);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      if (audio.currentTime < WEDDING_SONG_START_SEC - 0.5) {
        try {
          audio.currentTime = WEDDING_SONG_START_SEC;
        } catch {
          // Will seek on metadata load
        }
      }
      audio.play().catch(() => {
        // Autoplay policy handling
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-40 bg-[#1A120E] border-2 border-[#D4AF37] text-[#D4AF37] p-3 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:bg-[#D4AF37] hover:text-[#120D0B] transition-all duration-300 flex items-center justify-center group"
      title={isPlaying ? "Mute Music" : "Play Wedding Melodies"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-montserrat font-bold uppercase tracking-wider pl-0 group-hover:pl-2">
        {isPlaying ? "Music On" : "Play Music"}
      </span>
    </button>
  );
};
