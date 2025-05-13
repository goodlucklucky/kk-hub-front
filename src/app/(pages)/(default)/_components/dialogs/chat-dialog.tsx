'use client';
import Image from "next/image";
//import components
import {
  Dialog,
  DialogPortal,
} from "@/app/_components/ui/dialog";
//import assets
import { EarthIcon } from "@/app/_assets/svg/earth";
import startchat from "@assets/images/star-icon.png";
//import components
import { SendBtnIcon } from "@/app/_assets/svg/sendbtn";
import { DotIcon } from "@/app/_assets/svg/chat";
import { CloseIcon } from "@/app/_assets/svg/close";
import { ChatItem } from "@/app/(pages)/(default)/_components/dialogs/chat/chat-item";

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
              <ChatItem
                sender="LECOCONUT"
                message="writes something smart that takes two lines"
                time="Today, 14:47"
                isSender={true}
                replyTo="LEBRUN134"
                replyMessage="writes something..."
              />
              <ChatItem
                sender="LEPINEAPPLE"
                message="and here comes just a very long message that eventually takes up three lines"
                time="Today, 14:47"
                isSender={false}
                replyTo="LECOCONUT"
                replyMessage="writes something..."
              />
              <ChatItem
                sender="LEPINEAPPLE"
                message="lol"
                time="Today, 14:47"
                isSender={false}
              />
              <ChatItem
                sender="LEPINEAPPLE"
                message="and here comes just a very long message that eventually takes up three lines"
                time="Today, 14:47"
                isSender={false}
                replyTo="LECOCONUT"
                replyMessage="writes something..."
              />
              <ChatItem
                sender="LECOCONUT"
                message="writes something smart that takes two lines"
                time="Today, 14:47"
                isSender={true}
                replyTo="LEBRUN134"
                replyMessage="writes something..."
              />
              <ChatItem
                sender="LECOCONUT"
                message="writes something smart that takes two lines"
                time="Today, 14:47"
                isSender={true}
                replyTo="LEBRUN134"
                replyMessage="writes something..."
              />
            </div>
            <div className="flex gap-x-1">
              <textarea 
                className="w-full rounded-[5px] border-2 border-[#D2AA87] bg-[#F4F4F0] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] text-[#653F56] text-[16px] outline-none font-made-tommy font-semibold px-3 py-2 min-h-[44px] max-h-[96px] resize-none overflow-y-auto"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              ></textarea>
              <SendBtnIcon />
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default ChatDialog;