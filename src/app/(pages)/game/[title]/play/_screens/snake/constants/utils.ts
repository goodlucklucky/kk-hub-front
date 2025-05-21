import { SPRITE_SIZE } from ".";
import { TSprite } from "./Snake";

export function drawRotatedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  size: number,
  angle: number,
  widthScale: number = 1,
  heightScale: number = 1,
  sprite?: TSprite,
  spriteSize?: number
) {
  const spriteSizeToUse = spriteSize || SPRITE_SIZE;
  const scaledWidth = size * widthScale;
  const scaledHeight = size * heightScale;

  // Calculate center of the cell
  const centerX = x * size + size / 2;
  const centerY = y * size + size / 2;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  if (sprite) {
    const startX = spriteSizeToUse * sprite.x! - (sprite?.offsetX || 0);
    const startY = spriteSizeToUse * sprite.y! - (sprite?.offsetY || 0);
    const sizeX = spriteSizeToUse + (sprite?.expandX || 0);
    const sizeY = spriteSizeToUse + (sprite?.expandY || 0);

    ctx.drawImage(
      img,
      startX,
      startY,
      sizeX,
      sizeY,
      -scaledWidth - size / 2,
      -scaledHeight - size / 2,
      size + scaledWidth * 2,
      size + scaledHeight * 2
    );
  } else
    ctx.drawImage(
      img,
      -scaledWidth - size / 2,
      -scaledHeight - size / 2,
      size + scaledWidth * 2,
      size + scaledHeight * 2
    );
  ctx.restore();
}

export function getSpeed(
  x: number,
  maxX: number,
  minSpeed: number,
  maxSpeed: number
): number {
  if (x <= 0) return minSpeed;
  if (x >= maxX) return maxSpeed; // Ensure ending point

  const t = x / maxX;
  const easeInOut = 3 * t ** 2 - 2 * t ** 3;

  return minSpeed + (maxSpeed - minSpeed) * easeInOut;
}
