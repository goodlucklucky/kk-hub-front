import { ChallengesProvider } from "./challengesContext";
import { cn } from "@/app/_lib/utils";
import Header from "@/app/(pages)/(default)/_components/layout/header";

const ChallengeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ChallengesProvider>
      <main
        className={cn(
          "flex flex-col max-w-[100dvw] h-[100dvh] relative pb-2.5",
          "bg-[url(/images/main_background_new_kokoman.png)] bg-cover bg-center bg-no-repeat"
        )}
      >
        <div>{children}</div>
        {/* <div className="px-[10px]">
          <TopSection />
        </div> */}
        <Header />
      </main>
    </ChallengesProvider>
  );
};

export default ChallengeLayout;
