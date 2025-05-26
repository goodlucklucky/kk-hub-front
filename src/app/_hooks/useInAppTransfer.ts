import { useCallback, useMemo, useState } from "react";
import { Chain, Hex, ThirdwebClient } from "thirdweb";
import { useTransfer } from "./useTransfer";
import { useThirdweb } from "../(pages)/(default)/_context/thirdwebContext";
import { coinAddresses } from "../_constants/coinAddresses";

type TransferRes = {
  transactionHash?: Hex;
  client?: ThirdwebClient;
  chain?: Chain;
  maxBlocksWaitTime?: number | undefined;
  type: "usdc" | "usdt";
};

export function useInAppTransfer() {
  // const account = useActiveAccount();
  const [isPending, setIsPending] = useState(false);

  const {
    balance: { usdc, usdt, refresh: refreshBalance },
  } = useThirdweb();

  const { usdc: myUsdc, usdt: myUsdt } = useMemo(
    () => ({
      usdc: Number(usdc?.data?.displayValue) || 0,
      usdt: Number(usdt?.data?.displayValue) || 0,
    }),
    [usdc?.data?.displayValue, usdt?.data?.displayValue]
  );

  const { transfer } = useTransfer();

  const inAppTransfer = useCallback(
    async ({ to, amount }: { to: string; amount: string | number }) => {
      setIsPending(true);

      try {
        const txHashes: string[] = [];
        const responses: TransferRes[] = [];

        const usdcContract = coinAddresses?.usdc?.[43114];
        const usdtContract = coinAddresses?.usdt?.[43114];

        const payAmount = Number(amount) || 0;
        let transferUsdc = 0;
        let transferUsdt = 0;

        if (myUsdc > myUsdt) {
          transferUsdc = payAmount > myUsdc ? myUsdc : payAmount;
          transferUsdt = payAmount - transferUsdc;
        } else {
          transferUsdt = payAmount > myUsdt ? myUsdt : payAmount;
          transferUsdc = payAmount - transferUsdt;
        }

        if (transferUsdc <= 0 && transferUsdt <= 0) {
          // toast.error("Insufficient balance");
          return { error: "Insufficient balance" };
        }

        if (transferUsdc > 0) {
          const { data: res, error } = await transfer({
            contract_address: usdcContract,
            to,
            amount: `${transferUsdc}`,
          });
          if (error) throw error;
          // console.log("handleManualWithdraw res: ", res);

          txHashes?.push(`${res?.transactionHash}`);
          responses?.push({ ...res, type: "usdc" });
        }

        if (transferUsdt > 0) {
          const { data: res, error } = await transfer({
            contract_address: usdtContract,
            to,
            amount: `${transferUsdt}`,
          });
          if (error) throw error;
          // console.log("handleManualWithdraw res: ", res);

          txHashes.push(`${res?.transactionHash}`);
          responses?.push({ ...res, type: "usdc" });
        }

        refreshBalance?.();

        // console.log("handleManualWithdraw res: ", res);
        return { data: { responses, txHashes } };
      } catch (error: any) {
        // console.error("handleTransfer error: ", error);
        return { error: error?.message };
      } finally {
        setIsPending(false);
      }
    },
    [myUsdc, myUsdt, refreshBalance, transfer]
  );

  return { inAppTransfer, isPending };
}
