export type ChallengeType = {
  id: string | number;
  name: string;
  challengeValue: number | null;
  prizeUpToValue: number | null;
  status: string;
  titleColor: string;
  yourScore?: number;
  yourPrize?: number;
  bestScore?: number;
  beatForWin: number;
  beatForQuality: number;
};

export const challengeData: ChallengeType[] = [
  {
    id: 1,
    name: "Special Challenge",
    challengeValue: null,
    prizeUpToValue: null,
    status: "not-entered",
    titleColor: "#E98C0066",
    yourScore: 300,
    bestScore: 45780,
    beatForWin: 900,
    beatForQuality: 400,
  },
  {
    id: 2,
    name: "25K🥥 Challenge",
    challengeValue: 25000,
    prizeUpToValue: 500000,
    status: "entered",
    titleColor: "#D900003D",
    beatForWin: 700,
    beatForQuality: 200,
  },
  {
    id: 3,
    name: "50K🥥 Challenge",
    challengeValue: 50000,
    prizeUpToValue: null,
    status: "not-entered",
    titleColor: "#8200E93D",
    yourScore: 560,
    bestScore: 8244,
    yourPrize: 2500,
    beatForWin: 900,
    beatForQuality: 400,
  },
  {
    id: 4,
    name: "100K🥥 Challenge",
    challengeValue: 100000,
    prizeUpToValue: null,
    status: "qualified",
    titleColor: "#0094FF3D",
    yourScore: 220,
    bestScore: 1998563,
    yourPrize: 1200,
    beatForWin: 1000,
    beatForQuality: 500,
  },
  {
    id: 5,
    name: "500K🥥 Challenge",
    challengeValue: 500000,
    prizeUpToValue: null,
    status: "not-entered",
    titleColor: "#00DE093D",
    beatForWin: 800,
    beatForQuality: 300,
  },
];
