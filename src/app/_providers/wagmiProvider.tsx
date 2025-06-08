import React from "react";
// import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { avalanche } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WAGMI_WALLET_CONNECT_PROJECT_ID || "";

const config = createConfig({
  chains: [
    avalanche,
    // mainnet,
    // bsc,
    // sepolia,
  ],
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
  // chains,
  transports: {
    [avalanche.id]: http(),
    // [mainnet.id]: http(),
    // [bsc.id]: http(),
    // [sepolia.id]: http(),
  },
});

// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   themeMode: "light",
//   themeVariables: { "--w3m-font-family": "Inter, sans-serif" },
// });

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
