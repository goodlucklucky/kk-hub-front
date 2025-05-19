import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { coinAddresses } from "../_constants/coinAddresses";
import { avalanche } from "thirdweb/chains";
import { client } from "../_utils/thirdWebClient";
import { useCallback, useMemo } from "react";

type TKeyOfCoinAddresses = keyof typeof coinAddresses.usdt;

export function useThirdwebBalances() {
  const account = useActiveAccount();

  const usdtData = useWalletBalance({
    client: client,
    address: account?.address,
    chain: avalanche,
    tokenAddress:
      coinAddresses?.usdt?.[avalanche?.id as unknown as TKeyOfCoinAddresses],
  });
  const usdcData = useWalletBalance({
    client: client,
    address: account?.address,
    chain: avalanche,
    tokenAddress:
      coinAddresses?.usdc?.[avalanche?.id as unknown as TKeyOfCoinAddresses],
  });

  const isPending = useMemo(
    () => usdcData?.isPending || usdtData?.isPending,
    [usdcData?.isPending, usdtData?.isPending]
  );
  const total = useMemo(
    () =>
      Number(usdtData?.data?.displayValue || 0) +
      Number(usdcData?.data?.displayValue || 0),
    [usdtData?.data?.displayValue, usdcData?.data?.displayValue]
  );

  const refresh = useCallback(async () => {
    try {
      await Promise.all([usdtData?.refetch(), usdcData?.refetch()]);
    } catch {
      // console.log("error", error);
    }
  }, [usdcData, usdtData]);

  return { isPending, total, usdt: usdtData, usdc: usdcData, refresh };
}
