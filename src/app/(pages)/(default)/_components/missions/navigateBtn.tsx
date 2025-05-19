import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";

interface NavBtnProps {
  icon?: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export default function NavBtn({
  icon,
  label,
  isActive,
  onClick,
  className,
}: NavBtnProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "drop-shadow-none flex gap-0.5 items-center justify-center rounded-[6px] font-bold w-full h-7 text-[15x] font-made-tommy border border-white bg-gradient-to-br from-[rgba(255,248,183,0.75)] to-[rgba(246,237,197,0.75)]",
        className,
        isActive ? "bg-[#653F56]" : "bg-[#E3BEAA] border-2 border-[#91737733]"
      )}
    >
      {icon && icon}
      <span
        className={cn(
          "drop-shadow-md ml-0.5",
          isActive ? "text-[#E3BEAA]" : "text-[#745061]"
        )}
      >
        {label}
      </span>
    </Button>
  );
}
