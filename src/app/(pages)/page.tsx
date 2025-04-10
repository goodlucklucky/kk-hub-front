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
    <main className="text-background min-h-dvh flex flex-col">
      <KokomoLogo className="mx-auto my-8 max-w-full" />
      <MultiSteps />
    </main>
  ) : (
    <div className=" flex justify-center items-center min-h-screen text-2xl">
      <h1>Desktop not supported!!</h1>
    </div>
  );
}
