import { useQueries, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export enum ERedeemType {
  "redeem_5_usdt" = "redeem_5_usdt",
  "redeem_5_usdt_v2" = "redeem_5_usdt_v2",
}
export enum ERedeemStatus {
  "pending" = "pending",
  "claimed" = "claimed",
}

export interface IRedeem {
  id: string;
  sessionId: string;
  type: ERedeemType;
  status: ERedeemStatus;
  contractAddress: string;
  game_key: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRedeemStatusRes {
  data: IRedeem[];
}

export function useRedeemStatus({
  sessionId,
  type,
}: {
  sessionId: TSessionId;
  type: string;
}) {
  return useQuery({
    queryKey: ["redeem-status", sessionId, type],
    queryFn: () =>
      baseInstance
        .get<IRedeemStatusRes>(
          `/nft-service/redeem-requests/redeem/status/${sessionId}/${type}`
        )
        .then((res) => res?.data?.data),
  });
}

export function useRedeemStatuses({
  sessionId,
  types,
}: {
  sessionId: TSessionId;
  types: string[];
}) {
  return useQueries({
    queries: types.map((type) => ({
      queryKey: ["redeem-status-v2", sessionId, type],
      queryFn: () =>
        baseInstance
          .get<IRedeemStatusRes>(
            `/nft-service/redeem-requests/redeem/status/${sessionId}/${type}`
          )
          .then((res) => ({ data: res?.data?.data, type })),
    })),
  });
}
