"use client";

import {
  useEffect,
  useCallback,
  useMemo,
  // useContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useGameStore } from "../store/game-store";
import GameBoardImage from "../assets/board_background.png";
import GameControlButton from "../assets/control_button.png";
import Canvas from "./canvas";
import { TDraw } from "./canvas/types";
import useSwipe from "../hooks/useSwipe";
import { useGameSound } from "../hooks/useGameSounds";
import { SnakeContext } from "../contexts/snake-context";
import Food from "../constants/Food";
import Snake from "../constants/Snake";
import { trackEvent } from "@/app/_lib/mixpanel";
import { GAME } from "../constants";
import { calculateSpeedData } from "../utils";

export const GameBoardV2 = ({
  setHasMoved,
  isMuted,
  setIsMoved,
  retention = 0,
}: {
  retention?: number;
  hasMoved: boolean;
  isMuted: boolean;
  setHasMoved: Dispatch<SetStateAction<boolean>>;
  setIsMoved: Dispatch<SetStateAction<boolean>>;
}) => {
  const { activeSkin } = useContext(SnakeContext);
  const food = useMemo(() => new Food(), []);
  const snake = useMemo(
    () =>
      new Snake({
        skin: activeSkin,
        speedData: calculateSpeedData(retention),
      }),
    [activeSkin, retention]
  );

  const { setScore, setGameState, gameState, setStartTime } = useGameStore();
  const {
    playEatSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    playGameOverSound,
  } = useGameSound({
    isMuted,
    isPlaying: gameState == "playing",
  });

  useEffect(() => {
    if (gameState === "playing") {
      setStartTime(Date.now());
      trackEvent("Game Started", {
        retention_level: retention,
        active_skin: activeSkin,
        initial_speed: snake.speed,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, retention, activeSkin, snake.speed]);

  // Track direction changes
  const trackDirectionChange = useCallback(
    (direction: string) => {
      trackEvent("Direction Changed", {
        direction,
        game_state: gameState,
        current_score: snake.score,
      });
    },
    [gameState, snake.score]
  );

  // Keyboard movement
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState != "gameOver")
        switch (event.key) {
          case "ArrowUp":
            snake.setDirection(0, -1);
            break;
          case "ArrowDown":
            snake.setDirection(0, 1);
            break;
          case "ArrowLeft":
            snake.setDirection(-1, 0);
            break;
          case "ArrowRight":
            snake.setDirection(1, 0);
            break;
        }
      trackDirectionChange(event.key.replace("Arrow", ""));
    },
    [gameState, snake, trackDirectionChange]
  );

  // Touch movement
  const { onTouchStart, onTouchEnd } = useSwipe((eventData) => {
    if (gameState != "gameOver")
      switch (eventData.direction) {
        case "Up":
          snake.setDirection(0, -1);
          break;
        case "Down":
          snake.setDirection(0, 1);
          break;
        case "Left":
          snake.setDirection(-1, 0);
          break;
        case "Right":
          snake.setDirection(1, 0);
          break;
      }
    trackDirectionChange(eventData.direction);
  });

  // Keyboard and touch event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    const preventTouchBehavior = (e: TouchEvent) => e.preventDefault();

    document.addEventListener("touchmove", preventTouchBehavior, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventTouchBehavior);
    };
  }, []);

  // useEffect(() => {
  //   // Ensure Telegram WebApp is ready
  //   WebApp.ready();

  //   // Disable closing or minimizing
  //   WebApp.disableClosingConfirmation();

  //   return () => {
  //     WebApp.enableClosingConfirmation(); // Cleanup
  //   };
  // }, []);

  // Track game start
  useEffect(() => {
    if (gameState === "playing") trackEvent("Game Started");
  }, [gameState]);

  // draw function
  const draw = useCallback<TDraw>(
    (ctx, frameCount) => {
      if (snake.state == "gameOver") {
        setGameState("gameOver");
        ctx.font = "24px Arial";
        ctx.fillText("Game Over", GAME.width / 2 - 60, GAME.height / 2);
        return;
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const state = snake.update(frameCount, GAME?.fps);

      // check if snake has moved
      if (state == "playing") {
        startBackgroundMusic();
        setHasMoved(true);

        if (snake.hasMoved) {
          setIsMoved(true);
        }
      } else setHasMoved(false);

      if (state == "gameOver") {
        stopBackgroundMusic();
        playGameOverSound();
        return setGameState("gameOver");
      }

      // draw
      snake.draw(ctx);

      // check eat
      const { eat, score } = snake.eatCheck(food);
      if (eat && score) {
        setScore(score);
        playEatSound();
        trackEvent("Food Eaten", { score });
      }

      food.draw(ctx);
    },
    [
      food,
      playEatSound,
      playGameOverSound,
      setGameState,
      setHasMoved,
      setIsMoved,
      setScore,
      snake,
      startBackgroundMusic,
      stopBackgroundMusic,
    ]
  );

  // set initial state
  useEffect(() => {
    if (snake?.state) snake?.setState(gameState);
  }, [gameState, snake]);

  useEffect(() => {
    console.log(snake);
    console.log(food);
  }, [food, snake]);

  return (
    <div className="relative size-full flex flex-col justify-center items-center">
      <Canvas
        draw={draw}
        options={{ fps: GAME?.fps }}
        width={GAME.width}
        height={GAME.height}
        style={{
          backgroundImage: `url(${GameBoardImage.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "7.5% 4.7% 12.5% 5%",
        }}
        onTouchEndFn={onTouchEnd}
        onTouchStartFn={onTouchStart}
      />
      <div className="z-30 -mt-[55px] flex justify-center">
        {/* Directional Buttons */}
        <div
          className="flex flex-col text-center bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url(${GameControlButton.src})`,
          }}
        >
          <div>
            <button
              className="bg-gray-700 text-white rounded px-14 py-4 mx-1 my-1 opacity-0"
              onClickCapture={() => snake.setDirection(0, -1)}
            >
              ↑
            </button>
          </div>
          <div className="flex flex-around -mt-[20px]">
            <button
              className="py-6 px-8 bg-gray-700 text-white rounded mr-[65px] opacity-0"
              onClickCapture={() => snake.setDirection(-1, 0)}
            >
              ←
            </button>
            <button
              className="py-6 px-8 bg-gray-700 text-white rounded ml-[65px] opacity-0"
              onClickCapture={() => snake.setDirection(1, 0)}
            >
              →
            </button>
          </div>
          <div className="-mt-[20px]">
            <button
              className="bg-gray-700 text-white rounded px-14 py-4 mx-1 my-1 opacity-0"
              onClickCapture={() => snake.setDirection(0, 1)}
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoardV2;
