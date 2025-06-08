import React from "react";
import Header from "./_components/layout/header";
import { cn } from "@/app/_lib/utils";
import Footer from "./_components/layout/footer";
import { ThirdWeb } from "@/app/_providers/thirdWebProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThirdWeb>
      <div className={cn("min-h-dvh flex flex-col max-h-dvh")}>
        <Header />
        <main className="flex flex-col max-h-[calc(100vh-172px)] flex-1 z-0">
          {children}
        </main>
        <Footer footerCategory="home" />
      </div>
    </ThirdWeb>
  );
}
