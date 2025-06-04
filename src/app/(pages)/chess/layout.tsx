import React from "react";
import { ThirdWeb } from "@/app/_providers/thirdWebProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThirdWeb>
      {children}
    </ThirdWeb>
  );
}
