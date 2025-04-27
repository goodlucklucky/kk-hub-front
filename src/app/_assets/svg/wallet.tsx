import React from "react";

export function WalletIcon({ color = "#7A5B69", ...props }: React.ComponentProps<"svg"> & { color?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_1114_13100)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 4.07143C0 1.82285 1.82285 0 4.07143 0H19V2.71429H4.07143V5.42857H19V19H4.07143C1.82285 19 0 17.1772 0 14.9286V4.07143ZM14.9286 13.5714C15.6781 13.5714 16.2857 12.9638 16.2857 12.2143C16.2857 11.4647 15.6781 10.8571 14.9286 10.8571C14.179 10.8571 13.5714 11.4647 13.5714 12.2143C13.5714 12.9638 14.179 13.5714 14.9286 13.5714Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1114_13100"
          x="0"
          y="0"
          width="19"
          height="20"
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
            result="effect1_dropShadow_1114_13100"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1114_13100"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
