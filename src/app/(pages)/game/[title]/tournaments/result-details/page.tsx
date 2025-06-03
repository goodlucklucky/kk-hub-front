"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import BackgroundImg from "../../play/_screens/snake/assets/snake-game-bg.png";

const ResultDetails = () => {
  const ResultDetailsDialog = dynamic(
    () => import("../components/result-details"),
    { ssr: false }
  );

  return (
    <div className="w-full h-full">
      <Image
        alt="Background"
        src={BackgroundImg}
        className="absolute w-full h-screen top-0"
      />
      <ResultDetailsDialog />
    </div>
  );
};

export default ResultDetails;
