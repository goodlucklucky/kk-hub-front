import React from "react";

export function SendBtnIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_799_60499)">
        <rect width="46" height="45" rx="10" fill="#3C2BA0" />
      </g>
      <rect
        width="46"
        height="42"
        rx="9"
        fill="url(#paint0_linear_799_60499)"
      />
      <rect
        x="0.5"
        y="0.5"
        width="45"
        height="41"
        rx="8.5"
        stroke="url(#paint1_linear_799_60499)"
        strokeOpacity="0.3"
      />
      <g filter="url(#filter1_d_799_60499)">
        <path
          d="M34.6676 11.3048C34.9759 11.5874 35.0803 12.0069 34.9362 12.3842L27.4639 31.9548C26.9545 33.289 24.9273 33.3648 24.3011 32.0731L21.2709 25.8235L29.742 16.5526C30.1869 16.0657 29.4737 15.4119 28.9426 15.8197L18.8287 23.585L12.0111 20.8074C10.6021 20.2333 10.6847 18.3751 12.1402 17.9082L33.49 11.0584C33.9015 10.9264 34.3592 11.0221 34.6676 11.3048Z"
          fill="#EFF6FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_799_60499"
          x="0"
          y="0"
          width="46"
          height="46"
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
            result="effect1_dropShadow_799_60499"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_799_60499"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_799_60499"
          x="11"
          y="11"
          width="24"
          height="23"
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
            result="effect1_dropShadow_799_60499"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_799_60499"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_799_60499"
          x1="23"
          y1="-1.2517e-06"
          x2="23"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A291FF" />
          <stop offset="1" stopColor="#856FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_799_60499"
          x1="0"
          y1="0"
          x2="46.3533"
          y2="0.393596"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CDEBEE" />
          <stop offset="1" stopColor="#8843BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
