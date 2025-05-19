import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface ITask {
  id: string;
  bonusName: string;
  description: string;
  status: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  requiredForNft: boolean;
  [key: string]: any;
}

export interface ITasksResponse {
  data: { data: ITask[] };
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const [kokoTasksResponse, partnerTasksResponse] = await Promise.all([
        baseInstance
          .get<ITasksResponse>("/bonus-service/bonus/settings/all-bonuses", {
            params: { status: "active", size: -1 },
          })
          .then((res) => res.data),
        baseInstance
          .get<ITasksResponse>("/bonus-service/bonus/settings/all-bonuses", {
            params: { status: "dormant", type: "follow,share", size: -1 },
          })
          .then((res) => res.data),
      ]);

      const kokoTasks = kokoTasksResponse?.data.data.filter(
        (task) => task.bonusName !== "claim_nft_from_bonus"
      );
      const partnerTasks = partnerTasksResponse.data.data;
      const claimogTasks = kokoTasks?.filter((task) => !!task?.requiredForNft);
      return { kokoTasks, partnerTasks, claimogTasks };
    },
  });
}
