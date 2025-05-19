import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface IMultiplier {
  id: string;
  sessionId: string;
  amount: number;
  game_key: string;
  details: { amounts: number[] };
  activated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export function useMultiplier(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["multiplier", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data?: IMultiplier;
        }>(`/game-service/challenges/score/multipliers/${sessionId}`)
        .then((res) => res.data?.data),
  });
}
