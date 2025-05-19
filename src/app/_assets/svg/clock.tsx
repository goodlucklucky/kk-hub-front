import React from "react";

export function ClockIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12C9.31373 12 12 9.31373 12 6C12 2.68629 9.31373 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31373 2.68629 12 6 12ZM5.25 2.25V6.31066L7.71968 8.78032L8.78032 7.71968L6.75 5.68934V2.25H5.25Z"
        fill="#745061"
      />
    </svg>
  );
}
