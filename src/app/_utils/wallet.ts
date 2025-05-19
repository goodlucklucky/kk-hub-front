import {
  SmartWalletOptions,
  Wallet,
  createWallet,
  inAppWallet,
} from "thirdweb/wallets";
import { avalanche } from "thirdweb/chains";

export function customNetwork() {
  window.alert("Custom Network not supported");
}

export function onConnectionSuccessful(wallet: Wallet) {
  window.alert(`Connected to ${wallet.id}`);
}

export function onDisconnectWallet() {
  window.alert("wallet disconnected");
}

export const metamaskWallet = createWallet("io.metamask");
export const supportedWallet = [
  inAppWallet({
    auth: {
      mode: "popup",
      options: ["google", "apple", "telegram", "discord", "email", "phone"],
    },
  }),
  metamaskWallet,
];

export const accountAbstraction: SmartWalletOptions = {
  chain: avalanche,
  sponsorGas: true,
};
