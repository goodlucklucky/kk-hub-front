'use client';

//import modules
import Image from "next/image";
import { useState } from "react";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";
import cosmetic from '@assets/images/cosmetics.png';

//import icons
import { CheckIcon } from "@assets/svg/check";
import { DollarScoreIcon } from "@/app/_assets/svg/dollar";
import coinbase from "@assets/svg/coinbase.svg";
import metamask from "@assets/svg/metamask.svg";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { CloseIcon } from "@/app/_assets/svg/close";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { FalseIcon } from "@/app/_assets/svg/false";

import AvalancheIcon from "@assets/images/powered-avalanche.png";
import SpinnerIcon from "@assets/images/spinner.svg";

//interface
interface SkinDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type DialogState = 'initial' | 'confirm' | 'wallet' | 'payment' | 'success' | 'error' | 'loading';

const SkinDialog = ({ isOpen, onClose }: SkinDialogProps) => {
  const [dialogState, setDialogState] = useState<DialogState>('initial');

  const handleBuy = () => {
    setDialogState('confirm');
  };

  const handlePay = () => {
    setDialogState('wallet');
  };

  const handleConnectWallet = () => {
    setDialogState('payment');
  };

  const handleConfirmPayment = () => {
    setDialogState('loading');
    setTimeout(() => {
      setDialogState('success');
    }, 4000);
  };

  const renderDialogContent = () => {
    switch (dialogState) {
      case 'initial':
        return (
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon  onClick={onClose}/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[#491F36] text-bumper-sticker text-[22px] pt-2 pb-4 font-bold leading-normal">
                CUSTOM SKINS
              </span>
            </div>
            <div className="bg-[#EED1B8] rounded-[22px] p-3 px-1 overflow-y-auto flex flex-col gap-y-1 justify-center items-center">
              <div className="w-35 h-40 rounded-[6px] border border-white bg-gradient-to-br from-[rgba(255,248,183,0.75)] to-[rgba(246,237,197,0.75)] p-[15px] rotate-[8deg]">
                <Image src={cosmetic} alt="cosmetic" width={120} height={120} />
              </div>
              <span className="text-[#5F3F57] text-made-tommy text-[22px] font-bold leading-normal pt-4">
                Slug
              </span>
              <span className="text-[#745061] text-made-tommy text-[16px] font-bold leading-normal text-center">
                Change the look of your Snake with a custom Skin!
              </span>
              <div className="bg-[#E3BEAA] rounded-[14px] p-2 w-full flex flex-col gap-y-2">
                <Button
                  className="rounded-[6px] border border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 w-full flex flex-col"
                  onClick={handleBuy}
                >
                  <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[20px]/[20px] font-extrabold leading-normal tracking-[0.4px]">Buy</span>
                </Button>
                <span className="text-[#5F3F57] text-made-tommy text-[16px] font-bold leading-normal text-center">$2.99</span>
              </div>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <>
            <div className="bg-[#F5D6B1] rounded-t-2xl py-4 px-2 shadow-md border-2 border-[#A96415] flex flex-col">
              <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
                <CloseIcon />
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-[#491F36] text-bumper-sticker text-[22px] pt-2 pb-4 font-bold leading-normal">
                  CONFIRM PURCHASE
                </span>
              </div>
              <div className="px-2 flex flex-col gap-y-2">
                <div>
                  <div className="bg-[#E3BEAA] rounded-t-[22px] p-2 w-full flex flex-col gap-y-1">
                    <span className="text-[#6C4C5F] text-made-tommy text-[16px] font-bold leading-normal text-center">
                      Confirm: Buy an Item
                    </span>
                    <div className="flex justify-center items-center gap-x-2 font-made-tommy text-[#5F3F57] text-[22px] font-bold leading-normal">
                      <DollarScoreIcon />
                      2.99
                    </div>
                  </div>
                  <div className="bg-[#5F3F57] rounded-b-[22px] p-1 w-full flex flex-col gap-y-1">
                    <span className="text-[#E3BEAA] text-made-tommy text-[16px] font-bold leading-normal text-center">
                      SLUG SKIN
                    </span>
                  </div>
                </div>
                <Button
                  className="rounded-[10px] border w-[80%] mx-auto border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 flex flex-col"
                  onClick={handlePay}
                >
                  <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px]/[18px] font-extrabold leading-normal tracking-[0.4px]">PAY</span>
                </Button>
              </div>
            </div>
            <div className="bg-[#F5D6B1] rounded-b-2xl py-2.5 shadow-md border-2 border-[#A96415] border-t-1 border-t-[#A96415] flex -mt-4 gap-x-2 px-4 pb-6">
              <Button
                className="rounded-[6px] border border-[#CDEBEE] bg-gradient-to-b from-[#A291FF] to-[#856FFF] p-2 py-1 flex flex-col w-full"
                onClick={() => setDialogState('wallet')}
              >
                <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[16px]/[16px] font-extrabold leading-normal tracking-[0.4px]">DEPOSIT FUNDS</span>
              </Button>
              <Button
                className="rounded-[6px] border border-[#CDEBEE] bg-gradient-to-b from-[#A291FF] to-[#856FFF] p-2 py-1 flex flex-col w-full"
                onClick={() => setDialogState('payment')}
              >
                <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[16px]/[16px] font-extrabold leading-normal tracking-[0.4px]">PAY DIRECTLY</span>
              </Button>
            </div>
          </>
        );

      case 'wallet':
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-2 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-2">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[#491F36] text-bumper-sticker text-[22px] pt-2 pb-4 font-bold leading-normal flex gap-2 items-center">
                <WalletIcon color="#5F3F57" />
                CONNECT WALLET
              </span>
            </div>
            <div className="flex gap-1.5 bg-[#7A5B6940] rounded-[5px] p-0.5 px-1 shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] w-30 h-14 items-center justify-around">
              <Image src={coinbase} alt="wallet" width={44} height={44} />
              <Image src={metamask} alt="wallet" width={44} height={44} />
            </div>
            <Button
              className="rounded-[10px] border w-[60%] mx-auto border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 mb-2 flex flex-col"
              onClick={handleConnectWallet}
            >
              <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px]/[18px] font-extrabold leading-normal tracking-[0.4px]">Connect</span>
            </Button>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[#491F36] text-bumper-sticker text-[22px] pt-2 font-bold leading-normal flex gap-2 items-center">
                PAY DIRECTLY
              </span>
            </div>
            <div className="flex flex-col items-center gap-x-1 gap-y-2 bg-[#E3BEAA] w-full rounded-[17px] p-2">
              <div className="flex justify-between w-full gap-x-1">
                <div className="flex bg-[#C7A797] w-full rounded-[17px] p-2 items-center gap-x-1">
                  <WalletIcon />
                  <div className="w-1 h-1 p-1 bg-[#126529] rounded-full" />
                  <div className="flex justify-between items-center w-full text-[#5F3F57] text-bumper-sticker text-[16px] font-bold leading-normal">
                    <span>CONNECTED</span>
                    <span className="text-made-tommy text-[12px] font-bold leading-normal">0x10dx...5eab</span>
                  </div>
                </div>
                <CloseSocialIcon className="w-10 h-10" />
              </div>
              <div className="">
                <span className="text-[#745061] text-bumper-sticker text-2xl font-bold leading-normal">$2.99</span>
              </div>
            </div>
            <Button
              className="rounded-[10px] border w-full mx-auto border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 flex items-center justify-center gap-x-1"
              onClick={handleConfirmPayment}
            >
              <CheckIcon color={"#ffffff"} className="w-3.5" />
              <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px]/[18px] font-extrabold leading-normal tracking-[0.4px]">Confirm Payment</span>
            </Button>
            <span className="font-made-tommy text-[10px] font-bold text-[#5F3F57BF]">
              Accepted coins (Avalanche C-Chain): USDC, USDT
            </span>
          </div>
        );
      case 'success':
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
            <div className="w-full flex justify-center items-center gap-1">
              <CheckIcon className="h-5 w-4" />
              <span className="text-[#745061] text-center font-bumper-sticker text-[18px]/[20px] font-bold leading-normal">SUCCESS!</span>
            </div>
            <Button
              className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold"
              onClick={onClose}
            >
              {"Let's Go!"}
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
            <div className="w-full flex justify-center items-center gap-1">
              <FalseIcon className="h-[20px] w-[20px]" />
              <span className="text-[#745061] text-center font-bumper-sticker text-[18px]/[20px] font-bold leading-normal">SOMETHING WENT WRONG</span>
            </div>
            <Button
              className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold"
              onClick={onClose}
            >
              {"Let's Go!"}
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 flex justify-center items-center w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ">
          {
            dialogState === 'loading' ?
              <>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    priority
                    src={SpinnerIcon}
                    width={116}
                    alt="spinner-icon"
                    className="animate-[spin_1.5s_linear_infinite] h-[116px] w-[116px]"
                  />
                  <div className="py-6">
                    <p className="text-white text-center font-made-tommy text-[20px] font-extrabold leading-normal">
                      Minting in progress...
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center absolute bottom-20">
                  <Image src={AvalancheIcon} alt="powered-avalanche" className="absolute bottom-0" width={145} height={116} />
                </div>
              </> :
              <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
                {renderDialogContent()}
              </div>
          }
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default SkinDialog;