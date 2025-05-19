import { useAccount } from "wagmi";
import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { useMemo } from "react";
import type { Abi } from "viem";

const erc20ABI: Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
];

export interface TokenConfig {
  address: `0x${string}`;
  chainId: number;
  symbol: string;
}

export function useERC20Balances(tokens: TokenConfig[]) {
  const { address, isConnected } = useAccount();

  const contracts = useMemo(() => {
    if (!address || !isConnected) return [];
    return tokens.flatMap((token) => [
      {
        address: token.address,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [address] as const,
        chainId: token.chainId,
      },
      {
        address: token.address,
        abi: erc20ABI,
        functionName: "decimals",
        chainId: token.chainId,
      },
    ]);
  }, [tokens, address, isConnected]);

  const { data, isLoading, error } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0,
    },
  });

  const { results: balances, decimals } = useMemo(() => {
    const results: Record<string, string> = {};
    const decimals: Record<string, number> = {};
    if (!data || data.length < 2) return { results, decimals };

    for (let i = 0; i < tokens.length; i++) {
      const balanceIdx = i * 2;
      const decimalsIdx = i * 2 + 1;
      const rawBalance = data[balanceIdx]?.result as bigint;
      const decimal = data[decimalsIdx]?.result as number;

      const formatted =
        rawBalance && decimals ? formatUnits(rawBalance, decimal) : "0";
      results[tokens[i].symbol] = formatted;
      decimals[tokens[i].symbol] = decimal;
    }

    return { results, decimals };
  }, [data, tokens]);

  return { balances, decimals, isLoading, error };
}
