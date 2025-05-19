import Image from "next/image";

interface InventoryItemProps {
  id: number;
  title: string;
  name: string;
  image: any;
  titleColor: string;
  nameColor: string;
  width?: number;
  height?: number;
  padding?: string;
  badge?: number;
}

export default function InventoryItem({
  id,
  title,
  name,
  image,
  titleColor,
  nameColor,
  width = 50,
  height = 50,
  padding = "px-2 py-2",
  badge = 0,
}: InventoryItemProps) {
  return (
    <div
      className={`flex flex-col gap-1 justify-center items-center rounded-[7px] bg-[#E3BEAA] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] ${padding} relative`}
      key={id}
    >
      <Image
        src={image}
        alt={title}
        width={width}
        height={height}
        className="rounded-[5px]"
      />
      <div className="flex flex-col justify-center items-center gap-0.5">
        <span
          style={{ color: titleColor }}
          className="text-xs font-bumper-sticker font-semibold"
        >
          {title}
        </span>
        <span
          style={{ backgroundColor: nameColor }}
          className="text-xs font-semibold font-made-tommy text-[#E3BEAA] px-1 rounded-sm"
        >
          {name}
        </span>
      </div>
      {badge > 0 && (
        <div className="absolute top-1 right-1 bg-[#7D4000] rounded-sm w-4 h-4 flex items-center justify-center">
          <span className="text-xs font-semibold font-made-tommy text-[#E3BEAA]">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
