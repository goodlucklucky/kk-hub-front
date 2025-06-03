"use client";

import Image from "next/image";

import Button from "@/app/_components/shared/button";

import { TelegramIcon } from "@/app/_assets/svg/telegram";
import { MailIcon } from "@/app/_assets/svg/mail";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { XIcon } from "@/app/_assets/svg/x";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { DollarIcon } from "@/app/_assets/svg/dollar";

import coinbase from "@assets/svg/coinbase.svg";
import metamask from "@assets/svg/metamask.svg";
import { useContext, useMemo } from "react";
import { GeneralContext } from "@/app/_providers/generalProvider";
import ShareButtons from "./share-buttons";
import {
  createWallet,
  linkProfile,
  Profile,
  unlinkProfile,
} from "thirdweb/wallets";
import { client } from "@/app/_utils/thirdWebClient";
import { avalanche } from "thirdweb/chains";
import { useProfiles } from "thirdweb/react";
import { cn } from "@/app/_lib/utils";
import { useCallback } from "react";
import { formatAddress, formatNumber } from "@/app/_utils/number";
import { useUpdateUser } from "../../../../../../services/user";
import { useThirdweb } from "../../_context/thirdwebContext";

const spanClassName =
  "text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px] break-all line-clamp-1";
const iconSize = "min-w-5 min-h-5";

export default function Social() {
  const { user, sessionId, setUser } = useContext(GeneralContext);
  const { data: profiles, refetch } = useProfiles({ client });
  const { mutateAsync: updateUser } = useUpdateUser();
  const {
    balance: { total },
  } = useThirdweb();

  const telegram = useMemo(
    () => profiles?.find((p) => p?.type == "telegram"),
    [profiles]
  );
  const twitter = useMemo(
    () => profiles?.find((p) => p?.type == "x"),
    [profiles]
  );
  const email = useMemo(
    () => profiles?.find((p) => p?.type == "email"),
    [profiles]
  );
  const google = useMemo(
    () => profiles?.find((p) => p?.type == "google"),
    [profiles]
  );
  const metamaskWallet = useMemo(
    () => profiles?.find((p) => p?.type == ("siwe" as "wallet")),
    [profiles]
  );

  const linkOtherProfiles = useCallback(
    async (provider: "telegram" | "x" | "google") => {
      try {
        await linkProfile({
          client: client,
          strategy: provider,
        });
        await refetch?.();

        const newProfile = profiles?.find((p) => p?.type == provider)?.details;

        if (provider == "telegram" && newProfile) {
          updateUser({
            sessionId,
            body: {
              telegramUserId: newProfile?.id,
              telegramUsername: newProfile?.["username" as "id"],
            },
          });
          setUser?.({
            telegramUserId: newProfile?.id,
            telegramUsername: newProfile?.["username" as "id"],
          });
        }
        // console.log("result", result);
      } catch {
        // error
      }
    },
    [refetch, profiles, sessionId, setUser, updateUser]
  );

  const unlinkOtherProfiles = useCallback(
    async (profileToUnlink: Profile) => {
      try {
        await unlinkProfile({
          client: client,
          profileToUnlink,
        });
        await refetch?.();
      } catch {
        // error
      }
    },
    [refetch]
  );

  const linkMetamask = useCallback(async () => {
    // link any external wallet
    await linkProfile({
      client: client,
      strategy: "wallet",
      wallet: createWallet("io.metamask"),
      chain: avalanche,
    });
  }, []);

  // useEffect(() => {
  //   console.log(profiles);
  // }, [profiles]);

  return (
    <div className="bg-[#E3BEAA] rounded-[7px] p-2 flex flex-col gap-2 h-full">
      <p className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2 -mb-2">
        Connect
      </p>
      <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5">
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <TelegramIcon className={cn(iconSize)} />
          {telegram ? (
            <div className="flex gap-2 items-center">
              <span className={spanClassName}>
                @{telegram?.["details"]?.["username" as "email"]}
              </span>
              <CloseSocialIcon onClick={() => unlinkOtherProfiles(telegram)} />
            </div>
          ) : (
            <Button
              onClick={() => linkOtherProfiles("telegram")}
              className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm"
            >
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <XIcon className={cn(iconSize)} />
          {twitter ? (
            <div className="flex gap-2 items-center">
              <span className={spanClassName}>
                @{twitter?.["details"]?.["username" as "email"]}
              </span>
              <CloseSocialIcon onClick={() => unlinkOtherProfiles(twitter)} />
            </div>
          ) : (
            <Button
              onClick={() => linkOtherProfiles("x")}
              className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm"
            >
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <MailIcon className={cn(iconSize)} />
          {user?.email || email || google ? (
            <div className="flex gap-2 items-center">
              <span className={spanClassName}>
                {user?.email || email?.details.email || google?.details.email}
              </span>
              <CloseSocialIcon
                onClick={() => {
                  if (email) unlinkOtherProfiles(email);
                  if (google) unlinkOtherProfiles(google);
                }}
              />
            </div>
          ) : (
            <Button
              onClick={() => linkOtherProfiles("google")}
              className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm"
            >
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between">
          <WalletIcon className={cn(iconSize)} />
          {metamaskWallet ? (
            <div className="flex gap-2 items-center">
              <span className={spanClassName}>
                {formatAddress(metamaskWallet?.details?.address)}
              </span>
              <CloseSocialIcon
                onClick={() => unlinkOtherProfiles(metamaskWallet)}
              />
            </div>
          ) : (
            <>
              <div className="flex gap-1.5 bg-[#7A5B6940] rounded-[5px] p-0.5 px-1 mr-auto">
                <Image src={coinbase} alt="wallet" />
                <Image src={metamask} alt="wallet" />
              </div>
              <Button
                onClick={linkMetamask}
                className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm"
              >
                <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                  Connect
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
      <p className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2 -mb-2">
        REFERRALS
      </p>
      <ShareButtons />
      <span className="text-[#745061] font-made-tommy text-[14px] leading-[16px] font-semibold pl-1 mt-1">
        Receive 5% of all the volume fees your friends generate - forever!
      </span>
      <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5 mt-1">
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <span className="text-[#653F56] font-made-tommy text-[18px] font-semibold tracking-[0.14px]">
            Friends Invited
          </span>
          <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1">
            <span className="text-[#FFE4D4] font-made-tommy text-[18px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
              {user?.referrals?.length || 0}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <span className="text-[#653F56] font-made-tommy text-[18px] leading-[28px] font-semibold tracking-[0.14px]">
            Revenue Share
          </span>
          <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1 gap-1">
            <DollarIcon />
            <span className="text-[#FFE4D4] font-made-tommy text-[18px] leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
              {formatNumber(total || 0, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
