import { floorNumber } from "@/app/_utils/number";
import { CurrencyIcons, EChallengeCurrency } from "../services/challenges";

export function getPrizeString(
  prize: number | string,
  currency: EChallengeCurrency = EChallengeCurrency.kokos
) {
  const amount = typeof prize == "number" ? floorNumber(prize, 2) : prize;

  if (currency == EChallengeCurrency.usd)
    return `${CurrencyIcons[currency]}${amount}`;

  return `${amount} ${CurrencyIcons[currency]}`;
}

export function availableBalance(
  amount: { [_key in EChallengeCurrency]?: number },
  currency: EChallengeCurrency = EChallengeCurrency.kokos
) {
  return amount[currency] || 0;
}
