import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, togglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/assets/wedding-song-1m07s.mp3');
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
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
