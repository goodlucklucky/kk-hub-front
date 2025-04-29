import { cn } from "@/app/_lib/utils";

export const ProgressBar: React.FC<{
    currentXp: number;
    maxXp: number;
    bgColor?: {
      from: string;
      to: string;
    }
    progressColor?: {
      from: string;
      to: string;
    };
  }> = ({ currentXp, maxXp, progressColor, bgColor }) => {
    const percentage = (currentXp / maxXp) * 100;
  
    return (
      <div className="flex-1 flex-col items-center gap-4">
        <span className="text-[25px] font-bold text-[#653f56] font-bumper-sticker">
          {currentXp}/{maxXp}
        </span>
        <div
          className={cn(
            "flex-1 rounded-4xl h-3 shadow-[0_2px_0_0_#00000033]",
          )}
          style={{
            background: `linear-gradient(to bottom, ${
              bgColor?.from || "#655364"
            }, ${bgColor?.to || "#978396"})`
          }}
        >
          <div
            className={`h-full rounded-l-4xl ${percentage === 100 && 'rounded-r-4xl'}`}
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(to bottom, ${
                progressColor?.from || "#FFC920"
              }, ${progressColor?.to || "#EFB500"})`
            }}
          />
        </div>
      </div>
    );
  };