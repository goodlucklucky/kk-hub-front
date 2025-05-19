import React from "react";

export function TaskIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M17.75 5.74997H26.5V14.4999H31.5001V21.9999H26.5V32H17.75V27H10.25V32H0.25V21.9999H5.25005V14.4999H0.25V5.74997H10.25V0.75H17.75V5.74997Z"
        fill="#623253"
      />
    </svg>
  );
}
