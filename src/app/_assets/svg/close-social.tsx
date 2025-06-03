import { cn } from "@/app/_lib/utils";
import React from "react";

export function CloseSocialIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="24"
      viewBox="0 0 23 24"
      fill="none"
      {...props}
      className={cn("cursor-pointer min-w-6 min-h-6", props?.className)}
    >
      <g filter="url(#filter0_d_1114_13141)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.75 11.5C22.75 17.7132 17.7132 22.75 11.5 22.75C5.28679 22.75 0.25 17.7132 0.25 11.5C0.25 5.28679 5.28679 0.25 11.5 0.25C17.7132 0.25 22.75 5.28679 22.75 11.5ZM8.09083 8.09086C8.42033 7.76136 8.95456 7.76136 9.28409 8.09086L11.5 10.3067L13.7158 8.09088C14.0453 7.76138 14.5796 7.76138 14.9091 8.09088C15.2386 8.42038 15.2386 8.95462 14.9091 9.28409L12.6932 11.5L14.9091 13.7158C15.2386 14.0453 15.2386 14.5796 14.9091 14.9091C14.5796 15.2386 14.0453 15.2386 13.7158 14.9091L11.5 12.6933L9.28409 14.9091C8.9546 15.2386 8.42036 15.2386 8.09086 14.9091C7.76136 14.5796 7.76136 14.0453 8.09086 13.7159L10.3067 11.5L8.09083 9.28409C7.76132 8.9546 7.76132 8.42036 8.09083 8.09086Z"
          fill="#917377"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1114_13141"
          x="0.25"
          y="0.25"
          width="22.5"
          height="23.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1114_13141"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1114_13141"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
