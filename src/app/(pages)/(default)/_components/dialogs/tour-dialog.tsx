"use client";

//import modules
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

//import components
import { Dialog, DialogPortal } from "@/app/_components/ui/dialog";

//import assets
import green_dollar_circle from "@assets/svg/green-dollar-circle.svg";
import brown_dollar_circle from "@assets/svg/brown-dollar-circle.svg";
import { CloseIcon } from "@/app/_assets/svg/close";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import Button from "@/app/_components/shared/button";
import coinbase from "@assets/svg/coinbase.svg";
import metamask from "@assets/svg/metamask.svg";
import usdc from "@assets/svg/usdc-brown.svg";
import usdt from "@assets/svg/usdt-brown.svg";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { CheckIcon } from "@/app/_assets/svg/check";

//interface
interface TourDialogProps {
  isOpen: boolean;
  onClose: (e: any, payData: any) => void;
}

const TourDialog = ({ isOpen, onClose }: TourDialogProps) => {
  const [state, setState] = useState(0); // 0: start, 1: low, 2: connect wallet, 3: pay entry
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handlePlay = useCallback(() => {
    setState(1);
  }, []);

  const handlePayDirectly = useCallback(() => {
    setState(2);
  }, []);

  const handleConnect = useCallback(() => {
    setState(3);
  }, []);

  const handlePay = useCallback(() => {
    setState(0);
    onClose(null, true);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setState(0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onClose(null, open)}>
      <DialogPortal>
        <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-20" />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon onClick={(e) => onClose(e, false)} />
            </div>
            <div className="bg-[#F5D6B1] rounded-2xl p-5 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto gap-y-3">
              {state < 2 && (
                <div className="flex justify-center items-center gap-1.5">
                  <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
                    Ready to Win
                  </div>
                  <Image src={green_dollar_circle} alt="green_dollar_circle" />
                  <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
                    ?
                  </div>
                </div>
              )}
              {state == 2 && (
                <>
                  <div className="flex justify-center items-center gap-1.5">
                    <WalletIcon width={26} color="#5F3F57" />
                    <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
                      Connect Wallet
                    </div>
                  </div>
                  <div className="rounded-[5px] bg-[#7A5B6940] drop-shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] p-2 mx-auto flex gap-3 mb-3">
                    <Image src={metamask} alt="wallet" width={44} height={44} />
                    <Image
                      src={coinbase}
                      alt="wallet"
                      width={60}
                      height={50}
                      className="-mx-2"
                    />
                  </div>
                  <Button
                    className="rounded-[10px] w-[200px] h-[34px] mb-2 border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] mx-auto"
                    onClick={handleConnect}
                  >
                    <div className="text-[#EEFDF4] text-center font-made-tommy text-[18px] xs:text-[20px] tracking-[0.18px] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-bold">
                      Connect
                    </div>
                  </Button>
                </>
              )}
              {state == 3 && (
                <>
                  <div className="flex justify-center items-center gap-1.5">
                    <div className="text-[#5F3F57] text-center font-bumper-sticker text-[26px]">
                      Pay Entry
                    </div>
                  </div>
                  <div className="w-full rounded-[22px] bg-[#E3BEAA] p-2 flex flex-col justify-center gap-y-1">
                    <div className="flex justify-between w-full gap-x-1">
                      <div className="flex bg-[#F5DDC4] w-full rounded-[10px] p-1 px-2 items-center gap-x-1">
                        <WalletIcon />
                        <div className="w-1 h-1 p-1 bg-[#126529] rounded-full" />
                        <div className="flex justify-between items-center w-full text-[#5F3F57] font-bumper-sticker text-[16px] font-bold leading-normal">
                          <span>CONNECTED</span>
                          <span className="font-made-tommy text-[12px] font-bold">
                            0x10dx...5eab
                          </span>
                        </div>
                      </div>
                      <CloseSocialIcon className="w-10 h-10" />
                    </div>
                    <div className="flex justify-center items-center gap-x-2">
                      <div className="text-[#745061] text-center font-made-tommy text-[24px] font-bold">
                        0.25
                      </div>
                      <div className="flex flex-col gap-y-3 relative h-full overflow-y-visible z-20">
                        {isDropDownOpen && (
                          <>
                            <div className="absolute rounded-[20px_20px_10px_10px] bg-[#D1B69F] -bottom-13 left-0 right-0 w-full top-0 z-8"></div>
                            <div className="absolute top-11 left-2 right-2 flex items-center gap-1 rounded-[20px] border border-[#917377] bg-[#EED1B8] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] px-3 py-2 z-9">
                              <Image
                                src={usdt}
                                alt="usdt"
                                width={20}
                                height={20}
                                className="z-10"
                              />
                              <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">
                                USDT
                              </span>
                            </div>
                          </>
                        )}
                        <div
                          className={cn(
                            "flex flex-col items-center justify-between rounded-[20px] border border-[rgba(145,115,119,0.50)] bg-[#F5DDC4] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] p-1 text-sm text-[#745061] z-10"
                          )}
                          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                        >
                          <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7 z-10">
                            <Image
                              src={usdc}
                              alt="usdc"
                              width={20}
                              height={20}
                            />
                            <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">
                              USDC
                            </span>
                            <RightArrow
                              className="w-4 h-4 rotate-90"
                              color="#917377"
                              shadow={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="flex items-center justify-center gap-x-1 rounded-[10px] w-full h-[34px] mb-2 border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]"
                    onClick={handlePay}
                  >
                    <CheckIcon color="#fff" className="w-4 h-4 -mt-1" />
                    <p className="text-[#EEFDF4] text-center font-made-tommy text-[18px] xs:text-[20px] tracking-[0.18px] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-bold">
                      Confirm Payment
                    </p>
                  </Button>
                  <p className="text-[rgba(95,63,87,0.75)] text-center font-made-tommy text-[10px] font-bold leading-[15px]">
                    Accepted coins (Avalanche C-Chain): USDC, USDT
                  </p>
                </>
              )}
              {state < 2 && (
                <div className="w-full rounded-[22px] bg-[#E3BEAA] py-1 flex flex-col justify-center gap-y-1">
                  <p className="text-[#6C4C5F] text-center font-made-tommy text-[16px] font-bold">
                    Confirm: Tournament Entry Fee
                  </p>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={brown_dollar_circle}
                      alt="brown_dollar_circle"
                    />
                    <div className="text-[#5F3F57] text-center font-made-tommy text-[24px] font-bold">
                      0.25
                    </div>
                  </div>
                  <hr className="border-[rgba(138,105,114,0.20)] border-1" />
                  <p className="text-[rgba(95,63,87,0.75)] leading-[28px] text-center font-bumper-sticker text-[10px]">
                    One payment – unlimited attempts!
                  </p>
                </div>
              )}
              {state == 0 ? (
                <Button
                  className="rounded-[10px] h-[34px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] mx-5"
                  onClick={handlePlay}
                >
                  <div className="text-[#EEFDF4] text-center font-bumper-sticker text-[18px] xs:text-[20px] tracking-[0.18px] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-normal">
                    Play Now!
                  </div>
                </Button>
              ) : state == 1 ? (
                <div className="rounded-[10px] bg-[#E99F8C] mx-5">
                  <div className="text-[#853834] text-center leading-[34px] font-made-tommy text-[12px] xs:text-[14px] font-bold">
                    Low on funds? Deposit and keep winning!
                  </div>
                </div>
              ) : null}

              {state < 2 && (
                <>
                  <hr className="border-[#A96415] border-1 -mx-5 mt-2" />
                  <div className="flex gap-2 justify-between">
                    <Button className="w-full flex flex-1 gap-1 items-center justify-center h-[28px] rounded-[6px]">
                      <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] uppercase">
                        Deposit funds
                      </span>
                    </Button>
                    <Button
                      className="w-full flex flex-1 gap-1 items-center justify-center h-[28px] rounded-[6px]"
                      onClick={handlePayDirectly}
                    >
                      <WalletIcon width={12} color="#FFF" />
                      <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] uppercase">
                        Pay Directly
                      </span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default TourDialog;
