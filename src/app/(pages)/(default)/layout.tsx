import React from "react";
import Header from "./_components/layout/header";
import { cn } from "@/app/_lib/utils";
import Footer from "./_components/layout/footer";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={cn("min-h-dvh flex flex-col")}>
      <Header />
      <main className="grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
