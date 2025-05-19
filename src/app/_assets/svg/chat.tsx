import React from "react";

export function DotIcon({
  color = "#745061",
  ...props
}: React.ComponentProps<"svg"> & { color?: string; shadow?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_1422_12672)">
        <path
          d="M12.25 17.8924L4.73744 25.1098L2.26256 22.7322L8.75 16.4996V15.5148H1.75V3.74609H12.25V17.8924Z"
          fill={color}
        />
      </g>
      <g filter="url(#filter1_d_1422_12672)">
        <path
          d="M15.75 15.5148H22.75V16.4996L16.2626 22.7322L18.7374 25.1098L26.25 17.8924V3.74609H15.75V15.5148Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1422_12672"
          x="1.75"
          y="3.74609"
          width="10.5"
          height="22.3633"
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
            result="effect1_dropShadow_1422_12672"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1422_12672"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_1422_12672"
          x="15.75"
          y="3.74609"
          width="10.5"
          height="22.3633"
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
            result="effect1_dropShadow_1422_12672"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1422_12672"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
