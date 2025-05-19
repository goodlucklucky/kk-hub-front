"use client";

import { useState, useEffect } from "react";

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateTimeLeft = (targetTime?: Date): TimeLeft | null => {
  const now = new Date();
  const nextTarget = targetTime ? new Date(targetTime) : new Date();

  if (!targetTime) {
    nextTarget.setUTCDate(now.getUTCDate() + 1);
    nextTarget.setUTCHours(0, 0, 0, 0);
  }

  const difference = nextTarget.getTime() - now.getTime();

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return null;
};

export default function useTimeLeft(targetTime?: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return timeLeft;
}
