"use client";
import { useRouter } from "next/navigation";
import Header from "../(default)/_components/layout/header";
import UserXp from "../(default)/_components/xp";
import { GiftSlide } from "../(default)/_components/gifts/slides";
import Button from "@/app/_components/shared/button";
import { MsgIcon, QuestionMarkIcon } from "@/app/_assets/svg/template";
import { useApp } from "@/app/_contexts/appContext";
import { PlusIcon } from "@/app/_assets/svg/plus";
import ButtonSlot from "@assets/images/single-button-slot.png";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/_lib/utils";
import { ChessIcon } from "@/app/_assets/svg/etc";
import ChessStopWatchIcon from "@assets/svg/chess-stopwatch.svg";
import Footer from "../(default)/_components/layout/footer";

export default function ChessPage() {
  const router = useRouter();
  const { isChatOpen, setIsChatOpen } = useApp();
  return (
    <div className="w-screen h-screen bg-[url(/images/chess_homepage_background.png)] bg-center bg-no-repeat bg-[length:122%_100%] pt-4 px-">
      <Header />
      <div className="mt-3 bg-white/20 pl-2">
        <UserXp />
      </div>
      <div className="px-8 mb-20">
        <GiftSlide type="daily" onClick={() => router.push("/claim")} />
      </div>
      <div className="absolute -right-1 p-[2px] bg-gradient-to-b from-[#FAC485] to-[#8B4B4F] rounded-[19px_0px_0px_19px]">
        <div className="bg-[url(/images/wood-texture.png)] bg-cover bg-center bg-no-repeat rounded-[17px_0px_0px_17px] h-[100px] w-[50px] flex flex-col justify-center items-center">
          <Button className="bg-[url(/images/yellow-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-11 m-1">
            <div className="w-5 h-5">
              <QuestionMarkIcon />
            </div>
          </Button>
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-[url(/images/purple-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-11 m-1"
          >
            <div className="w-5 h-5">
              <MsgIcon />
            </div>
          </Button>
        </div>
      </div>
      <div className=" absolute bottom-5 w-full grid gap-8">
        <div className="rounded-[10px] border border-[#CED0DF] bg-[#B1B5CC] backdrop-blur-[12.5px] flex justify-center items-center h-10 w-[84%] mx-9 gap-x-1 z-10">
          <PlusIcon className="w-5 h-5" />
          <p className="z-10 uppercase text-white text-center font-bumper-sticker text-[18px] font-normal [text-shadow:0px_2px_0px_rgba(0,0,0,0.20)]">
            Add to home screen
          </p>
        </div>
        <div>
          <section className="relative rounded-3xl p-1 mt-auto mx-3 mb-10">
            <Link href={"/home"}>
              <Image
                src={ButtonSlot}
                alt="button-slot"
                width={800}
                height={100}
                className="absolute inset-0 z-0 -top-3 h-[80px]"
                priority
              />
              <Button
                className={cn(
                  " bg-[url(/images/bg-chess-button.png)] bg-no-repeat bg-center flex gap-2 items-center justify-center rounded-2xl font-bold w-[91%] mx-auto p-2"
                )}
              >
                <ChessIcon />
                <span className="drop-shadow-md font-bumper-sticker font-bold text-[20px] leading-none">
                  Play Chess Now
                </span>
              </Button>
            </Link>
          </section>
          <div className="flex justify-center items-center -mt-3">
            <Button className=" bg-[#EED1B8] rounded-3xl w-[60%] h-8 flex items-center justify-center gap-2">
              <Image src={ChessStopWatchIcon} alt="chess-stopwatch" />
              <span className=" text-[#5F3F57] font-made-tommy text-[18px] text-center">
                MODES
              </span>
            </Button>
          </div>
        </div>
        <Footer footerCategory="game" />
      </div>
    </div>
  );
}
