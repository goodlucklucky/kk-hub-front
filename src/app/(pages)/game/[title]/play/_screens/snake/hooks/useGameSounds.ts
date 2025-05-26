import { useEffect, useRef } from "react";
// import endAudio0 from "@/_assets/audio/wrong-answer.mp3";
// import endAudio2 from "@/_assets/audio/vine-boom.mp3";
import endAudio1 from "../assets/audio/slap-oh.mp3";
import eatAudio from "../assets/audio/munch-sound-effect.mp3";
import backgroundMusic from "../assets/audio/back-game-v2.mp3";

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

    gameOverSoundsRef.current = [
      // new Audio(endAudio0),
      new Audio(endAudio1),
      // new Audio(endAudio2),
    ];

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
