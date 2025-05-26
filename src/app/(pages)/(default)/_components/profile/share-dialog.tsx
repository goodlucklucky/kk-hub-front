"use client";

import React from "react";
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
import useShare from "@/app/_hooks/use-share";

export default function ShareDialog({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { inviteUrl } = useShare();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <BoxMain className={"flex flex-col items-center gap-4"}>
          <span className="text-[#745061] font-made-tommy text-[16px] font-semibold">
            Share with your friends
          </span>
          <div className="flex gap-4">
            <FacebookShareButton url={inviteUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={inviteUrl}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <TelegramShareButton url={inviteUrl}>
              <ShareTelegramIcon size={40} round />
            </TelegramShareButton>
            <WhatsappShareButton url={inviteUrl}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
        </BoxMain>
      </DialogContent>
    </Dialog>
  );
}
