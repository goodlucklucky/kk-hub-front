"use client";

import { TDailyRewardType } from "../../../../../services/spins/daily";

export interface IReward {
  img: any;
  name: string;
  type: TDailyRewardType;
}
