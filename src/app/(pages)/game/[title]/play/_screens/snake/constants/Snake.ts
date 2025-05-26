import {
  CELL_SIZE,
  COLS,
  DEFAULT_HAED_SKIN,
  DEFAULT_SKIN,
  HEAD_FRAMES,
  INITIAL_LENGTH,
  INITIAL_SNAKE,
  ROWS,
  SNAKES,
  SPRITE_HEAD_SIZE,
  SPRITE_SIZE,
  VELOCITY_MULTIPLIER,
} from ".";
import Food from "./Food";

import { drawRotatedImage, getSpeed } from "./utils";

export type TGameState = "playing" | "gameOver" | "onboarding" | "cosmetics";
export type TBodyParts =
  | "head"
  | "animated_head"
  | "body"
  | "curve"
  | "curve_right"
  | "tail";
export type TSprite = {
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
  expandX?: number;
  expandY?: number;
};
export type TProps = {
  skin?: string;
  isSkinsActive?: boolean;
  speedData?: { min: number; max: number; maxLevel: number };
};

class Snake {
  public position: { x: number; y: number };
  public velocity: { x: number; y: number };
  public nextVelocity: { x: number; y: number };
  public length: number;
  public speed: number;
  public score: number;
  public segments: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    dx?: number;
    dy?: number;
  }[];
  public moveTimer: number;
  public moveInterval: number;
  public state: TGameState;
  public hasMoved: boolean;
  // private snakeImage: HTMLImageElement;
  private image: {
    head: HTMLImageElement;
    body: HTMLImageElement;
    bodyCurved: HTMLImageElement;
    bodyCurvedR: HTMLImageElement;
    tail: HTMLImageElement;
  };
  private snakeUrl: string;
  private snakeHeadUrl: string;
  private snakeImage: HTMLImageElement;
  private snakeHeadImage: HTMLImageElement;
  private snakeSpriteSize: number;
  private snakeHeadSpriteSize: number;
  private activeHeadSprite: number;
  private snakeSprite: { [_key in TBodyParts]: TSprite };
  private isSkinsActive: boolean;
  private speedData?: { min: number; max: number; maxLevel: number };

  constructor({ skin, isSkinsActive = false, speedData }: TProps = {}) {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 1, y: 0 };
    this.nextVelocity = { x: 0, y: 0 };
    this.length = INITIAL_LENGTH;
    this.speed = getSpeed(
      0,
      speedData?.maxLevel || 24,
      speedData?.min || VELOCITY_MULTIPLIER,
      speedData?.max || 2.75
    );
    this.score = 0;
    this.segments = [
      { x: INITIAL_SNAKE.x - 0, y: INITIAL_SNAKE.y, vx: 1, vy: 0 },
      { x: INITIAL_SNAKE.x - 1, y: INITIAL_SNAKE.y, vx: 1, vy: 0 },
      { x: INITIAL_SNAKE.x - 2, y: INITIAL_SNAKE.y, vx: 1, vy: 0 },
    ];
    this.moveTimer = 0;
    this.moveInterval = 150;
    this.state = "onboarding";
    this.hasMoved = false;

    const skinType = skin as keyof typeof SNAKES;
    // image
    this.snakeUrl = skin || DEFAULT_SKIN;
    this.snakeHeadUrl = SNAKES[skinType]["head-frame"];
    this.snakeImage = new Image();
    this.snakeHeadImage = new Image();
    this.snakeImage.onerror = () => {
      this.snakeImage.src = DEFAULT_SKIN;
    };
    this.snakeHeadImage.onerror = () => {
      // this.snakeImage.src = "";
      this.snakeImage.src = DEFAULT_HAED_SKIN;
    };
    this.snakeImage.src = this.snakeUrl;
    this.snakeHeadImage.src = this.snakeHeadUrl;
    this.snakeSpriteSize = SPRITE_SIZE;
    this.snakeHeadSpriteSize = SPRITE_HEAD_SIZE;
    this.activeHeadSprite = 0;
    this.snakeSprite = {
      body: { x: 1, y: 0 },
      curve_right: { x: 0, y: 0 },
      curve: { x: 1, y: 2 },
      tail: {
        x: 3,
        y: 3,
        offsetX: this.snakeSpriteSize / 20,
        expandY: this.snakeSpriteSize,
      },
      head: {
        x: 1,
        y: 3,
        offsetX: this.snakeSpriteSize / 2,
        offsetY: -this.snakeSpriteSize / 18,
        expandX: this.snakeSpriteSize,
        expandY: this.snakeSpriteSize,
      },
      animated_head: {
        x: 0,
        y: 0,
        expandY: this.snakeHeadSpriteSize / 7,
      },
    };
    this.speedData = speedData;
    this.image = {
      head: new Image(),
      body: new Image(),
      bodyCurved: new Image(),
      bodyCurvedR: new Image(),
      tail: new Image(),
    };

    this.image.head.src = SNAKES[skinType]?.head;
    this.image.body.src = SNAKES[skinType]?.body;
    this.image.bodyCurved.src = SNAKES[skinType]?.curve;
    this.image.bodyCurvedR.src = SNAKES[skinType]?.curveR;
    this.image.tail.src = SNAKES[skinType]?.tail;
    this.isSkinsActive = isSkinsActive;

    // set animation frame
    setInterval(() => {
      this.changeAnimationFrame();
    }, 1000 / 3);
  }

  public setState(state: TGameState) {
    this.state = state;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#4CAF50";
    [...this.segments].reverse().forEach((segment, index) => {
      if (index === 0)
        ctx.fillStyle = "gold"; // Darker green for head, Head of the snake
      else ctx.fillStyle = "#3ff"; // Regular green for body

      if (index == this.segments?.length - 1) {
        // Draw head
        const angle = Math.atan2(this.velocity.x, -this.velocity.y) + Math.PI;

        if (this.isSkinsActive)
          drawRotatedImage(
            ctx,
            this.snakeImage,
            segment.x,
            segment.y,
            CELL_SIZE,
            angle,
            1 / 3,
            1 / 6,
            this.snakeSprite.head
          );
        else {
          drawRotatedImage(
            ctx,
            this.snakeHeadImage,
            segment.x,
            segment.y,
            CELL_SIZE,
            angle,
            1 / 6,
            1 / 6,
            this.snakeSprite.animated_head,
            this.snakeHeadSpriteSize
          );
        }
      } else if (index == 0) {
        // Draw tail
        let x = 0,
          y = 0;
        if (segment.dx || segment.dy) {
          x = segment.dx || 0;
          y = segment.dy || 0;
        } else {
          x = segment.vx;
          y = segment.vy;
        }

        const angle = Math.atan2(x, -y);

        if (this.isSkinsActive)
          drawRotatedImage(
            ctx,
            this.snakeImage,
            segment.x,
            segment.y,
            CELL_SIZE,
            angle,
            0,
            1 / 6,
            this.snakeSprite.tail
          );
        else
          drawRotatedImage(
            ctx,
            this.image.tail,
            segment.x,
            segment.y,
            CELL_SIZE,
            Math.atan2(-y, -x),
            0,
            -1 / 10
          );
      } else if (segment?.dx || segment?.dy) {
        // Draw segment with a small gap
        let angle = Math.PI;
        let split = this.snakeSprite.curve;
        let image = this.image.bodyCurvedR;
        let extra_angle = 0;

        if (segment.dx == 0 && segment.dy == segment.vx) {
          angle = Math.atan2(segment.dx || 0, segment.dy || 0);
          extra_angle = this.isSkinsActive ? 0 : -Math.PI / 2;
        } else if (segment.dx == segment.vy) {
          split = this.snakeSprite.curve_right;
          image = this.image.bodyCurved;
          angle = Math.atan2(segment.dx || 0, -(segment.dy || 0));
          extra_angle = this.isSkinsActive ? -Math.PI : 0;
        } else if (segment.dy == -segment.vx) {
          angle = Math.atan2(segment.dx || 0, segment.dy || 0);
          extra_angle = this.isSkinsActive ? Math.PI : Math.PI / 2;
        }

        if (this.isSkinsActive)
          drawRotatedImage(
            ctx,
            this.snakeImage,
            segment.x,
            segment.y,
            CELL_SIZE,
            angle + extra_angle,
            -1 / 80,
            -1 / 80,
            split
          );
        else
          drawRotatedImage(
            ctx,
            image,
            segment.x,
            segment.y,
            CELL_SIZE,
            angle + extra_angle,
            0,
            0
          );
      } else {
        // Draw segment with a small gap
        if (this.isSkinsActive)
          drawRotatedImage(
            ctx,
            this.snakeImage,
            segment.x,
            segment.y,
            CELL_SIZE,
            Math.atan2(-segment.vy, -segment.vx),
            1 / 80,
            -1 / 80,
            this.snakeSprite.body
          );
        else
          drawRotatedImage(
            ctx,
            this.image.body,
            segment.x,
            segment.y,
            CELL_SIZE,
            Math.atan2(-segment.vy, -segment.vx),
            0,
            -1 / 10
          );
      }
    });
  }

  public changeAnimationFrame() {
    if (this.state != "playing" || !this.hasMoved) return this.state;

    this.activeHeadSprite = (this.activeHeadSprite + 1) % HEAD_FRAMES;
    this.snakeSprite.animated_head.x = this.activeHeadSprite;
  }

  public update(_: number, fps: number = 24) {
    // Initialize segments if empty
    if (this.segments.length === 0)
      this.segments.push({
        x: this.position.x,
        y: this.position.y,
        vx: this.velocity.x,
        vy: this.velocity.y,
      });

    // Check for wall collision
    const { x, y } = this.segments[0];
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return this.endGame();

    // Move snake at fixed intervals
    this.moveTimer += (this.speed * 1000) / fps;

    if (this.moveTimer < this.moveInterval) return this.state;
    this.move();

    return this.state;
  }

  public move() {
    if (this.state != "playing" || !this.hasMoved) return this.state;

    this.moveTimer = 0;

    if (this.nextVelocity.x !== 0 || this.nextVelocity.y !== 0) {
      this.velocity.x = this.nextVelocity.x;
      this.velocity.y = this.nextVelocity.y;
    }

    // Reset nextVelocity
    this.nextVelocity.x = 0;
    this.nextVelocity.y = 0;

    // Update position in grid coordinates
    const newHead = {
      x: this.segments[0].x + this.velocity.x,
      y: this.segments[0].y + this.velocity.y,
      vx: this.velocity.x,
      vy: this.velocity.y,
    };

    // update previous segment
    const prev = this.segments[0];
    const dx = prev?.vx != this.velocity.x ? this.velocity.x : 0;
    const dy = prev?.vy != this.velocity.y ? this.velocity.y : 0;
    prev.dx = dx;
    prev.dy = dy;

    // Check for wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= COLS ||
      newHead.y < 0 ||
      newHead.y >= ROWS
    )
      return this.endGame();

    // Check for body collision
    if (this.checkEatBody()) return this.endGame();

    // Add new head
    this.segments.unshift(newHead);

    // Remove tail if snake is longer than desired length
    if (this.segments.length > this.length) this.segments.pop();
  }

  private checkEatBody(): boolean {
    const head = this.segments[0];
    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y)
        return true;
    }
    return false;
  }

  public setDirection(dx: number, dy: number): void {
    if (!this.hasMoved) this.hasMoved = true;

    if (this.segments.length <= 1) {
      this.velocity.x = dx;
      this.velocity.y = dy;
      return;
    }

    if (
      (dx === 1 && this.velocity.x !== -1) ||
      (dx === -1 && this.velocity.x !== 1)
    ) {
      this.nextVelocity.x = dx;
      this.nextVelocity.y = 0;
      return;
    }

    if (
      (dy === 1 && this.velocity.y !== -1) ||
      (dy === -1 && this.velocity.y !== 1)
    ) {
      this.nextVelocity.x = 0;
      this.nextVelocity.y = dy;
      return;
    }
  }

  public endGame(): TGameState {
    this.state = "gameOver";
    return "gameOver";
  }

  public eatCheck(food: Food) {
    const snakeHead = this.segments[0];
    const foodRect = {
      x: food.x * CELL_SIZE,
      y: food.y * CELL_SIZE,
      width: CELL_SIZE,
      height: CELL_SIZE,
    };
    const snakeRect = {
      x: snakeHead.x * CELL_SIZE,
      y: snakeHead.y * CELL_SIZE,
      width: CELL_SIZE,
      height: CELL_SIZE,
    };

    if (
      snakeRect.x < foodRect.x + foodRect.width &&
      snakeRect.x + snakeRect.width > foodRect.x &&
      snakeRect.y < foodRect.y + foodRect.height &&
      snakeRect.y + snakeRect.height > foodRect.y
    ) {
      food.reset(this.segments);
      this.length++;

      // this.speed = 2.5;
      this.speed = getSpeed(
        this.score + 1,
        this.speedData?.maxLevel || 24,
        this.speedData?.min || VELOCITY_MULTIPLIER,
        this.speedData?.max || 2.75
      );
      this.score++;

      return { eat: true, score: this.score };
    }

    return { eat: false };
  }

  public reset() {
    this.score = 0;
    this.length = INITIAL_LENGTH;
    this.state = "playing";
    this.hasMoved = false;
    this.position = INITIAL_SNAKE;
    this.velocity = { x: 1, y: 0 };
    this.nextVelocity = { x: 0, y: 0 };
  }
}

export default Snake;
