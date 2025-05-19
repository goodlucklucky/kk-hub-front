import React from "react";

export function TopArrow(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <circle cx="10" cy="10" r="10" fill="#5F3F57" />
      <path d="M10 4L16 15L10 12L4 15L10 4Z" fill="#EED1B8" />
    </svg>
  );
}
