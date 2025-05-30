import { cn } from "@/app/_lib/utils";
import React from "react";

type TButtonProps = React.ComponentProps<"button">;

export default function Button({ ...props }: TButtonProps) {
  if (props?.className?.includes("#24BE62")) {
    props.className = cn(
      props.className,
      "drop-shadow-[0px_1px_0px_rgba(37,112,94,0.9)]"
    );
  }
  return (
    <button
      {...props}
      className={cn(
        "text-white font-bold text-[12px]",
        "bg-gradient-to-b from-blue-light to-blue",
        "rounded-lg p-1",
        "drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blue),_black_50%)]",
        "shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]",
        props?.className
      )}
    />
  );
}
