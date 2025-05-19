import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance, localInstance } from "../axios";
import { ECurrency, ENetworks } from "@/src/_utils/chains";

export interface ITransactions {
  id: string;
  sessionId: string;
  wallet_address: string;
  amount: number;
  cummulative: number;
  source: string;
  game_key: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICurrentWallet {
  sessionId: string;
  public_key: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  new: boolean;
  latest: ITransactions | null;
  bonus?: {
    unCollactable: number;
    total: number;
    volumeToPay?: number;
    currentPaid?: number;
  } | null;
  available: number;
  total: number;
}

export function useCurrentWallet({ sessionId }: { sessionId: TSessionId }) {
  return useQuery({
    queryKey: ["current-wallet", sessionId],
    queryFn: () =>
      baseInstance
        .get<ICurrentWallet>(
          `/wallet-service/transactions/${sessionId}/current-wallet`
        )
        .then((res) => ({ ...res.data })),
  });
}

export function useWithdraw({
  onSuccess,
}: {
  onSuccess?: () => Promise<unknown>;
}) {
  return useMutation({
    mutationKey: ["withdraw"],
    mutationFn: ({
      signal,
      ...body
    }: {
      signal?: AbortSignal;
      sessionId: TSessionId;
      currency: ECurrency;
      network: ENetworks;
      wallet_address: string;
      amount: number;
    }) =>
      localInstance
        .post(`/wallet/withdraw`, body, { signal })
        .then((res) => res.data),
    onSuccess,
  });
}

export function useActivateRequest({
  onSuccess,
}: {
  onSuccess?: () => Promise<unknown>;
}) {
  return useMutation({
    mutationKey: ["activate-request"],
    mutationFn: (body: { sessionId: TSessionId; wallet_address?: string }) =>
      baseInstance
        .post(`/wallet-service/users/activate-requests`, body)
        .then((res) => res.data),
    onSuccess,
  });
}

export interface IActivateRequest {
  data: {
    results: IActivate[];
    total: number;
    size: number;
    start: number;
    end: number;
  };
}

export interface IActivate {
  id: string;
  sessionId: string;
  wallet_address: string;
  comment: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export function useGetActivate({
  wallet_address,
}: {
  wallet_address?: string;
}) {
  return useQuery({
    queryKey: ["get-activate", wallet_address],
    queryFn: () =>
      baseInstance
        .get<IActivateRequest>(`/wallet-service/users/activate-requests/all`, {
          params: { wallet_address },
        })
        .then((res) => res.data?.data),
  });
}
