import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface ICollectablesRes {
  data: ICollectables[];
  total: number;
  size: number;
  start: number;
  end: number;
}

export interface ICollectables {
  id: number;
  sessionId: string;
  counts: number;
  game_key: string;
  details: {
    type: string;
    item_id: string;
  };
  created_at: Date;
  updated_at: Date;
}

export function useCollectables(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["collectables", sessionId],
    queryFn: () =>
      baseInstance
        .get<ICollectablesRes>(`/nft-service/collectables`, {
          params: { size: -1, sessionId },
        })
        .then((res) => res.data),
  });
}
