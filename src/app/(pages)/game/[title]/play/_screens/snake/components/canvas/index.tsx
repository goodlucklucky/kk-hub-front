"use client";

import useCanvas from "./useCanvas";
import { TProps } from "./types";
import { useEffect, useMemo } from "react";

export default function Canvas({
  draw,
  width,
  height,
  options = {},
  onTouchStartFn,
  onTouchEndFn,
  ...rest
}: TProps) {
  const canvasRef = useCanvas(draw, { preventScroll: true, ...options });

  const sizes = useMemo(() => {
    const parentWidth = canvasRef.current?.parentElement?.clientWidth || 0;
    const parentHeight = canvasRef.current?.parentElement?.clientHeight || 0;

    const currentWidth = width || parentWidth;
    const currentHeight = height || parentHeight;

    const scaleDown =
      currentWidth > parentWidth || currentHeight > parentHeight;

    const scaledWidth = scaleDown ? parentWidth : currentWidth;
    const scaledHeight = scaleDown ? parentHeight : currentHeight;

    return { width: scaledWidth, height: scaledHeight };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, canvasRef?.current, height, width]);

  useEffect(() => {
    if (!canvasRef?.current) return;

    canvasRef?.current?.addEventListener("touchstart", (e) =>
      onTouchStartFn?.(e)
    );
    canvasRef?.current?.addEventListener("touchend", (e) => onTouchEndFn?.(e));

    return () => {
      canvasRef?.current?.removeEventListener("touchstart", (e) =>
        onTouchStartFn?.(e)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef?.current?.removeEventListener("touchend", (e) =>
        onTouchEndFn?.(e)
      );
    };
  }, [canvasRef, onTouchEndFn, onTouchStartFn]);

  return (
    <canvas
      ref={canvasRef}
      width={sizes?.width}
      height={sizes?.height}
      {...rest}
    />
  );
}
