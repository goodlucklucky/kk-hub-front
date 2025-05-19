import { useCallback, useState } from "react";
import { transfer as transferErc20 } from "thirdweb/extensions/erc20";
import { sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client } from "../_utils/thirdWebClient";
import { avalanche } from "thirdweb/chains";

export function useTransfer() {
  const account = useActiveAccount();
  const [isPending, setIsPending] = useState(false);

  const transfer = useCallback(
    async ({
      to,
      amount,
      contract_address,
    }: {
      to: string;
      amount: string | number;
      contract_address: string;
    }) => {
      setIsPending(true);

      try {
        const transaction = transferErc20({
          contract: {
            address: contract_address as any,
            chain: avalanche,
            client,
          },
          to,
          amount,
        });
        const res = await sendTransaction({ transaction, account: account! });
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
