import { ClaimRaffleIcon } from "@/app/_assets/svg/claim";

interface TicketListProps {
  tickets: number[];
}

export const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative gap-y-1 py-2 pb-4 px-3">
      <div className="w-full flex justify-center items-center gap-1">
        <span className="text-[#745061] text-center font-bumper-sticker text-[18px] font-normal leading-normal">
          my tickets
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full px-2 mt-2">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-[#D1B69F] rounded-[10px] flex items-center justify-center gap-y-1 py-1 gap-x-1"
          >
            <ClaimRaffleIcon color="#7C5C6B" className="w-5 h-5" />
            <span className="text-[#5F3F57] text-center font-made-tommy text-[14px] font-bold leading-normal">
              {ticket}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 