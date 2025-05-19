import React from "react";

export function StatsWalletIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_799_57578)">
        <path
          d="M5 1H4C1.79086 1 0 2.79086 0 5V11C0 13.2091 1.79086 15 4 15H10C12.2091 15 14 13.2091 14 11H13C12.4477 11 12.0207 11.4745 11.7555 11.959C11.4159 12.5793 10.7571 13 10 13H4C2.89543 13 2 12.1046 2 11V5C2 3.89543 2.89543 3 4 3C4.55228 3 5 2.55228 5 2V1Z"
          fill="#EFF6FF"
        />
        <path
          d="M7 2V1C7 0.447715 7.44772 0 8 0H13C14.1046 0 15 0.895431 15 2V7C15 7.55228 14.5523 8 14 8H13V2H7Z"
          fill="#EFF6FF"
        />
        <path
          d="M5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711C5.68342 10.0976 6.31658 10.0976 6.70711 9.70711L5.29289 8.29289ZM12.2929 1.29289L5.29289 8.29289L6.70711 9.70711L13.7071 2.70711L12.2929 1.29289Z"
          fill="#EFF6FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_799_57578"
          x="0"
          y="0"
          width="15"
          height="16"
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
            values="0 0 0 0 0.243137 0 0 0 0 0.141176 0 0 0 0 0.411765 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_799_57578"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_799_57578"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
