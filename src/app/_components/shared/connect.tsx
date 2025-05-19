import { KokomoLogo } from "@/app/_assets/svg/logo";
import { client } from "@/app/_utils/thirdWebClient";
import { accountAbstraction, supportedWallet } from "@/app/_utils/wallet";
import React from "react";
import { ConnectButton } from "thirdweb/react";

export default function Connect() {
  return (
    <main className="bg-[url(/images/main_background_new_kokoman.png)] bg-cover bg-center bg-no-repeat text-background min-h-dvh flex flex-col">
      <KokomoLogo className="mx-auto my-6 mb-2 max-w-full" />
      <div className="flex items-center justify-center my-auto">
        <ConnectButton
          client={client}
          // autoConnect={false}
          wallets={supportedWallet}
          accountAbstraction={accountAbstraction}
          // autoConnect={false}
        />
      </div>
      {/* <MultiSteps /> */}
    </main>
  );
}
