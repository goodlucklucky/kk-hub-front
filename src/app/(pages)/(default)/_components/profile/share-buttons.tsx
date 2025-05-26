"use client";

import React from "react";

import Button from "@/app/_components/shared/button";
import { ShareIcon } from "@/app/_assets/svg/share";
import { InviteCopyIcon } from "@/app/_assets/svg/copy";
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
import ShareDialog from "./share-dialog";
import useShare from "@/app/_hooks/use-share";

export default function ShareButtons({ className }: { className?: string }) {
  const { handleCopy } = useShare();

  return (
    <div className={cn("flex justify-between gap-2", className)}>
      <Button
        onClick={handleCopy}
        className="w-full flex gap-1 items-center justify-center"
      >
        <CopyIcon />
        <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
          COPY LINK
        </span>
      </Button>
      <ShareDialog>
        <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]">
          <ShareIcon />
          <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
            SHARE
          </span>
        </Button>
      </ShareDialog>
    </div>
  );
}
