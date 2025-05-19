import React from "react";

export function HotIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="11"
      viewBox="0 0 9 11"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_1087_13454)">
        <path
          d="M4.4974 9.875C6.89064 9.875 8.83073 8.05711 8.83073 5.81467C8.83073 3.78806 7.72865 2.20398 6.96848 1.44903C6.82748 1.309 6.59273 1.37087 6.51305 1.55114C6.10842 2.46657 5.26537 3.78454 4.18789 3.78454C3.52104 3.8738 2.50237 3.30374 3.3246 0.47637C3.39863 0.221786 3.12683 0.0172801 2.91922 0.187504C1.73739 1.15653 0.164062 3.11036 0.164062 5.81467C0.164062 8.05711 2.10416 9.875 4.4974 9.875Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1087_13454"
          x="0.164062"
          y="0.125"
          width="8.66797"
          height="10.75"
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
            result="effect1_dropShadow_1087_13454"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1087_13454"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
