"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Image1M1Prize from "@/app/_assets/images/1M1-prize.png";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

const ChallengeDialog = () => {
  const [openChanllengeDialog, setOpenChanllengeDialog] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const firstTimeViewed = localStorage.getItem("user.viewed.challenge");
    console.log(firstTimeViewed);
    if (firstTimeViewed !== "true") {
      setOpenChanllengeDialog(true);
      localStorage.setItem("user.viewed.challenge", "true");
    }
  }, []);

  const openStoreBoard = () => {
    router.push("/?modal=daily");
  };

  return (
    <>
      <Dialog
        open={openChanllengeDialog}
        onOpenChange={setOpenChanllengeDialog}
        modal={true}
      >
        <DialogContent
          // size={"md"}
          className="z-[100]"
          containerClassName="w-full flex gap-2 overflow-hidden h-full items-center justify-center"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <div className="text-center">
            <div className="text-center font-extrabold text-[21px] text-[#5F3F57]">
              Want to reach 1M1 and claim your $AVAX prize quicker?
            </div>
            <div className="bg-[#E3BEAA] overflow-none py-4 rounded-3xl flex items-center px-8 my-2 justify-center">
              <Image
                src={Image1M1Prize}
                width={60}
                height={60}
                alt="1m1 prize"
              />
              <div className="text-[14px] text-[#745061] font-medium text-center w-3/5">
                Get your Koko Snake Welcome Pack now!
              </div>
            </div>
            <Button
              className="bg-green px-14 font-extrabold text-white h-8 rounded-xl hover:bg-emerald-500 shadow-[0_0.15rem] shadow-[#2C7C4C]"
              onClick={() => {
                setOpenChanllengeDialog(false);
                openStoreBoard();
              }}
            >
              Go to Store
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeDialog;
