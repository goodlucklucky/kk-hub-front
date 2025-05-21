"use client";

import dynamic from "next/dynamic";

const ResultDetails = () => {
  const ResultDetailsDialog = dynamic(
    () => import("../components/result-details"),
    { ssr: false }
  );

  return <ResultDetailsDialog />;
};

export default ResultDetails;
