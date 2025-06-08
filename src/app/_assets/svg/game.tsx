import React from "react";

export function GameIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5447 0.25C21.3249 0.25 25.2001 4.16751 25.2001 9C25.2001 13.7318 21.4847 17.5864 16.8422 17.7449L16.5447 17.75H9.13099C4.35074 17.75 0.475586 13.8325 0.475586 9C0.475586 4.26819 4.19096 0.413626 8.83343 0.255074L9.13099 0.25H16.5447ZM16.2382 9.625C15.3846 9.625 14.6926 10.3246 14.6926 11.1875C14.6926 12.0504 15.3846 12.75 16.2382 12.75C17.0918 12.75 17.7838 12.0504 17.7838 11.1875C17.7838 10.3246 17.0918 9.625 16.2382 9.625ZM7.89189 5.25C7.4224 5.25 7.0344 5.60269 6.97299 6.06029L6.96452 6.1875V8.06L5.10979 8.06093C4.59762 8.06093 4.18243 8.48067 4.18243 8.99843C4.18243 9.47305 4.53131 9.8653 4.98396 9.92737L5.10979 9.93593L6.96452 9.935V11.8125C6.96452 12.3303 7.37972 12.75 7.89189 12.75C8.36138 12.75 8.74938 12.3973 8.81079 11.9397L8.81925 11.8125V9.935L10.674 9.93593C11.1862 9.93593 11.6013 9.5162 11.6013 8.99843C11.6013 8.52381 11.2525 8.13157 10.7998 8.06949L10.674 8.06093L8.81925 8.06V6.1875C8.81925 5.66973 8.40406 5.25 7.89189 5.25ZM18.7111 5.25C17.8575 5.25 17.1655 5.94955 17.1655 6.8125C17.1655 7.67545 17.8575 8.375 18.7111 8.375C19.5648 8.375 20.2568 7.67545 20.2568 6.8125C20.2568 5.94955 19.5648 5.25 18.7111 5.25Z"
        fill={props.fill ?? "#5F3F57"}
      />
    </svg>
  );
}

export function HeartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2614_14300)">
        <path
          d="M1.66699 7.6112C1.66699 11.6636 5.01652 13.8231 7.46843 15.756C8.33366 16.4381 9.16699 17.0803 10.0003 17.0803C10.8337 17.0803 11.667 16.4381 12.5322 15.756C14.9842 13.8231 18.3337 11.6636 18.3337 7.6112C18.3337 3.55875 13.7502 0.684836 10.0003 4.58081C6.25046 0.684836 1.66699 3.55875 1.66699 7.6112Z"
          fill={props.fill ?? "#5F3F57"}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2614_14300"
          x="1.66699"
          y="2.73438"
          width="16.667"
          height="15.3438"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_2614_14300"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2614_14300"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
