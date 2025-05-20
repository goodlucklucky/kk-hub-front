import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface IUserXP {
  xp: number;
  level: ILevel & { order: number };
}

export interface ILevel {
  name: string;
  maxXp: number;
  reward: {};
}

export const useUserXp = ({ sessionId }: { sessionId: string }) => {
  return useQuery({
    queryKey: ["userXp", sessionId],
    queryFn: async () => {
      const response = await baseInstance.get<{ data: IUserXP }>(
        `/points-service/level-xp/level/${sessionId}`
      );
      return response?.data?.data;
    },
    enabled: !!sessionId,
  });
};
