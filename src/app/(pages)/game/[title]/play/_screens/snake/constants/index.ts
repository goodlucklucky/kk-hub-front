export const COLS = 10;
export const ROWS = 14;
export const CELL_SIZE = 30;
// export const COLS = 14;
// export const ROWS = 20;
// export const CELL_SIZE = 21;
export const SPEED_INCREMENT = 0.001;
export const INITIAL_SPEED = 0.001;
export const INITIAL_LENGTH = 3;
export const MAX_SPEED = 2;
export const BASE_INTERVAL = 100;
export const INITIAL_SNAKE = { x: 3, y: 6 };
export const INITIAL_FOOD = { x: 6, y: 6 };
export const INITIAL_DIRECTION = { x: 0, y: 0 };
export const SPRITE_SIZE = 290;
export const SPRITE_HEAD_SIZE = 140;
export const HEAD_FRAMES = 9;
export const GAME = {
  width: COLS * CELL_SIZE,
  height: ROWS * CELL_SIZE,
  fps: 12,
};
export const VELOCITY_MULTIPLIER = 0.75;
export const DEFAULT_SKIN = "/images/snakes/Regular/skin.png";
export const DEFAULT_HAED_SKIN = "/images/snakes/Regular/heads.png";

export const SNAKES = {
  "Black Mamba": {
    head: "/images/snakes/BlackMamba/head.png",
    body: "/images/snakes/BlackMamba/body.png",
    curve: "/images/snakes/BlackMamba/curve-1.png",
    curveR: "/images/snakes/BlackMamba/curve-2.png",
    tail: "/images/snakes/BlackMamba/tail.png",
    "head-frame": "/images/snakes/BlackMamba/head-frame.png",
  },
  Catterpillar: {
    head: "/images/snakes/Catterpillar/head.png",
    body: "/images/snakes/Catterpillar/body.png",
    curve: "/images/snakes/Catterpillar/curve-1.png",
    curveR: "/images/snakes/Catterpillar/curve-2.png",
    tail: "/images/snakes/Catterpillar/tail.png",
    "head-frame": "/images/snakes/Catterpillar/head-frame.png",
  },
  Python: {
    head: "/images/snakes/Python/head.png",
    body: "/images/snakes/Python/body.png",
    curve: "/images/snakes/Python/curve-1.png",
    curveR: "/images/snakes/Python/curve-2.png",
    tail: "/images/snakes/Python/tail.png",
    "head-frame": "/images/snakes/Python/head-frame.png",
  },
  Rattlesnake: {
    head: "/images/snakes/Rattlesnake/head.png",
    body: "/images/snakes/Rattlesnake/body.png",
    curve: "/images/snakes/Rattlesnake/curve-1.png",
    curveR: "/images/snakes/Rattlesnake/curve-2.png",
    tail: "/images/snakes/Rattlesnake/tail.png",
    "head-frame": "/images/snakes/Rattlesnake/head-frame.png",
  },
  Regular: {
    head: "/images/snakes/Regular/head.png",
    body: "/images/snakes/Regular/body.png",
    curve: "/images/snakes/Regular/curve-1.png",
    curveR: "/images/snakes/Regular/curve-2.png",
    tail: "/images/snakes/Regular/tail.png",
    "head-frame": "/images/snakes/Regular/head-frame.png",
  },
  Slug: {
    head: "/images/snakes/Slug/head.png",
    body: "/images/snakes/Slug/body.png",
    curve: "/images/snakes/Slug/curve-1.png",
    curveR: "/images/snakes/Slug/curve-2.png",
    tail: "/images/snakes/Slug/tail.png",
    "head-frame": "/images/snakes/Slug/head-frame.png",
  },
  "Spiny Bush": {
    head: "/images/snakes/SpinyBush/head.png",
    body: "/images/snakes/SpinyBush/body.png",
    curve: "/images/snakes/SpinyBush/curve-1.png",
    curveR: "/images/snakes/SpinyBush/curve-2.png",
    tail: "/images/snakes/SpinyBush/tail.png",
    "head-frame": "/images/snakes/SpinyBush/head-frame.png",
  },
};
