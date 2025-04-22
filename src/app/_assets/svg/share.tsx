import React from "react";

export function ShareIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_1114_13147)">
        <path
          d="M0 11.1449C0 11.8356 0.242667 12.4236 0.728 12.9089C1.21333 13.3942 1.80133 13.6369 2.492 13.6369H10.78C11.4613 13.6369 12.0447 13.3942 12.53 12.9089C13.0153 12.4236 13.258 11.8356 13.258 11.1449V7.56091L11.606 8.94691V11.1449C11.606 11.3782 11.5267 11.5742 11.368 11.7329C11.2093 11.8916 11.0133 11.9756 10.78 11.9849H2.492C2.25867 11.9849 2.06267 11.9009 1.904 11.7329C1.74533 11.5649 1.666 11.3689 1.666 11.1449V2.85691C1.666 2.63291 1.74533 2.43691 1.904 2.26891C2.06267 2.10091 2.25867 2.02157 2.492 2.03091H6.636V0.378906H2.492C1.80133 0.378906 1.21333 0.621573 0.728 1.10691C0.242667 1.59224 0 2.17557 0 2.85691L0 11.1449ZM2.492 8.66691C2.492 9.46957 2.65067 10.2396 2.968 10.9769C3.11733 10.1182 3.444 9.33891 3.948 8.63891C4.452 7.93891 5.07733 7.37424 5.824 6.94491C6.57067 6.51557 7.392 6.27291 8.288 6.21691V8.66691L13.258 4.52291L8.288 0.378906V2.85691C7.504 2.85691 6.75267 3.01091 6.034 3.31891C5.31533 3.62691 4.69933 4.04224 4.186 4.56491C3.67267 5.08757 3.25733 5.70357 2.94 6.41291C2.62267 7.12224 2.47333 7.87357 2.492 8.66691Z"
          fill="#EFF6FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1114_13147"
          x="0"
          y="0.378906"
          width="13.2578"
          height="14.2578"
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
            result="effect1_dropShadow_1114_13147"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1114_13147"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
