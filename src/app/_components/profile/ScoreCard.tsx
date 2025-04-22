import { ReactNode } from "react";

interface ScoreCardProps {
  children: ReactNode;
}

export default function ScoreCard({ children }: ScoreCardProps) {
  return (
    <div className="w-full justify-between bg-[#DDC2A7] rounded-[14px] flex items-center gap-2 px-3 py-2.5 border border-[#F7D8B7] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-transparent">
      {children}
    </div>
  );
} 