"use client";

import React from "react";

import { useCallback, useContext, useMemo } from "react";
import { GeneralContext } from "@/app/_providers/generalProvider";
import toast from "react-hot-toast";
import { trackEvent } from "@/app/_lib/mixpanel";

import Button from "@/app/_components/shared/button";
import { CopyIcon } from "@/app/_assets/svg/copy";
import { ShareIcon } from "@/app/_assets/svg/share";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon as ShareTelegramIcon,
  WhatsappIcon,
} from "react-share";
import BoxMain from "../BoxMain";
import { cn } from "@/app/_lib/utils";

export default function ShareButtons({ className }: { className?: string }) {
  const { sessionId } = useContext(GeneralContext);

  const shareUrl = useMemo(() => {
    const url = window?.location?.origin;
    return `${url}/?startapp=rs_${sessionId}`;
  }, [sessionId]);

  // const { socials } = useSocialData({ sessionId, wallet_address: sessionId });

  const handleShare = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(shareUrl);
      toast.success("Invite Link copied to clipboard");
      // saveAction(copyName);

      trackEvent("socialFi_copyLink_click", { sessionId });
    } catch {
      toast.error("Copy not supported");
    }
  }, [sessionId, shareUrl]);

  return (
    <div className={cn("flex justify-between gap-2", className)}>
      <Button
        onClick={handleShare}
        className="w-full flex gap-1 items-center justify-center"
      >
        <CopyIcon />
        <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
          COPY LINK
        </span>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]">
            <ShareIcon />
            <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
              SHARE
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <BoxMain className={"flex flex-col items-center gap-4"}>
            <span className="text-[#745061] font-made-tommy text-[16px] font-semibold">
              Share with your friends
            </span>
            <div className="flex gap-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl}>
                <ShareTelegramIcon size={40} round />
              </TelegramShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
          </BoxMain>
        </DialogContent>
      </Dialog>
    </div>
  );
}
