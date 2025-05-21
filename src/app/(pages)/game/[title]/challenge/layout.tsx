import Image from "next/image";
import TopSection from "./components/top-section";
// import BackgroundImage from "@/_assets/background.png";
import { ChallengesProvider } from "./challengesContext";

const ChallengeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ChallengesProvider>
      <div className="relative w-full h-[100dvh] py-[14px]">
        <main className="flex flex-col h-full max-w-[100dvw]">
          <div>{children}</div>
          <div className="px-[10px]">
            <TopSection />
          </div>
        </main>
        {/* <Image
          alt="Background Image"
          src={BackgroundImage}
          className="absolute top-0 left-0 w-full h-[100dvh] -z-[1]"
        /> */}
      </div>
    </ChallengesProvider>
  );
};

export default ChallengeLayout;
