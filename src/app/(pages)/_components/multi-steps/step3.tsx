import { KeyIcon, PlayIcon, UsdIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import poweredAvalanche from "@assets/images/powered-avalanche.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/shared/button";
import headerBoard from "@assets/images/header-board.png";
import panelHome from "@assets/images/panel-home.png";
import ButtonSlot from "@assets/images/single-button-slot.png";
import { ArrowLeftIcon, EyeIcon } from "@assets/svg/etc";
import { useRouter } from "next/navigation";

export function Step3Top() {
  return (
    <div>
      <section className="relative z-20">
          <Image src={headerBoard} alt="panel-holder" width={338} height={103} className="absolute left-1/2 -translate-x-1/2 -translate-y-3 bg-contain bg-no-repeat bg-center" priority/>
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
      <section className="relative w-[95vw] mx-auto">
        <Image src={panelHome} alt="panel-home" className="absolute -top-[20px] 2xs:-top-[25px] left-1/2 -translate-x-1/2 bg-contain bg-no-repeat bg-center w-full h-[calc(100%_+_40px)] 2xs:h-[calc(100%_+_55px)]" priority/>
        <div className="text-golden-bright px-6 2xs:px 8 sm:px-10 md:px-12 lg:px-20 relative font-bold">
          <div className="flex items-center justify-center gap-2 -mt-2">
            <EyeIcon className="text-grape"/>
            <h3 className="text-center text-grape text-xl">Live Overview</h3>
          </div>
          <div className="bg-light w-full rounded-b-2xl rounded-t p-0.5 contain-content mx-auto 2xs:mt-1.5">
            <div className="w-full rounded-b-2xl rounded-t-sm contain-content text-center bg-golden-bright text-golden-dark">
              <div className="bg-golden-dark/15 2xs:py-4">
                <p className="flex gap-2 items-center justify-center text-lg font-bold">
                  <UsdIcon className="size-6" />
                  <span>101,039.03</span>
                </p>
                <p className="font-semibold">Total Prizes</p>
              </div>
              <div className="2xs:py-4">
                <p className="flex gap-2 items-center justify-center text-lg font-bold">
                  <PlayIcon className="size-5" />
                  <span>757,493</span>
                </p>
                <p className="font-semibold">Games Played</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Step3Bottom() {
  const router = useRouter();

  return (
    <>
      <Image
        src={poweredAvalanche}
        alt="Powered by Avalanche"
        className="mx-auto w-1/3 my-2 -mt-5"
      />
      <p
        className={cn(
          "m-4 mt-auto mx-8 text-green-light bg-black/60 rounded-2xl p-2 px-4",
          "flex gap-4 items-center font-bumper-sticker text-left text-[18px] drop-shadow-md"
        )}
        onClick={() => {
          router.push("/?open1=1");
        }}
      >
        <ArrowLeftIcon className="size-14" />
        <span>Return to THE Wheel and Spin for a free gift!</span>
      </p>
      <section className="relative rounded-3xl p-1 mt-auto mx-8 mb-10">
      <Link href={"/home"}>
        <Image src={ButtonSlot} alt="button-slot" width={800} height={100} className="absolute inset-0 z-0 -top-3 h-[80px]" priority/>
        <Button
          className={cn(
            "flex gap-2 items-center justify-center rounded-2xl font-bold w-[91%] mx-auto p-2"
          )}
          >
          <KeyIcon />
          <span className="drop-shadow-md font-made-tommy font-bold text-[20px] leading-none">Enter Now</span>
        </Button>
      </Link>
      </section>
    </>
  );
}
