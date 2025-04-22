import React from "react";

export function RightArrow(props: React.ComponentProps<"svg">) {
  return (
    <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#filter0_d_799_42110)">
        <path d="M6.29688 9.16663L0.050375 2.92013L3.07206 0L12.0608 9.01388L2.84375 18.2057L0 15.3871L6.29688 9.16663Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_d_799_42110" x="0" y="0" width="12.0605" height="20.207" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_799_42110" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_799_42110" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export function RightArrow2({ color = "#917377", arrowColor = "#E3BEAA", ...props }: React.ComponentProps<"svg"> & { color?: string, arrowColor?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="53" viewBox="0 0 29 53" fill="none" {...props}>
      <path d="M0 0H24C26.7614 0 29 2.23858 29 5V48C29 50.7614 26.7614 53 24 53H0V0Z" fill={color} />
      <g filter="url(#filter0_d_799_41929)">
        <path d="M16.2031 28.0494L9.95662 21.8029L12.9783 18.8828L21.967 27.8967L12.75 37.0885L9.90625 34.2699L16.2031 28.0494Z" fill={arrowColor} />
      </g>
      <defs>
        <filter id="filter0_d_799_41929" x="9.90625" y="18.8828" width="12.0605" height="19.207" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_799_41929" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_799_41929" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}