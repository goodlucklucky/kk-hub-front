import Button from "@/app/_components/shared/button";

export const NoWinMessage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative gap-y-2 py-1 px-3">
      <span className="text-[#8F6E75] text-center font-made-tommy text-[14px] font-bold leading-normal">
        Perhaps luck is waiting for you in the next draw... Go claim your next free ticket!
      </span>
      <Button className="rounded-[8px] border border-[#9C7B8F] bg-[#653F56] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] w-full flex gap-x-1 items-center justify-center py-[3px]">
        <span className="text-[#E3BEAA] text-[20px] font-bumper-sticker font-normal leading-normal [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
          Go to daily draw
        </span>
      </Button>
    </div>
  );
}; 