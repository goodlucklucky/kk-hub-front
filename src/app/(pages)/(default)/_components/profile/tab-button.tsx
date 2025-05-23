import { cn } from "@/app/_lib/utils";

interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function TabButton({
  label,
  isActive = false,
  onClick,
  className,
}: TabButtonProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[9px] border font-bold w-full px-1 text-center font-made-tommy text-[16px] leading-[24px] cursor-pointer",
        isActive
          ? "border-[#9C7B8F] bg-[#653F56] text-[#E3BEAA]"
          : "border-[#D1AB8D] bg-[#EED1B8] text-[#5F3F57]",
        "shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]",
        className
      )}
    >
      {label}
    </div>
  );
}
