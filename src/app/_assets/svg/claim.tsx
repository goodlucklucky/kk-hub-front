import React from "react";

export function ClaimIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none" {...props}>
      <g filter="url(#filter0_d_1000_13694)">
        <path d="M2.33014 12.3186C2.04425 11.2516 2.67742 10.155 3.74435 9.86908L13.4036 7.28089C14.4705 6.99501 15.5672 7.62817 15.8531 8.6951L17.1472 13.5247C17.719 15.6586 16.4526 17.8519 14.3188 18.4237L8.52321 19.9766C6.38935 20.5484 4.196 19.2821 3.62423 17.1482L2.33014 12.3186Z" fill="#EFF6FF" />
        <path d="M5.48651 12.5065L3.93359 6.71094" stroke="#EFF6FF" strokeWidth="3" />
        <path d="M10.0897 4.0496C10.6167 4.68876 11.5621 4.77967 12.2013 4.25264C12.8404 3.72561 12.9313 2.78022 12.4043 2.14106L10.0897 4.0496ZM5.3826 6.32313C5.04063 5.04688 5.83315 3.61422 7.31809 3.21633L6.54164 0.31855C3.57358 1.11384 1.68326 4.10811 2.48482 7.09959L5.3826 6.32313ZM7.31809 3.21633C8.40966 2.92384 9.47973 3.30985 10.0897 4.0496L12.4043 2.14106C11.0388 0.485013 8.75636 -0.274884 6.54164 0.31855L7.31809 3.21633Z" fill="#EFF6FF" />
      </g>
      <rect x="8.64258" y="12.6953" width="2" height="4" rx="1" transform="rotate(-15 8.64258 12.6953)" fill="#289E63" />
      <circle cx="9.60756" cy="12.4376" r="1" transform="rotate(-15 9.60756 12.4376)" fill="#289E63" stroke="#289E63" />
      <defs>
        <filter id="filter0_d_1000_13694" x="2.26172" y="0.117188" width="15.0234" height="20.9961" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.243137 0 0 0 0 0.141176 0 0 0 0 0.411765 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1000_13694" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1000_13694" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export function ClaimRaffleIcon({ color = "#EFF6FF", ...props }: React.ComponentProps<"svg"> & { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none" {...props}>
      <g filter="url(#filter0_d_1088_11969)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H0V4C1.10457 4 2 4.89543 2 6C2 7.10457 1.10457 8 0 8V12H16V8C14.8954 8 14 7.10457 14 6C14 4.89543 14.8954 4 16 4V0ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill={color} />
      </g>
      <defs>
        <filter id="filter0_d_1088_11969" x="0" y="0" width="16" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.243137 0 0 0 0 0.141176 0 0 0 0 0.411765 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1088_11969" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1088_11969" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}