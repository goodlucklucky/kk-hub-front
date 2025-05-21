import { useRef, useEffect } from "react";
import { IUseCanvasOptions, TDraw } from "./types";

const useCanvas = (draw: TDraw, options: IUseCanvasOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { fps = 60, preventScroll = false } = options;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frameCount = 0;
    let animationFrameId: number;
    let lastDrawTime = 0;
    const frameInterval = 1000 / fps;

    const render = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(render);

      const elapsed = timestamp - lastDrawTime;

      if (elapsed >= frameInterval) {
        frameCount++;
        draw(context, frameCount);
        lastDrawTime = timestamp - (elapsed % frameInterval);
      }
    };

    if (preventScroll) {
      canvas.addEventListener("touchmove", (event) => event.preventDefault(), {
        passive: false,
      });
    }

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      if (preventScroll) {
        canvas.removeEventListener("touchmove", (event) =>
          event.preventDefault()
        );
      }
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, fps, preventScroll]);

  return canvasRef;
};

export default useCanvas;
