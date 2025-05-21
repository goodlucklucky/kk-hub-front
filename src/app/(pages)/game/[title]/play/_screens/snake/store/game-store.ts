/* eslint-disable no-unused-vars */
"use client";

import { create } from "zustand";
import { TGameState } from "../constants/Snake";

interface GameState {
  score: number;
  bestScore: number;
  time: number;
  bestTime: number;
  startTime: number;
  gameState: TGameState;
  setScore: (score: number) => void;
  setBestScore: (score: number) => void;
  setTime: (time: number) => void;
  setBestTime: (time: number) => void;
  setStartTime: (startTime: number) => void;
  setGameState: (state: TGameState) => void;
  resetGame: () => void;
  isLoading: boolean;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  bestScore: 0,
  time: 0,
  bestTime: 0,
  startTime: Date.now(),
  gameState: "onboarding",
  setScore: (score) => set({ score }),
  setBestScore: (score) => set({ bestScore: score }),
  setTime: (time) => set({ time }),
  setStartTime: (startTime) => set({ startTime: startTime }),
  setBestTime: (time) => set({ bestTime: time }),
  setGameState: (gameState) => set({ gameState }),
  resetGame: () => set({ score: 0, time: 0, gameState: "playing" }),
  isLoading: false,
}));
