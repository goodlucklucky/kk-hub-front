declare module "*.mp3" {
  const content: string;
  export default content;
}

declare module "js-chess-engine" {
  export interface BoardConfiguration {
    turn?: "white" | "black";
    pieces: Record<string, string>; // e.g., { E1: "K", E8: "k" }
    castling?: {
      whiteLong?: boolean;
      whiteShort?: boolean;
      blackLong?: boolean;
      blackShort?: boolean;
    };
    isFinished?: boolean;
    checkMate?: boolean;
    move?: {
      from: string;
      to: string;
    };
    moves?: Record<string, string[]>;
  }

  export class Game {
    constructor(
      config?: Partial<BoardConfiguration> & {
        boardConfiguration?: BoardConfiguration;
        turn?: "white" | "black";
      }
    );

    move(from: string, to: string): void;

    aiMove(level?: number): Record<string, string>;

    moves(from?: string): Record<string, string[]>;

    printToConsole(): void;

    exportJson(): BoardConfiguration;
  }

  // Stateless API
  export function move(config: {
    boardConfiguration: BoardConfiguration;
    move: { from: string; to: string };
  }): BoardConfiguration;

  export function aiMove(
    config: Partial<BoardConfiguration> & {
      boardConfiguration: BoardConfiguration;
      level?: number;
    }
  ): Record<string, string>; // { from: to }

  export function moves(config: {
    boardConfiguration: BoardConfiguration;
    from?: string;
  }): Record<string, string[]>;

  export function status(config: {
    boardConfiguration: BoardConfiguration;
  }): BoardConfiguration;

  const jsChessEngine: {
    Game: typeof Game;
    move: typeof move;
    aiMove: typeof aiMove;
    moves: typeof moves;
    status: typeof status;
  };

  export default jsChessEngine;
}
