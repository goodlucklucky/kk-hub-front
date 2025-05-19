import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance, localInstance } from "../axios";

export interface IUserWalletRes {
  wallet: IUserWallet;
}

export interface IUserWallet {
  sessionId: string;
  wallet_address: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  new: boolean;
}

export function useUserWallet({ sessionId }: { sessionId: TSessionId }) {
  return useQuery({
    queryKey: ["user-wallet", sessionId],
    queryFn: () =>
      baseInstance
        .get<IUserWalletRes>(
          `/wallet-service/bankings/user-wallet/${sessionId}`
        )
        .then((res) => res.data),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 1,
  });
}

export interface IBalanceRes {
  usdc: ICoin;
  usdt: ICoin;
  total: number;
}

export interface ICoin {
  name: string;
  symbol: string;
  decimals: string;
  value: string;
  displayValue: string;
}

export function useGetBalance({
  wallet_address,
}: {
  wallet_address: TSessionId;
}) {
  return useQuery({
    queryKey: ["get-balance", wallet_address],
    queryFn: () =>
      baseInstance
        .get<IBalanceRes>(`/wallet-service/bankings/wallet/balance`, {
          params: { wallet_address, chain_id: 43114 },
        })
        .then((res) => res.data),
    enabled: !!wallet_address,
    staleTime: 1000 * 60 * 1,
  });
}

export function useWithdraw({
  onSuccess,
}: {
  onSuccess?: () => Promise<unknown>;
}) {
  return useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async ({
      signal,
      body,
    }: {
      signal?: AbortSignal;
      body?: Record<string, string>;
    }) => localInstance?.post(`/banking/withdraw`, body, { signal }),
    onSuccess,
  });
}
