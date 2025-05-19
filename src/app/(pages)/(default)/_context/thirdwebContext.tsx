// get balance from thirdweb wallet

import { coinAddresses } from "@/app/_constants/coinAddresses";
import { useThirdwebBalances } from "@/app/_hooks/useThirdwebBalance";
import { UseQueryResult } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";
import { GetBalanceResult } from "thirdweb/extensions/erc20";
import { useChainId } from "wagmi";

type TokenSymbol = "usdc" | "usdt";

interface TokenInfo {
  address: `0x${string}`;
  chainId: number;
  symbol: TokenSymbol;
}

interface TokenMap {
  usdc: TokenInfo;
  usdt: TokenInfo;
}

interface ThirdwebContextValue {
  balance: {
    isPending?: boolean;
    total?: number;
    usdt?: UseQueryResult<GetBalanceResult>;
    usdc?: UseQueryResult<GetBalanceResult>;
    refresh?: () => Promise<void>;
  };

  chainId?: number;
  tokens?: TokenMap;
  selectedCurrency: TokenSymbol;
  setSelectedCurrency?: Setter<TokenSymbol>;
  selectedToken?: TokenInfo;
}

const ThirdwebContext = createContext<ThirdwebContextValue>({
  balance: {},
  selectedCurrency: "usdc",
});

export const ThirdwebValuesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const balance = useThirdwebBalances();
  const chainId = useChainId();

  const tokens = useMemo<TokenMap>(
    () => ({
      usdc: {
        address:
          (coinAddresses?.usdc as any)?.[chainId] ||
          coinAddresses?.usdc?.[43114],
        chainId,
        symbol: "usdc",
      },
      usdt: {
        address:
          (coinAddresses?.usdt as any)?.[chainId] ||
          coinAddresses?.usdt?.[43114],
        chainId,
        symbol: "usdt",
      },
    }),
    [chainId]
  );

  const [selectedCurrency, setSelectedCurrency] = useState<"usdc" | "usdt">(
    "usdc"
  );

  const selectedToken = useMemo(
    () => (tokens as any)[selectedCurrency] || tokens["usdc"],
    [selectedCurrency, tokens]
  );

  return (
    <ThirdwebContext.Provider
      value={{
        balance: balance || {},

        chainId,
        tokens,
        selectedCurrency,
        setSelectedCurrency,
        selectedToken,
      }}
    >
      {children}
    </ThirdwebContext.Provider>
  );
};

export const useThirdweb = () => {
  const context = useContext(ThirdwebContext);
  if (!context)
    throw new Error("useToken must be used within a ThirdwebProvider");

  return context;
};
