"use client";

// import modules
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import toast, { LoaderIcon } from "react-hot-toast";

// import components
import { Dialog, DialogPortal } from "@/app/_components/ui/dialog";
import NavigationButton from "@/app/(pages)/(default)/_components/profile/navigateBtn";
import Button from "@/app/_components/shared/button";

// import providers

// import assets
import { CloseIcon } from "@/app/_assets/svg/close";

// import utils
import { cn } from "@/app/_lib/utils";

// import assets
import profile from "@assets/images/profile.svg";
import edit from "@assets/svg/edit.svg";
import rightArrow from "@assets/svg/right-arrow.svg";
import topup from "@assets/svg/topup.svg";
import topupwhite from "@assets/svg/topup-white.svg";
import social from "@assets/svg/social.svg";
import socialClick from "@assets/svg/social-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
import inventory from "@assets/svg/inventory.svg";
import inventoryClick from "@assets/svg/inventory-click.svg";

import { useGeneral } from "@/app/_providers/generalProvider";
import { useApp } from "@/app/_contexts/appContext";
import Inventory from "./Inventory";
import Social from "../../profile/social";
import ScoresSection from "./Scores";
import { useEditUser } from "@/../services/user";
import { useUserContext } from "@/app/_providers/userProvider";

//interface
interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDialog = ({ isOpen, onClose }: ProfileDialogProps) => {
  const [activeComponent, setActiveComponent] = useState("social");
  const [username, setUsername] = useState("KOKOMON118");
  const { setIsBankingOpen, setIsProfileOpen, setIsXpOpen } = useApp();
  const { user, userXp, isLoadingUserXp, sessionId, setUser } = useGeneral();
  const { mutateAsync: editUser } = useEditUser();
  const { refetch: refetchUser } = useUserContext();

  const handleUsernameEdit = useCallback(() => {
    const input = document.querySelector(".username-input") as HTMLInputElement;
    if (input) {
      input.readOnly = false;
      input.focus();
    }
  }, []);

  const handleUsernameSave = useCallback(async () => {
    try {
      const input = document.querySelector(
        ".username-input"
      ) as HTMLInputElement;

      if (!input) return;

      input.readOnly = true;
      const value = input?.value;

      if (value == sessionId) {
        toast.error("Something went wrong");
        setUsername(user?.username || "");
        return;
      }

      await editUser({ id: sessionId, body: { username: value } });
      setUser?.((p) => ({ ...(p || {}), username: value }));
    } catch {
      // console.log(error);
    }
  }, [editUser, sessionId, setUser]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleUsernameSave();
    },
    [handleUsernameSave]
  );

  useEffect(() => {
    if (user?.username) setUsername(user.username);
  }, [user?.username]);

  useEffect(() => {
    if (!user?.username || sessionId == user?.username) {
      const random = Math.floor(Math.random() * 1000);
      setUsername(`KOKOMON${random}`);

      editUser({ id: sessionId, body: { username: `KOKOMON${random}` } });
      refetchUser?.();
    }
  }, [sessionId, user?.username, refetchUser, editUser]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return <Social />;
      case "scores":
        return <ScoresSection />;
      case "inventory":
        return <Inventory />;
      default:
        return <Social />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-10" />

        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="bg-[url(/images/board_2.png)] flex flex-col gap-1 bg-cover bg-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-h-[95%] z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon onClick={onClose} />
            </div>
            <div className="flex justify-between items-center gap-x-2 bg-[#F5D6B1] rounded-2xl p-2 shadow-md border-2 border-[#A96415]">
              <Image
                alt="profile-image"
                src={profile}
                className=" w-[70px] h-[70px]"
              />
              <div className="flex-1">
                <div className="bg-[#D9B8A3] flex justify-between items-center rounded-md w-full p-0.5 border-[2px] border-[#CDAA98] gap-1">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={handleUsernameSave}
                    onKeyDown={handleKeyPress}
                    className="username-input text-[#5F3F57] font-made-tommy font-[800] text-[15px] pl-1 flex-1 bg-transparent outline-none"
                    readOnly
                  />
                  <div
                    className="bg-[#917377] w-[24px] h-[24px] p-[3.7px] rounded-[0px_3px_3px_0px] cursor-pointer"
                    onClick={handleUsernameEdit}
                  >
                    <Image alt="edit-icon" src={edit} />
                  </div>
                </div>
                <div className="border-2 border-[#CDAA98] bg-[#D9B8A3] flex rounded-md w-full p-0.5 mt-1.5">
                  <div className="flex gap-1.5 items-center px-1 border-r-2 border-[#CDAA98]">
                    <p className=" text-[#917377] text-[15px] font-made-tommy font-semibold">
                      Level
                    </p>
                    <p className="text-[#D9B8A3] bg-[#5F3F57] rounded-md h-fit text-sm font-semibold font-made-tommy px-1.5">
                      {isLoadingUserXp ? (
                        <LoaderIcon className="size-5" />
                      ) : (
                        <>{userXp?.level?.name || 1}</>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between flex-1 items-center">
                    <div className="flex gap-1.5 items-center px-2">
                      <p className=" text-[#917377] text-[15px] font-made-tommy font-semibold">
                        Rank
                      </p>
                      <p className="text-[#D9B8A3] bg-[#5F3F57] rounded-md h-fit text-sm font-semibold font-made-tommy px-1.5">
                        {isLoadingUserXp ? (
                          <LoaderIcon className="size-5" />
                        ) : (
                          <>{userXp?.level?.order || "-"}</>
                        )}
                      </p>
                    </div>
                    <div
                      className="bg-[#917377] w-[24px] h-[24px] rounded-[0px_3px_3px_0px] flex items-center justify-center"
                      onClick={() => {
                        setIsXpOpen(true);
                        setIsProfileOpen(false);
                      }}
                    >
                      <Image alt="right-icon" src={rightArrow} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-[9px] pt-1 pb-2 bg-[#F5D6B1] rounded-2xl shadow-md border-2 border-[#A96415]">
              <div className="flex justify-center gap-1 items-center ">
                <Image src={topup} alt="top-up" className=" h-4 w-5" />
                <p className=" text-[#917377] text-[13px] font-made-tommy font-bold tracking-[0.16px]">
                  Top up your wallet for more fun!
                </p>
              </div>
              <Button
                onClick={() => {
                  setActiveComponent("social");
                  setIsBankingOpen(true);
                  setIsProfileOpen(false);
                }}
                className={cn(
                  "flex gap-1 items-center justify-center rounded-md font-bold w-full py-[2px]"
                )}
              >
                <Image src={topupwhite} alt="top-up" className=" h-4 w-5" />
                <span className="drop-shadow-md text-[16px]">VIEW WALLET</span>
              </Button>
            </div>
            <div className="bg-[#F5D6B1] rounded-2xl p-2 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto">
              <div className="flex justify-center gap-1.5">
                <NavigationButton
                  icon={activeComponent === "social" ? socialClick : social}
                  label="Social"
                  isActive={activeComponent === "social"}
                  onClick={() => setActiveComponent("social")}
                />
                <NavigationButton
                  icon={
                    activeComponent === "scores" ? starscoreClick : starscore
                  }
                  label="Scores"
                  isActive={activeComponent === "scores"}
                  onClick={() => setActiveComponent("scores")}
                />
                <NavigationButton
                  icon={
                    activeComponent === "inventory" ? inventoryClick : inventory
                  }
                  label="Inventory"
                  isActive={activeComponent === "inventory"}
                  onClick={() => setActiveComponent("inventory")}
                />
              </div>
              <div className="mt-2 flex flex-1 overflow-y-auto">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default ProfileDialog;
