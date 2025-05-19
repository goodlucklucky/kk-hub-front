export function floorNumber(num: number, precision: number = 2) {
  return Math.floor(num * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function roundNumber(num: number, precision: number = 2) {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function formatBigNumber(
  number: number,
  precision: number = 2,
  round: boolean = true
) {
  const format = (value: number, suffix: string) => {
    const formatted = value.toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + suffix
      : formatted + suffix;
  };

  if (number >= 1e9) return format(number / 1e9, "B");
  else if (number >= 1e6) return format(number / 1e6, "M");
  else if (number >= 1e3) return format(number / 1e3, "K");
  else {
    if (round) return roundNumber(number, precision);
    else return floorNumber(number, precision);
  }
}

export function formatNumber(
  number: number | string,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("en-US", options).format(Number(number));
}

export function shuffleArray<T>(arr: T[]) {
  const array = [...arr];
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// export function getPrizeString(
//   prize: number | string,
//   currency: EChallengeCurrency = EChallengeCurrency.kokos
// ) {
//   const amount = typeof prize == "number" ? floorNumber(prize, 2) : prize;

//   if (currency == EChallengeCurrency.usd)
//     return `${CurrencyIcons[currency]}${amount}`;

//   return `${amount} ${CurrencyIcons[currency]}`;
// }

// export function availableBalance(
//   amount: { [_key in EChallengeCurrency]?: number },
//   currency: EChallengeCurrency = EChallengeCurrency.kokos
// ) {
//   return amount[currency] || 0;
// }
