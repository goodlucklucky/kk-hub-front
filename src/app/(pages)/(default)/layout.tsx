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
      <main className="grow bg-[url(/images/main_background_new_kokoman.png)] ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
