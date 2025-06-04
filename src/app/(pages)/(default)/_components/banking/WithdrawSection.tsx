import { CheckIcon } from "@/app/_assets/svg/check";
import { SendIcon } from "@/app/_assets/svg/send";
import Button from "@/app/_components/shared/button";
import { Input, Select } from "./forms";
import { AvalancheIcon, UsdcIcon, UsdtIcon } from "@/app/_assets/svg/etc";
import {
  FormEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import WagmiConnectButton from "@/app/_components/shared/wagmiWallet";
import { LoaderIcon } from "react-hot-toast";
import { useAccount } from "wagmi";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { coinAddresses } from "@/app/_constants/coinAddresses";
import { useTransfer } from "@/app/_hooks/useTransfer";
import { useThirdweb } from "../../_context/thirdwebContext";
import { formatNumber } from "@/app/_utils/number";

interface WithdrawSectionProps {
  isConnected: boolean;
}

export const WithdrawSection = ({ isConnected }: WithdrawSectionProps) => {
  const { sessionId } = useContext(GeneralContext);
  const {
    balance: {
      usdc,
      usdt,
      isPending: isBalanceLoading,
      refresh: refreshBalance,
    },
    chainId,
    selectedCurrency,
    setSelectedCurrency,
  } = useThirdweb();

  const balance = useMemo(
    () => ({ usdc: usdc?.data?.displayValue, usdt: usdt?.data?.displayValue }),
    [usdc?.data?.displayValue, usdt?.data?.displayValue]
  );

  const { address } = useAccount();
  const [amount, setAmount] = useState(balance?.[selectedCurrency] ?? 0);
  const [withdrawalAddress, setWithdrawalAddress] = useState("");

  const { transfer, isPending } = useTransfer();

  const isValidAddress = useMemo(() => {
    return withdrawalAddress.startsWith("0x");
  }, [withdrawalAddress]);

  const maxWithdrawableAmount = useMemo(() => {
    const max = Number(balance?.[selectedCurrency] || 0);
    return max * 1.0 / 1.02;
  }, [balance, selectedCurrency]);

  const isAmountValid = useMemo(() => {
    const numericAmount = Number(amount);
    return numericAmount > 0 && numericAmount <= maxWithdrawableAmount;
  }, [amount, maxWithdrawableAmount]);

  const isButtonEnabled = isValidAddress && isAmountValid && !isPending;

  const handleManualWithdraw = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      try {
        e?.preventDefault();

        const formData = new FormData(e.currentTarget);
        const currentData = Object.fromEntries(formData);

        const contracts =
          coinAddresses?.[currentData?.currency as "usdt" | "usdc"];
        const contract_address = contracts?.[43114];

        const { data: res, error } = await transfer({
          contract_address,
          to: `${currentData?.address}`,
          amount: `${currentData?.amount}`,
          type: "withdraw",
        });
        if (error) throw error;
        // console.log("handleManualWithdraw res: ", res);

        refreshBalance?.();

        return { data: res };
      } catch (error) {
        // console.error("handleManualWithdraw error: ", error);
        return { error };
      }
    },
    [transfer, refreshBalance]
  );

  return (
    <div className="rounded-[7px] flex flex-1 flex-col w-full p-2 overflow-y-auto bg-[#E3BEAA]">
      <div className="flex flex-col h-full p-2 bg-[#EED1B8] rounded-t-[15px] gap-1.5 border-b-1 border-[#E3BEAA]">
        <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal px-2">
          withdraw From EXTERNAL Wallet
        </span>
        <WagmiConnectButton />
        {isConnected && (
          <form
            onSubmit={handleManualWithdraw}
            className="flex flex-col gap-2 bg-[#F5DDC4] border-1 border-[#D1B69F] rounded-[10px] p-2"
          >
            <div className="flex gap-2 justify-center items-center">
              <Select
                className="w-auto"
                name="currency"
                options={[
                  { label: "USDC", value: "usdc", icon: <UsdcIcon /> },
                  { label: "USDT", value: "usdt", icon: <UsdtIcon /> },
                ]}
                value={selectedCurrency}
                onChange={setSelectedCurrency as any}
              />
              <Input
                defaultValue={balance?.[selectedCurrency] || 0}
                onChange={(e) => setAmount(e?.target?.valueAsNumber || 0)}
                max={balance?.[selectedCurrency] || 0}
                min={0}
                step="any"
                type="number"
                name="amount"
                className="w-full h-9 py-0"
                value={amount}
              />
              <input
                type="hidden"
                name="network"
                value={chainId}
                onChange={() => {}}
              />
              <input
                type="hidden"
                name="address"
                value={address}
                onChange={() => {}}
              />
              <input
                type="hidden"
                name="sessionId"
                value={sessionId}
                onChange={() => {}}
              />
            </div>
            <div className="flex justify-start items-center">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[12px] px-2 flex items-center gap-1 flex-wrap">
                <span>Available:</span>
                {isBalanceLoading ? (
                  <LoaderIcon className="size-5 inline" />
                ) : (
                  <span>{balance?.[selectedCurrency]}</span>
                )}
                {selectedCurrency?.toUpperCase()}
              </span>
              <span className="text-[#653F56] font-made-tommy font-bold text-[12px] px-2 border border-[#917377] rounded-[5px] -mt-1 bg-[#EED1B8]">
                MAX
              </span>
            </div>
            <Button
              disabled={isPending}
              className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]"
            >
              {isPending ? (
                <LoaderIcon className="size-5 inline" />
              ) : (
                <CheckIcon color="#ffffff" className="w-3 h-3 -mt-1" />
              )}
              <span className="text-white font-made-tommy font-extrabold text-[12px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                {isPending ? "Pending" : "Confirm"}
              </span>
            </Button>
          </form>
        )}
      </div>
      <form
        onSubmit={handleManualWithdraw}
        className="flex flex-col p-2 pb-3 bg-[#EED1B8] rounded-b-[15px] gap-0.5"
      >
        <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal px-2">
          withdraw to address
        </span>
        <div className="flex gap-2">
          <Select
            label="Select Currency"
            name="currency"
            options={[
              { label: "USDC", value: "usdc", icon: <UsdcIcon /> },
              { label: "USDT", value: "usdt", icon: <UsdtIcon /> },
            ]}
            value={selectedCurrency}
            onChange={setSelectedCurrency as any}
          />
          <Select
            label="Select Network"
            name="network"
            options={[
              {
                label: "Avalanche",
                value: "avalanche",
                icon: <AvalancheIcon />,
              },
              // {
              //   label: "Ethereum",
              //   value: "ethereum",
              //   icon: <EthereumIcon />,
              // },
              // { label: "BSC", value: "bsc", icon: <BscIcon /> },
            ]}
          />
        </div>
        <input
          type="hidden"
          name="sessionId"
          value={sessionId}
          onChange={() => {}}
        />
        <div className="flex flex-col w-full">
          <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
            Withdrawal Address
          </span>
          <Input 
            name="address" 
            value={withdrawalAddress}
            onChange={(e) => setWithdrawalAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center bg-[#E99F8C] rounded-[10px] mt-1.5 p-2 pr-1 gap-2">
          <span className="bg-[#853834] rounded-full w-4.5 h-4.5 px-2 flex items-center justify-center text-[#EED1B8] text-[12px]">
            i
          </span>
          <span className="text-[#853834] font-made-tommy text-[10px] font-bold leading-normal">
            Make sure the address accepts USDC on Avalanche (AVAX C-Chain).
            Funds cannot be recovered
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
              Withdrawal Amount
            </span>
            <Input
              type="number"
              name="amount"
              defaultValue={balance?.[selectedCurrency] || 0}
              onChange={(e) => setAmount(e?.target?.valueAsNumber || 0)}
              max={balance?.[selectedCurrency] || 0}
              min={0}
              step="any"
            />
            <div className="flex flex-col gap-0 mt-2">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Max:{" "}
                {formatNumber(balance?.[selectedCurrency] || 0, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                {selectedCurrency?.toUpperCase()}
              </span>
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Transaction fee:{" "}
                {formatNumber(Number(amount) * 0.02 || 0, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                {selectedCurrency?.toUpperCase()}
              </span>
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Will receive:{" "}
                {formatNumber(Number(amount) - Number(amount) * 0.02 || 0, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                {selectedCurrency?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <Button 
          className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257] mt-2"
          disabled={!isButtonEnabled}
          style={{ opacity: isButtonEnabled ? 1 : 0.66 }}
        >
          {isPending ? (
            <LoaderIcon className="size-5 inline" />
          ) : (
            <SendIcon color="#ffffff" className="w-3 h-3" />
          )}
          <span className="text-white font-made-tommy font-extrabold text-[12px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
            {isPending ? "Pending" : "Send It"}
          </span>
        </Button>
      </form>
    </div>
  );
};
