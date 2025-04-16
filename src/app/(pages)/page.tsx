import { headers } from "next/headers";
import { KokomoLogo } from "../_assets/svg/logo";
import { isMobile } from "../_utils/isMobile";
import MultiSteps from "./_components/multi-steps";

export default async function Home() {
  // const userAgent = headers().get("user-agent") || "";
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return mobileCheck ? (
    <main className="flex flex-col justify-center items-center min-h-dvh text-center z-10 bg-center bg-cover p-4" style={{ backgroundImage: `url(/images/splash.png)` }}>
      <KokomoLogo className="mx-auto mt-5 mb-10 max-w-full" />
      <MultiSteps />
    </main>
  ) : (
    <div className=" flex justify-center items-center min-h-screen text-2xl">
      <h1>Desktop not supported!!</h1>
    </div>
  );
}
