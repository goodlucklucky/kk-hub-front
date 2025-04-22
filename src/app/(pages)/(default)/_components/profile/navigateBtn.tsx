import Image from "next/image";
import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";

interface NavigationButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NavigationButton({ icon, label, isActive, onClick }: NavigationButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "drop-shadow-none flex gap-0.5 items-center justify-center rounded-lg font-bold w-full h-7",
        isActive
          ? "bg-[#653F56]"
          : "bg-[#E3BEAA] border-2 border-[#91737733]"
      )}
    >
      <Image
        src={icon}
        alt={label.toLowerCase()}
        className="h-4 w-5"
      />
      <span
        className={cn(
          "drop-shadow-md font-made-tommy text-[15px]",
          isActive
            ? "text-[#E3BEAA]"
            : "text-[#745061]"
        )}
      >
        {label}
      </span>
    </Button>
  );
} 