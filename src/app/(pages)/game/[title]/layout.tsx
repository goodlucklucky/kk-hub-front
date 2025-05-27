import React from "react";
import Header from "@/app/(pages)/(default)/_components/layout/header";
import { cn } from "@/app/_lib/utils";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={cn("min-h-dvh flex flex-col h-full max-h-dvh")}>
      <Header />
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
