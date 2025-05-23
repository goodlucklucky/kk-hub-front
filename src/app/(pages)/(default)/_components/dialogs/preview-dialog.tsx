"use client";

//import modules
import Image from "next/image";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";

//import assets
import banner from "@assets/images/header-board.png";

//import icons
import { CloseIcon } from "@/app/_assets/svg/close";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";

//interface
interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  link: string;
  image: string | StaticImageData;
  description: string;
  msg: string;
}

const PreviewDialog = ({
  isOpen,
  onClose,
  title,
  link,
  image,
  description,
  msg,
}: PreviewDialogProps) => {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <>
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2.5px]" />
            <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
              <div className="w-full h-16 flex justify-center items-center absolute -top-10">
                <Image
                  src={banner}
                  alt="banner"
                  className={cn(
                    "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto"
                  )}
                />
                <h1 className="text-golden-bright text-center font-bumper-sticker text-[25px] font-normal leading-normal z-20 drop-shadow-[0_0.2ch_var(--color-golden-darker)]">
                  {title}
                </h1>
              </div>
              <div
                className="flex justify-center items-center w-full absolute -bottom-5 right-0"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
              <div className="bg-[#F5D6B1] rounded-2xl p-3 py-6 shadow-md border-2 border-[#A96415] flex-1 flex flex-col items-center overflow-y-auto gap-2">
                <div className="w-full p-2 flex justify-center bg-[#FCEAD0] rounded-[15px]">
                  <Image
                    src={image}
                    alt="preview"
                    width={90}
                    height={90}
                    className="w-[90px] h-[90px] rounded-[5px]"
                  />
                </div>
                <div className="flex flex-col items-center rounded-[15px] bg-[#E3BEAA] w-full p-2">
                  <p className="text-[#653F56] text-center font-made-tommy text-[16px] font-[900] leading-normal tracking-[0.16px] px-3">
                    {description}
                  </p>
                  <p className="text-[#745061] text-center font-made-tommy text-[10px] font-[700] leading-normal">
                    {msg}
                  </p>
                </div>
                <Button
                  className="w-full rounded-[8px] bg-gradient-to-b from-[#A291FF] from-10% to-[#856FFF] to-[201.67%]"
                  onClick={() => {
                    router.push(link);
                  }}
                >
                  <span className="text-[#EFF6FF] text-center font-bumper-sticker text-[20px] font-normal tracking-[0.4px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                    Play Now
                  </span>
                </Button>
                <Button className="px-3 py-0.5 rounded-[7px] border border-[rgba(116,80,97,0.70)] bg-[#E3BEAA] drop-shadow-[0px_1px_0px_rgba(0,0,0,0.70)]">
                  <span className="text-[#745061] text-center font-made-tommy text-[14px] font-[800] leading-normal tracking-[0.28px]">
                    Add to Favourites
                  </span>
                </Button>
              </div>
            </div>
          </>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default PreviewDialog;
