import React from "react";

export function WinNumberIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_955_11847)">
        <circle cx="38" cy="35" r="32" fill="url(#paint0_linear_955_11847)" />
        <circle
          cx="38"
          cy="35"
          r="31.5"
          stroke="url(#paint1_linear_955_11847)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_955_11847"
          x="0"
          y="0"
          width="76"
          height="76"
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
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_955_11847"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_955_11847"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_955_11847"
          x1="38"
          y1="3"
          x2="38"
          y2="67"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEF5DC" />
          <stop offset="1" stopColor="#DBD0B4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_955_11847"
          x1="38"
          y1="3"
          x2="38"
          y2="67"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C9C2B8" />
          <stop offset="1" stopColor="#E4CFB1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
