import { useWriteContract, useAccount } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { useCallback } from "react";

export function useERC20Transfer({
  tokenAddress,
  tokenDecimals,
  chainId,
}: {
  tokenAddress: `0x${string}`;
  tokenDecimals: number;
  chainId: number;
}) {
  const { writeContractAsync, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const transfer = useCallback(
    async (to: `0x${string}`, amount: string) => {
      if (!address || !amount) return;
      const value = parseUnits(amount, tokenDecimals);
      return await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [to, value],
        chainId,
      });
    },
    [tokenAddress, tokenDecimals, writeContractAsync, address, chainId]
  );

  return { transfer, isPending, error };
}
