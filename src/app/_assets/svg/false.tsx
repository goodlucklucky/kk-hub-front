import React from "react";

export function FalseIcon({ color = "#E84142", ...props }: React.ComponentProps<"svg"> & { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <path d="M15.5172 18.1898L17.6898 16.0172L11.1719 9.49922L17.6898 2.98125L15.5172 0.808594L8.99922 7.32656L2.48125 0.808594L0.308594 2.98125L6.82656 9.49922L0.308594 16.0172L2.48125 18.1898L8.99922 11.6719L15.5172 18.1898Z" fill={color} />
    </svg>
  );
}