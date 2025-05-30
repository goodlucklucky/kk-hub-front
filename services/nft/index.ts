import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export function useOgNft(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["og-nft", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: { userNFTs: any[]; count: number };
        }>(`/nft-service/nft/user/${sessionId}`)
        .then((res) => res.data),
  });
}

export function useAirdropNft() {
  return useMutation({
    mutationKey: ["airdrop-nft"],
    mutationFn: ({
      sessionId,
      wallet,
      type,
    }: {
      sessionId: TSessionId;
      wallet: string;
      type: string;
    }) =>
      baseInstance
        .post<{ message: string }>(`/nft-service/nft/airdrop/mint`, {
          sessionId,
          walletAddress: wallet,
          type,
        })
        .then((res) => res.data),
  });
}

export function useAirdropCheck() {
  return useMutation({
    mutationKey: ["airdrop-check"],
    mutationFn: ({
      sessionId,
      type,
    }: {
      sessionId: TSessionId;
      type: string;
    }) =>
      baseInstance
        .get<{
          data: { isClaimed: boolean };
        }>(`/nft-service/nft/airdrop/check`, { params: { sessionId, type } })
        .then((res) => res.data),
  });
}

export interface IAirdropRes {
  data: {
    data: IAirdrop[];
    total: number;
    size: number;
    start: number;
    end: number;
  };
}

export interface IAirdrop {
  id: string;
  sessionId: string;
  walletAddress: string;
  type: string;
  isClaimed: boolean;
  contractAddress: string;
  tokenId: string;
  game_key: string;
  created_at: Date;
  updated_at: Date;
}

export function useAirdrop({
  sessionId,
  type,
}: {
  sessionId: TSessionId;
  type?: string;
}) {
  return useQuery({
    queryKey: ["airdrop"],
    queryFn: () =>
      baseInstance
        .get<IAirdropRes>(`/nft-service/nft/airdrop/all`, {
          params: { sessionId, type },
        })
        .then((res) => res?.data?.data),
    enabled: !!sessionId,
  });
}
