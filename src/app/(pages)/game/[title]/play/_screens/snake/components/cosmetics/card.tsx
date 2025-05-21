"use client";

import Image from "next/image";
import React, { useContext, useMemo } from "react";
import CheckIcon from "../../assets/check-icon.png";
import lockIcon from "../../assets/lock.png";
import { ISkin } from "../../services/cousmetics";
import { SnakeContext } from "../../contexts/snake-context";
import { cn } from "@/app/_lib/utils";

export default function CosmeticCard({ skin }: { skin?: ISkin }) {
  // const { sessionId } = useContext(GeneralContext);
  const { changeActiveSkin, activeSkin } = useContext(SnakeContext);

  const is_active = useMemo(
    () => activeSkin == skin?.name,
    [activeSkin, skin?.name]
  );
  const is_default = useMemo(() => skin?.is_default, [skin?.is_default]);
  const status = useMemo(() => {
    if (is_active)
      return {
        title: "claimed",
        content: (
          <Image
            src={CheckIcon}
            alt="Claim"
            width={14}
            height={14}
            className="mx-auto mb-1"
          />
        ),
      };
    else if (!is_default && !skin?.user_items)
      return {
        title: "un_purchased",
        content: <>{skin?.price != 0 ? `$${skin?.price}` : "Free"}</>,
      };
    else
      return {
        title: "purchased",
        content: <>{skin?.name}</>,
      };
  }, [is_active, is_default, skin?.name, skin?.price, skin?.user_items]);

  // const handleBuy = useCallback(
  //   async ({
  //     title,
  //     description,
  //     price,
  //     item_id,
  //   }: {
  //     title: string;
  //     description: string;
  //     price: number;
  //     item_id: string;
  //   }) => {
  //     try {
  //       const { data: invoiceLink } = await buyItem({
  //         title,
  //         description,
  //         price,
  //         item_id,
  //         payment_item_type: "snake-skin",
  //       });

  //       if (webApp)
  //         webApp?.openIsnvoice?.(invoiceLink, async (status: string) => {
  //           if (status === "paid") {
  //             saveMixpanel("Payment Success", {
  //               title,
  //               description,
  //               price,
  //               type: "snake skin",
  //             });
  //             await refreshSkins?.();
  //             toast.success("Payment successful");
  //           }
  //         });
  //       else toast.error("WebApp not loaded");
  //     } catch (error: any) {
  //       toast.error("Something went wrong", error?.message);
  //     }
  //   },
  //   [buyItem, refreshSkins, saveMixpanel, webApp]
  // );

  // const handleClaimFree = useCallback(
  //   async (skin: ISkin) => {
  //     try {
  //       await claimFreeSkin({ id: skin.id, sessionId });

  //       await refreshSkins?.();
  //       // changeActiveSkin?.(skin);
  //       // toast.success("Skin claimed successfully");
  //       // saveMixpanel("Payment Success", {
  //       //   title: skin?.name,
  //       //   description: skin?.description,
  //       //   price: skin?.price,
  //       //   type: "snake skin",
  //       // });
  //     } catch (error: any) {
  //       toast.error("Something went wrong", error?.message);
  //     }
  //   },
  //   [claimFreeSkin, refreshSkins, sessionId]
  // );

  return (
    <div
      className={cn(
        "flex rounded-xl p-[1px] bg-gradient-to-b",
        is_active
          ? "from-[rgba(70,211,76,1)] to-[rgba(32,157,82,1)]"
          : status?.title == "un_purchased"
          ? "from-[rgba(241,220,184,1)] to-[rgba(95,63,87,0.6)]"
          : "from-[rgba(241,220,184,1)] to-[rgba(232,196,166,1)]",
        "shadow-[0_0.2rem_0] shadow-[rgba(0,0,0,0.16)]"
      )}
    >
      <div
        className={cn(
          "flex-1 flex flex-col rounded-xl",
          is_active ? "bg-[rgba(37,191,99,1)] p-1 pb-0" : "bg-[#fde7c6]"
        )}
      >
        <div
          className={cn(
            is_active ? "rounded-t-lg" : "rounded-t-xl",
            "w-full aspect-video contain-content",
            "flex-1 flex",
            "border-0 border-b border-solid border-[rgba(184,157,152,0.6)]"
          )}
          style={{ backgroundColor: skin?.details?.color || "#fde7c6" }}
        >
          <Image
            alt="regular snake"
            src={
              skin?.details?.icon ||
              skin?.skin_url ||
              "/images/snakes/Regular/icon.png"
            }
            width={200}
            height={200}
            className="flex-1 size-full object-contain object-top"
          />
        </div>
        <button
          className={cn(
            "text-xs h-7 px-0 rounded-b-xl relative",
            "leading-3",
            "border-0 border-t border-solid border-[rgba(252,234,208,0.6)]",
            status?.title == "un_purchased"
              ? "bg-[rgba(116,80,97,1)] text-[rgba(239,246,255,1)]"
              : "line-clamp-2"
          )}
          onClick={() => {
            if (status?.title == "purchased" || is_default)
              changeActiveSkin?.(skin!);
            else if (status?.title == "un_purchased") {
              // if (skin?.price != 0)
              //   handleBuy({
              //     title: skin?.name || "",
              //     description: skin?.description || "",
              //     price: skin?.price || 0,
              //     item_id: skin?.id || "",
              //   });
              // else handleClaimFree?.(skin!);
            }
          }}
        >
          {status?.title == "un_purchased" && (
            <div
              className={cn(
                "absolute left-2 top-0 -translate-x-1/2 -translate-y-1/2",
                "p-0.5 rounded-full size-fit",
                "bg-[rgba(116,80,97,1)] bg-gradient-to-br from-[rgba(189,156,172,0.5)] to-[rgba(54,36,45,0.5)]"
              )}
            >
              <div className="size-fit rounded-full p-1 bg-[rgba(116,80,97,1)]">
                <Image
                  src={lockIcon}
                  alt="Lock"
                  width={32}
                  height={32}
                  className="size-5 brightness-[20]"
                />
              </div>
            </div>
          )}
          {status?.content}
        </button>
      </div>
    </div>
  );
}
