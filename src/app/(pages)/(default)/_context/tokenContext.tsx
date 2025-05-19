// transfer from external wallet

import { useERC20Balances } from "@/app/_hooks/useERC20Balances";
import { useERC20Transfer } from "@/app/_hooks/useERC20Transfer";
import React, { createContext, useContext, useMemo } from "react";
import { useThirdweb } from "./thirdwebContext";

interface TokenContextValue {
  balances?: Record<string, string>;
  decimals?: Record<string, number>;
  isLoadingAvailable?: boolean;
  transfer?: (
    to: `0x${string}`,
    amount: string
  ) => Promise<`0x${string}` | undefined>;
  isTransferPending?: boolean;
}

const TokenContext = createContext<TokenContextValue>({});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedCurrency, selectedToken } = useThirdweb();
  const token = useMemo(() => selectedToken!, [selectedToken]);

  const {
    balances,
    decimals,
    isLoading: isLoadingAvailable,
  } = useERC20Balances([token]);

  const { transfer, isPending: isTransferPending } = useERC20Transfer({
    tokenAddress: token?.address as `0x${string}`,
    tokenDecimals: decimals?.[selectedCurrency] || 6,
    chainId: token?.chainId,
  });

  return (
    <TokenContext.Provider
      value={{
        balances,
        decimals,
        isLoadingAvailable,
        transfer,
        isTransferPending,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
