import forestBack from "@assets/images/forest-back.png";
import snakeHome from "@assets/images/snake-home.png";
import flappyHome from "@assets/images/flappy-home.png";

export const games_contents = [
  {
    key: "snake",
    name: "Koko Snake",
    image: "/images/kokosnake.jpg",
    link: "#",
    page: "/game/snake",
    type: "Games",
    webtype: "nextjs",
    category: "games",
    contents: {
      homePlay: "Snake",
    },
    wallpaper: {
      home2: forestBack.src,
      homeFront: snakeHome.src,
    },
  },
  {
    key: "flappy",
    name: "Flappy Kokomo",
    image: "/images/flappykokomo.png",
    link: "#",
    page: "/game/flappy",
    type: "Games",
    webtype: "nextjs",
    category: "games",
    isNew: true,
    contents: {
      homePlay: "Flappy dunk",
    },
    wallpaper: {
      home2: forestBack?.src,
      homeFront: flappyHome?.src,
    },
  },
  {
    key: "chess",
    name: "Koko Chess",
    image: "/images/ChessSet.jpg",
    link: "#",
    page: "/game/chess",
    type: "Games",
    webtype: "nextjs",
    category: "games",
    isNew: true,
    wallpaper: {
      hideHeaderImage: true,
      home: "/images/chess-wallpaper.png",
      other: "/images/chess-wallpaper-2.png",
    },
    contents: {
      homePlay: "Chess",
    },
  },
  {
    key: "tetris",
    name: "Tetris",
    image: "/images/tetris.png",
    link: "#",
    page: "/game/tetris",
    type: "Games",
    webtype: "nextjs",
    category: "games",
    isNew: true,
    wallpaper: {
      hideHeaderImage: true,
      home: "/images/tetris-wallpaper.png",
      other: "/images/tetris-wallpaper-2.png",
    },
    contents: {
      homePlay: "Tetris",
    },
  },
  {
    key: "onemillion",
    name: "One Milion",
    image: "/images/kokomogame.png",
    link: "#",
    page: "/game/onemillion",
    type: "Games",
    webtype: "unity",
    category: "games",
    contents: {
      homePlay: "1M1",
    },
  },
];
