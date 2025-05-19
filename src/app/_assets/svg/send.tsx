import React from "react";

export function SendIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_930_12757)">
        <path
          d="M13.8061 0.16624C13.9859 0.320402 14.0468 0.549244 13.9628 0.755022L9.60394 11.4299C9.30678 12.1576 8.12425 12.199 7.75896 11.4944L5.99137 8.08555L10.9329 3.02867C11.1923 2.76313 10.7763 2.40651 10.4665 2.62893L4.56674 6.86453L0.589835 5.34947C-0.232132 5.03637 -0.1839 4.02279 0.665104 3.76809L13.1191 0.031879C13.3592 -0.0401453 13.6262 0.0120782 13.8061 0.16624Z"
          fill="#EFF6FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_930_12757"
          x="0"
          y="0"
          width="14"
          height="13"
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
            result="effect1_dropShadow_930_12757"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_930_12757"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
