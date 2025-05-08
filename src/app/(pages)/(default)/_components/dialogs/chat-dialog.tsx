'use client';
import Image from "next/image";
//import components
import {
  Dialog,
  DialogPortal,
} from "@/app/_components/ui/dialog";
//import assets
import { EarthIcon } from "@/app/_assets/svg/earth";
import startchat from "@assets/images/star-chat.png";
//import components
import { SendBtnIcon } from "@/app/_assets/svg/sendbtn";
import { DotIcon } from "@/app/_assets/svg/chat";
import { CloseIcon } from "@/app/_assets/svg/close";

//interface
interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDialog = ({ isOpen, onClose, }: ChatDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-10" />
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-h-[90%] z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2">
          <div className="flex justify-between items-center gap-x-3 bg-[#F5D6B1] rounded-2xl p-2 shadow-md border-2 border-[#A96415]">
            <div className="w-full rounded-[5px] border border-[#9C7B8F] bg-[#653F56] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-x-1 relative">
              <EarthIcon />
              <span className="text-[#E3BEAA] text-[16px] font-made-tommy font-semibold">Global Chat</span>
              <span className="absolute -right-1 -top-2 rounded-[20px] bg-[#ED4721] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] text-white text-[12px] font-made-tommy font-semibold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] px-1">
                734
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full absolute -bottom-6 right-0">
            <CloseIcon onClick={onClose} />
          </div>

          <div className="flex flex-col gap-1 px-[9px] py-2 bg-[#F5D6B1] rounded-2xl shadow-md border-2 border-[#A96415] flex-1 overflow-auto">
            <div className="rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.20)_inset] p-1 pt-2 flex flex-col flex-1 gap-y-1 overflow-auto">
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon />
                </div>
                <div className="rounded-[10px] border border-[#C5B3E6] bg-[#F0E6FF] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#653F56] text-[14px]/[14px] font-medium font-made-tommy">
                    writes something smart that takes two lines
                  </div>
                  <div className="absolute -left-0 -top-0.5 bg-[#653F56] rounded-r-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[15px] left-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] right-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -right-[10px]" />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="rounded-[10px] border border-[#804306] bg-[#F9CB88] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#804306] text-[14px]/[15px] font-medium font-made-tommy">
                    and here comes just a very long message that eventually takes up three lines
                  </div>
                  <div className="absolute -right-0 -top-1 bg-[#653F56] rounded-l-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[16px] right-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] left-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -left-[10px]" />
                  </div>
                </div>
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon />
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="rounded-[10px] border border-[#804306] bg-[#F9CB88] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#804306] text-[14px]/[15px] font-medium font-made-tommy">
                    and here comes just a very long message that eventually takes up three lines
                  </div>
                  <div className="absolute -right-0 -top-1 bg-[#653F56] rounded-l-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[16px] right-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] left-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -left-[10px]" />
                  </div>
                </div>
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#653F56] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon color="#E3BEAA" />
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="rounded-[10px] border border-[#804306] bg-[#F9CB88] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#804306] text-[14px]/[15px] font-medium font-made-tommy">
                    and here comes just a very long message that eventually takes up three lines
                  </div>
                  <div className="absolute -right-0 -top-1 bg-[#653F56] rounded-l-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[16px] right-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] left-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -left-[10px]" />
                  </div>
                </div>
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon />
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon />
                </div>
                <div className="rounded-[10px] border border-[#C5B3E6] bg-[#F0E6FF] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#653F56] text-[14px]/[14px] font-medium font-made-tommy">
                    writes something smart that takes two lines
                  </div>
                  <div className="absolute -left-0 -top-0.5 bg-[#653F56] rounded-r-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[15px] left-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] right-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -right-[10px]" />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
                  <DotIcon />
                </div>
                <div className="rounded-[10px] border border-[#C5B3E6] bg-[#F0E6FF] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-1 relative pt-3.5 mt-3">
                  <div className="text-[#653F56] text-[14px]/[14px] font-medium font-made-tommy">
                    writes something smart that takes two lines
                  </div>
                  <div className="absolute -left-0 -top-0.5 bg-[#653F56] rounded-r-[5px] text-[#F0E6FF] p-[1px] px-1.5 flex gap-y-1">
                    <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
                      LECOCONUT:
                    </div>
                    <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1">
                      writes something...
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[15px] left-0 bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    Today, 14:47
                  </div>
                  <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] right-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                    LEBRUN134
                    <Image src={startchat} alt="startchat" className="w-4 h-4 absolute -right-[10px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-1">
              <textarea className="w-full rounded-[5px] border-2 border-[#D2AA87] bg-[##F4F4F0] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] text-[#653F56] text-[16px] font-made-tommy font-semibold px-3 py-2 h-11" rows={1}></textarea>
              <SendBtnIcon />
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default ChatDialog;