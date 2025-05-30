import { useEffect, useRef } from "react";

const endAudio1 = "/audio/slap-oh.mp3";
const eatAudio = "/audio/munch-sound-effect.mp3";
const backgroundMusic = "/audio/back-game-v2.mp3";

interface GameSoundProps {
  isMuted: boolean;
  isPlaying?: boolean;
}

export const useGameSound = ({ isMuted, isPlaying }: GameSoundProps) => {
  const eatSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const gameOverSoundsRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    eatSoundRef.current = new Audio(eatAudio);
    bgMusicRef.current = new Audio(backgroundMusic);

    gameOverSoundsRef.current = [new Audio(endAudio1)];

    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.3;
    }

    return () => {
      bgMusicRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (isMuted || !isPlaying) {
      bgMusicRef.current?.pause();
    } else {
      bgMusicRef.current?.play().catch(() => {
        // console.log("Autoplay prevented");
      });
    }
  }, [isMuted, isPlaying]);

  const playEatSound = () => {
    if (!isMuted && eatSoundRef.current) {
      eatSoundRef.current.currentTime = 0;
      eatSoundRef.current.play().catch(() => {
        // console.log("Sound play prevented");
      });
    }
  };

  const playGameOverSound = () => {
    if (!isMuted && gameOverSoundsRef.current.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * gameOverSoundsRef.current.length
      );
      const sound = gameOverSoundsRef.current[randomIndex];
      sound.currentTime = 0;
      sound.play().catch(() => {
        // console.log("Game over sound play prevented");
      });
    }
  };

  const startBackgroundMusic = () => {
    if (!isMuted && bgMusicRef.current?.paused) {
      bgMusicRef.current?.play().catch(() => {
        // console.log("Autoplay prevented");
      });
    }
  };

  const stopBackgroundMusic = () => {
    bgMusicRef.current?.pause();
  };

  return {
    playEatSound,
    playGameOverSound,
    startBackgroundMusic,
    stopBackgroundMusic,
  };
};
