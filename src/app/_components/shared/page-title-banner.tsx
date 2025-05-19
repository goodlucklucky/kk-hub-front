"use client";

import banner from "@assets/images/header-board.png";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";

const PageTitleBanner = ({
  titleBanner,
  topImageClassName,
  className,
  spinner,
}: {
  titleBanner?: JSX.Element;
  topImageClassName?: string;
  className?: string;
  spinner?: boolean;
}) => {
  return (
    <div
      role="banner"
      data-testid="page-title-banner"
      className={cn(
        "absolute z-10 -top-14 right-0 left-0 w-fit mx-auto font-bumper-sticker flex items-center justify-center",
        className
      )}
    >
      {spinner && (
        <Image
          src={banner}
          priority
          alt="banner"
          className={cn(
            "min-w-36 h-16 scale-x-[1.5] absolute -z-0 pointer-events-none",
            topImageClassName
          )}
        />
      )}
      <div className="z-20 mb-2 text-center text-[#371D32] text-2xl stroke-[#BD5B26]">
        {titleBanner}
      </div>
    </div>
  );
};

export default PageTitleBanner;
