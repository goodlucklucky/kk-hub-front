import { KeyIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import poweredAvalanche from "@assets/images/powered-avalanche.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/shared/button";
import headerBoard from "@assets/images/header-board.png";
import panelHome from "@assets/images/panel-home.png";
import ButtonSlot from "@assets/images/single-button-slot.png";
import { ArrowLeftIcon } from "@assets/svg/etc";
import LivePreview from "../etc/live-preview";

export function Step3Top() {
  return (
    <div>
      <section className="relative z-20">
        <Image
          src={headerBoard}
          alt="panel-holder"
          width={338}
          height={103}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-3 bg-contain bg-no-repeat bg-center"
          priority
        />
        <h2
          className={cn(
            "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
            "mb-8 text-2xl text-center font-bumper-sticker"
          )}
        >
          <small>TENS OF GAMES</small>
          <br />
          <span>MILLIONS IN PRIZES</span>
        </h2>
      </section>
      <section className="relative">
        <Image
          src={panelHome}
          alt="panel-home"
          width={354}
          height={248}
          className="absolute -top-[30px] left-1/2 -translate-x-1/2 bg-contain bg-no-repeat bg-center"
          priority
        />
        <LivePreview />
      </section>
    </div>
  );
}

export function Step3Bottom() {
  // const router = useRouter();

  return (
    <>
      <Image
        src={poweredAvalanche}
        alt="Powered by Avalanche"
        className="mx-auto w-1/3 my-2 -mt-5"
      />
      <Link
        className={cn(
          "m-4 mt-auto mx-8 text-green-light bg-black/60 rounded-2xl p-2 px-4",
          "flex gap-4 items-center font-bumper-sticker text-left text-[18px] drop-shadow-md"
        )}
        href={"?open1=1"}
        // router?.push(`?open1=${index}`)
      >
        <ArrowLeftIcon className="size-14" />
        <span>Return to THE Wheel and Spin for a free gift!</span>
      </Link>
      <section className="relative rounded-3xl p-1 mt-auto mx-8 mb-10">
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
              "flex gap-2 items-center justify-center rounded-2xl font-bold w-[91%] mx-auto p-2"
            )}
          >
            <KeyIcon />
            <span className="drop-shadow-md font-made-tommy font-bold text-[20px] leading-none">
              Enter Now
            </span>
          </Button>
        </Link>
      </section>
    </>
  );
}
