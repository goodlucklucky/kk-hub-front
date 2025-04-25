import React from "react";

export function StartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_799_49197)">
        <path
          d="M17.4086 7.48495C19.5305 8.58118 19.5305 11.4188 17.4086 12.515L4.59661 19.1338C2.53435 20.1992 0 18.8125 0 16.6187V3.38126C0 1.1875 2.53435 -0.199181 4.5966 0.866206L17.4086 7.48495Z"
          fill="#E3BEAA"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_799_49197"
          x="0"
          y="0.5"
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
            result="effect1_dropShadow_799_49197"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_799_49197"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
