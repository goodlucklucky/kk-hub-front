import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export function useLootboxes({ sessionId }: { sessionId?: string }) {
  return useQuery({
    queryKey: ["lootbox", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: {
            tier_one: number;
            tier_two: number;
            tier_three: number;
            tier_four: number;
            total: number;
          };
        }>(`/bonus-service/loot-box/inventory/user/${sessionId}`)
        .then((res) => res?.data?.data),
    enabled: !!sessionId,
  });
}
