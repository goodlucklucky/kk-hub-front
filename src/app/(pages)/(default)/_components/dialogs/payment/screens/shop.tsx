import React, { useCallback, useMemo } from "react";
import { TItem } from "../type";
import { useBuyStore } from "@/../services/store";
import { useGeneral } from "@/app/_providers/generalProvider";
import PaymentDialog from "..";

type TDialogProps = {
  item: TItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function ShopPayment({ isOpen, item, onClose }: TDialogProps) {
  const { sessionId } = useGeneral();
  const { mutateAsync: confirm } = useBuyStore();

  const toWallet = useMemo(
    () => process.env.NEXT_PUBLIC_STORE_WALLET as `0x${string}`,
    []
  );

  const handleConfirm = useCallback(
    async ({
      txHashes,
      payment_method = "in-app",
    }: {
      txHashes: string;
      payment_method?: "in-app" | "external";
    }) => {
      try {
        await confirm({
          txHash: txHashes,
          payment_item_type: "store",
          price: item?.price || 0,
          item_id: item?.id,
          payment_method,
          sessionId,
        });
      } catch (error) {
        // console.error("Error during confirmation:", error);
        throw error;
      }
    },
    [confirm, item?.id, item?.price, sessionId]
  );

  return (
    <PaymentDialog
      isOpen={isOpen}
      onClose={onClose}
      item={item}
      to_wallet={toWallet}
      handleConfirm={handleConfirm}
    />
  );
}
