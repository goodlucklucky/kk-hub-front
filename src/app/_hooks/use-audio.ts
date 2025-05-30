"use client";
import { useEffect, useRef, useState, RefObject } from "react";

type UseAudioPlayerReturn = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  mute: () => void;
  unmute: () => void;
  isPlaying: boolean;
  isMuted: boolean;
};

export function useAudioPlayer(
  src: string,
  elementRef?: RefObject<HTMLElement | null>
): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const mute = () => {
    audioRef.current.muted = true;
    setIsMuted(true);
  };

  const unmute = () => {
    audioRef.current.muted = false;
    setIsMuted(false);
  };

  // Pause when page/tab becomes hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Pause if the target element is hidden (e.g., scrolled out of view)
  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    play,
    pause,
    stop,
    mute,
    unmute,
    isPlaying,
    isMuted,
  };
}
