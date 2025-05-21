import { CanvasHTMLAttributes, DetailedHTMLProps } from "react";

export type TDraw = (
  _context: CanvasRenderingContext2D,
  _frameCount: number
) => void;

export type TCanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;
export interface IUseCanvasOptions {
  fps?: number;
  preventScroll?: boolean;
}

export type TProps = TCanvasProps & {
  draw: TDraw;
  options?: IUseCanvasOptions;
  width?: number;
  height?: number;
  onTouchStartFn?: (_event: TouchEvent) => void;
  onTouchEndFn?: (_event: TouchEvent) => void;
};
