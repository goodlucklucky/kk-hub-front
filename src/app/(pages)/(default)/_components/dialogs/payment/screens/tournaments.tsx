import React, { useCallback } from "react";
import { TItem } from "../type";
import { useGeneral } from "@/app/_providers/generalProvider";
import PaymentDialog from "..";
import Image from "next/image";
import green_dollar_circle from "@assets/svg/green-dollar-circle.svg";
import { usePayFeeV2 } from "@/../services/game/challenges";

type TDialogProps = {
  item: TItem;
  wallet_address: `0x${string}`;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void> | void;
};

export default function TournamentsPayment({
  isOpen,
  wallet_address,
  item,
  onClose,
  onSuccess,
}: TDialogProps) {
  const { sessionId } = useGeneral();
  const { mutateAsync: payFee } = usePayFeeV2({});

  const handleConfirm = useCallback(
    async ({
      txHashes,
      // payment_method = "in-app",
    }: {
      txHashes: string;
      payment_method?: "in-app" | "external";
    }) => {
      try {
        await payFee({ id: item?.id, sessionId, txHash: txHashes });

        // await confirm({
        //   txHash: txHashes,
        //   payment_item_type: "store",
        //   price: item?.price || 0,
        //   item_id: item?.id,
        //   payment_method,
        //   sessionId,
        // });

        onSuccess?.();
      } catch (error) {
        // console.error("Error during confirmation:", error);
        throw error;
      }
    },
    [item?.id, sessionId, payFee, onSuccess]
  );

  return (
    <PaymentDialog
      isOpen={isOpen}
      onClose={onClose}
      item={item}
      to_wallet={wallet_address}
      handleConfirm={handleConfirm}
      initial_state="confirm"
      comfirm_content={{
        title: (
          <>
            <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
              Ready to Win
            </div>
            <Image src={green_dollar_circle} alt="green_dollar_circle" />
            <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
              ?
            </div>
          </>
        ),
        itemTime: `Tournament Entry Fee`,
        description: "One payment - unlimited attempts!",
        button: "Play Now!",
      }}
    />
  );
}
