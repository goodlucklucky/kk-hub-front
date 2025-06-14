export interface SpinnerItem {
  kokos: number;
  prob: number;
  type: "kokos" | "USDT" | "spin";
  value: number;
}

export const spinnerProbability: SpinnerItem[] = [
  {
    kokos: 1,
    prob: 75.0,
    type: "kokos",
    value: 10000,
  },
  {
    kokos: 2,
    prob: 15.0,
    type: "kokos",
    value: 25000,
  },
  {
    kokos: 3,
    prob: 7.8,
    type: "kokos",
    value: 50000,
  },
  {
    kokos: 4,
    prob: 0.085,
    type: "USDT",
    value: 0.1,
  },
  {
    kokos: 5,
    prob: 0.035,
    type: "USDT",
    value: 0.25,
  },
  {
    kokos: 6,
    prob: 0.00125,
    type: "USDT",
    value: 1,
  },
  {
    kokos: 7,
    prob: 0.000025,
    type: "USDT",
    value: 5,
  },
  {
    kokos: 7,
    prob: 0.00000025,
    type: "USDT",
    value: 10,
  },
  {
    kokos: 9,
    prob: 0.000000015,
    type: "USDT",
    value: 50,
  },
  {
    kokos: 10,
    prob: 2.0,
    type: "spin",
    value: 1,
  },
];
