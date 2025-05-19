import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";
type TBonus = {
  chest: number;
  spins: number;
};

type TDetails = {
  amount?: string;
  bonus?: TBonus;
};
export enum TDailyRewardType {
  CHEST = "chest",
  SPINS = "spins",
  MEGA = "mega",
}
export type TDailyItem = {
  id: string;
  type: TDailyRewardType;
  day: number;
  require_claim: boolean;
  game_key: string;
  details: TDetails;
  created_at: string;
  updated_at: string;
};

type TDailyRewards = {
  data: TDailyItem[];
};
type CurrentDayClaimStatus = {
  data: {
    isClaimed: boolean;
    day: number;
  };
};
export type TRewards = { type: string; value: number };
type TCollectRewardsResponse = {
  data: {
    sessionId: string;
    day: number;
    claimed: boolean;
    game_key: string;
    details: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    rewards: TRewards[];
  };
};
export function useDailyRewards() {
  return useQuery({
    queryKey: ["get-daily-rewards"],
    queryFn: async () => {
      const res = await baseInstance.get<TDailyRewards>(
        `/bonus-service/daily-rewards`,
        { params: { size: -1, start: 0 } }
      );
      return res?.data;
    },
  });
}
export function useCurrentDayClaimStatus({
  sessionId,
}: {
  sessionId: TSessionId;
}) {
  return useQuery({
    queryKey: ["get-current-day-claim-status"],
    queryFn: async () => {
      const res = await baseInstance.get<CurrentDayClaimStatus>(
        `/bonus-service/daily-rewards/claims/${sessionId}/current-day`,
        { params: { size: -1, start: 0 } }
      );
      return res?.data;
    },
  });
}

export function useCollectRewards({
  onSuccess,
}: {
  onSuccess?: () => Promise<unknown> | void;
}) {
  return useMutation({
    mutationKey: ["user-collect-rewards"],
    mutationFn: async ({
      sessionId,
      day,
    }: {
      sessionId: TSessionId;
      day: number;
    }) => {
      const res = await baseInstance.post<TCollectRewardsResponse>(
        `/bonus-service/daily-spin-reward/users-daily`,
        { sessionId, day: day }
      );
      return res?.data?.data;
    },
    onSuccess,
  });
}
