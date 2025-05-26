"use client";

import dynamic from "next/dynamic";
import ChallengeDialog from "./components/challenge-dialog";

type ChallengeTab = "prev_coming_soon" | "daily" | "coming_soon";

const Page = ({ searchParams }: { searchParams: { tab?: string } }) => {
  const tabs: ChallengeTab[] = ["prev_coming_soon", "daily", "coming_soon"];
  const tab = tabs.includes(searchParams.tab as ChallengeTab)
    ? (searchParams.tab as ChallengeTab)
    : "daily";

  const Challenge = dynamic(() => import("./components/challenge"), {
    ssr: false,
  });

  return (
    <>
      <Challenge initialTab={tab} />
      <ChallengeDialog />
    </>
  );
};

export default Page;
