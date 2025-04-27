import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface IRetention {
  id: string;
  sessionId: string;
  day: number;
  lastLogged: Date;
  game_key: string;
  created_at: Date;
  updated_at: Date;
}

export function useUserRetention(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["retention", sessionId],
    queryFn: () =>
      baseInstance
        .get<{ data?: IRetention }>(`/report-service/retentions/${sessionId}`)
        .then((res) => res.data?.data),
  });
}
