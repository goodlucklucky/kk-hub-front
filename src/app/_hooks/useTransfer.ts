import { useCallback, useState } from "react";
import { transfer as transferErc20 } from "thirdweb/extensions/erc20";
import { PreparedTransaction, sendBatchTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from "../_utils/thirdWebClient";
import { avalanche } from "thirdweb/chains";

export type TTransactionType = "default" | "withdraw";

export function useTransfer() {
  const account = useActiveAccount();
  const [isPending, setIsPending] = useState(false);

  const transfer = useCallback(
    async ({
      to,
      amount,
      contract_address,
      type = "default",
    }: {
      to: string;
      amount: string | number;
      contract_address: string;
      type?: TTransactionType;
    }) => {
      setIsPending(true);

      let total = Number(amount) || 0;
      let fee = 0;

      const feePercent = 2 / 100;
      const withdrawFeeWallet = process.env.NEXT_PUBLIC_FEE_WALLET!;
      let transaction: PreparedTransaction | undefined = undefined;

      if (type == "withdraw") {
        fee = total * feePercent;
        total = total - fee;

        transaction = transferErc20({
          contract: {
            address: contract_address as any,
            chain: avalanche,
            client,
          },
          to: withdrawFeeWallet,
          amount: fee,
        });
      }

      try {
        const transactions = [
          transferErc20({
            contract: {
              address: contract_address as any,
              chain: avalanche,
              client,
            },
            to,
            amount: total,
          }),
          ...(transaction ? [transaction] : []),
        ];
        const res = await sendBatchTransaction({
          transactions,
          account: account!,
        });
        // console.log("handleManualWithdraw res: ", res);

        return { data: res };
      } catch (error) {
        // console.error("handleTransfer error: ", error);
        return { error };
      } finally {
        setIsPending(false);
      }
    },
    [account]
  );

  return { transfer, isPending };
}
