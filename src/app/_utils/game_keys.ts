import { gameKeys } from "../(pages)/game/[title]/tournaments/constants/gameKeys";

export function getNameByKey(game_key: string) {
  const game = Object?.entries?.(gameKeys)?.find?.(
    ([_, value]) => value == game_key
  );
  return game?.[0];
}
