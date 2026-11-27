import { useEffect, useState } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function computeRemaining(targetMs: number): CountdownTime {
  const diff = Math.max(0, targetMs - Date.now());

  if (diff === 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: false,
  };
}

/**
 * Calculates live time remaining until a target wedding date.
 * Defaults to December 15, 2026 at 10:00 AM IST (Udaipur Muhurat).
 */
export function useWeddingCountdown(
  targetIsoDate: string = '2026-12-15T10:00:00+05:30'
): CountdownTime {
  const targetMs = new Date(targetIsoDate).getTime();

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    computeRemaining(targetMs)
  );

  useEffect(() => {
    setTimeLeft(computeRemaining(targetMs));

    const timerId = window.setInterval(() => {
      setTimeLeft(computeRemaining(targetMs));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [targetMs]);

  return timeLeft;
}
