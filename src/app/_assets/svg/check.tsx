import React from "react";

export function CheckIcon({ color = "#27A459", ...props }: React.ComponentProps<"svg"> & { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" rotate={45} {...props}>
      <rect x="12.0332" y="18.1289" width="5.01185" height="12.0053" rx="1" transform="rotate(135 12.0332 18.1289)" fill={color} />
      <rect x="18.1299" y="4.94531" width="5.00977" height="18.6436" rx="1" transform="rotate(45 18.1299 4.94531)" fill={color} />
    </svg>
  );
}