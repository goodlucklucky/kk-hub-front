import { KokomoLogo } from "../_assets/svg/logo";
import MultiSteps from "./_components/multi-steps";

export default function Home() {
  return (
    <main className="text-background min-h-dvh flex flex-col">
      <KokomoLogo className="mx-auto my-8 max-w-full" />
      <MultiSteps />
    </main>
  );
}
