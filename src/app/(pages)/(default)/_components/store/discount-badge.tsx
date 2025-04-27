import React from 'react';
import { PercentIcon } from "@/app/_assets/svg/percent";

interface DiscountBadgeProps {
  discount: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) => {
  return (
    <div className="bg-[#ED4721] rounded-[3px] h-5 flex items-center justify-center px-1 gap-x-1">
      <PercentIcon />
      <span className="text-white text-[12px]/[20px] font-made-made-made font-bold">{discount}%</span>
    </div>
  );
};

export default DiscountBadge; 