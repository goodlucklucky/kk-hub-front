import { CELL_SIZE, COLS, INITIAL_FOOD, ROWS } from ".";
import EggImage from "../assets/egg-food.png";
import { drawRotatedImage } from "./utils";

export default class Food {
  public x: number;
  public y: number;
  private foodImage: HTMLImageElement;

  constructor() {
    // this.x = Math.floor(Math.random() * COLS);
    // this.y = Math.floor(Math.random() * ROWS);
    this.x = INITIAL_FOOD.x;
    this.y = INITIAL_FOOD.x;
    this.foodImage = new Image();
    this.foodImage.src = EggImage.src;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FF0000";

    drawRotatedImage(
      ctx,
      this.foodImage,
      this.x,
      this.y,
      CELL_SIZE,
      0,
      0,
      0,
    );
  }

  public reset(occupiedPositions: { x: number; y: number }[]) {
    let newPos;
    let isColliding;

    do {
      newPos = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };

      const foodRect = {
        x: newPos.x * CELL_SIZE,
        y: newPos.y * CELL_SIZE,
        width: CELL_SIZE,
        height: CELL_SIZE,
      };

      isColliding = occupiedPositions.some((pos) => {
        const posRect = {
          x: pos.x * CELL_SIZE,
          y: pos.y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
        };

        return (
          posRect.x < foodRect.x + foodRect.width &&
          posRect.x + posRect.width > foodRect.x &&
          posRect.y < foodRect.y + foodRect.height &&
          posRect.y + posRect.height > foodRect.y
        );
      });
    } while (isColliding);

    this.x = newPos.x;
    this.y = newPos.y;
  }
}
