"use client"

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import InventoryItem from "./inventory-item";
import { useState } from "react";

interface InventorySectionProps {
  title: string;
  count: number;
  items: any[];
  itemPadding?: string;
  itemWidth?: number;
  itemHeight?: number;
}

export default function InventorySection({
  title,
  count,
  items,
  itemPadding,
  itemWidth,
  itemHeight
}: InventorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const headerClasses = `
    flex justify-between items-center 
    pt-2 px-4 pb-1 cursor-pointer
    ${isExpanded ? "border-b-[#74506142] border-b" : ""}
  `;

  const contentClasses = `
    flex justify-between items-center
    overflow-hidden transition-all duration-300 ease-in-out
    ${isExpanded ? "max-h-[200px] opacity-100 px-3 py-2" : "max-h-0 opacity-0 !p-0"}
  `;

  return (
    <div className="w-full flex flex-col bg-[#EED1B8] rounded-[20px]">
      <div 
        className={headerClasses}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-2 items-center">
          <span className="text-[#745061] text-base font-bold font-made-tommy">
            {title}
          </span>
          <CustomRightArrow 
            color="#745061" 
            className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} 
          />
        </div>
        <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1 gap-1">
          <span className="text-[#FFE4D4] font-made-tommy text-lg leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
            {count}
          </span>
        </div>
      </div>
      <div className={contentClasses}>
        {items.map((item) => (
          <InventoryItem
            key={item.id}
            {...item}
            padding={itemPadding}
            width={itemWidth}
            height={itemHeight}
          />
        ))}
      </div>
    </div>
  );
} 