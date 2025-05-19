import React from "react";

export function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="35"
      height="37"
      viewBox="0 0 35 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_799_42000)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0833 34.1667C9.03016 34.1667 5.00359 34.1667 2.5018 31.6648C-2.03649e-07 29.1631 0 25.1364 0 17.0833C0 9.03016 -2.03649e-07 5.00359 2.5018 2.5018C5.00359 -2.03649e-07 9.03016 0 17.0833 0C25.1364 0 29.1631 -2.03649e-07 31.6648 2.5018C34.1667 5.00359 34.1667 9.03016 34.1667 17.0833C34.1667 25.1364 34.1667 29.1631 31.6648 31.6648C29.1631 34.1667 25.1364 34.1667 17.0833 34.1667ZM17.0833 10.6771C17.7909 10.6771 18.3646 11.2507 18.3646 11.9583V15.8021H22.2083C22.9159 15.8021 23.4896 16.3757 23.4896 17.0833C23.4896 17.7909 22.9159 18.3646 22.2083 18.3646H18.3646V22.2083C18.3646 22.9159 17.7909 23.4896 17.0833 23.4896C16.3757 23.4896 15.8021 22.9159 15.8021 22.2083V18.3646H11.9583C11.2507 18.3646 10.6771 17.7909 10.6771 17.0833C10.6771 16.3757 11.2507 15.8021 11.9583 15.8021H15.8021V11.9583C15.8021 11.2507 16.3757 10.6771 17.0833 10.6771Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_799_42000"
          x="0"
          y="0"
          width="34.167"
          height="36.168"
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
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_799_42000"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_799_42000"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
