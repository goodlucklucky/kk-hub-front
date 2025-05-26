"use client";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StaticImageData } from "next/image";
import { useGeneral } from "@/app/_providers/generalProvider";
import { IChallenge } from "../play/_screens/snake/services/challenges";
import {
  ChallengeStatusEnum,
  IChallengeResults,
  useChallenges,
  useOneChallenge,
} from "@/../services/game/challenges";

import DailyIcon from "@/app/_assets/images/Icon_ChallengeTab_Daily_Unselected.png";
import WeeklyIcon from "@/app/_assets/images/Icon_ChallengeTab_Weekly_Unselected.png";
import LightIcon from "@/app/_assets/images/light-icon.png";
import { useParams } from "next/navigation";
import { gameKeys } from "./constants/gameKeys";

type props = { children: React.ReactNode };

export const ChallengesContext = createContext<{
  challenges: IChallenge[];
  isLoading: boolean;
  refetchChallenges?: (
    _options?: RefetchOptions
  ) => Promise<QueryObserverResult<IChallengeResults, Error>>;

  activeChallenge?: IChallenge;
  setActiveChallenge?: (_id: string) => Promise<IChallenge | undefined>;
  refreshActiveChallenge?: () => Promise<IChallenge | undefined>;

  tabs?: { name: string; icon: StaticImageData }[];
  tab?: string;
  setTab?: Setter<string>;
  status?: ChallengeStatusEnum;
  setStatus?: Setter<ChallengeStatusEnum>;

  gameKey?: string;
}>({
  challenges: [],
  isLoading: false,
});

export function ChallengesProvider({ children }: props) {
  const tabs = useMemo(
    () => [
      { name: "instant", icon: LightIcon },
      { name: "daily", icon: DailyIcon },
      { name: "weekly", icon: WeeklyIcon },
    ],
    []
  );
  const [tab, setTab] = useState("daily");
  const [status, setStatus] = useState<ChallengeStatusEnum>(
    ChallengeStatusEnum.ACTIVE
  );
  const params = useParams();
  const title = useMemo(() => params?.title, [params?.title]);
  const gameKey = useMemo(
    () => gameKeys[title as keyof typeof gameKeys],
    [title]
  );

  const { sessionId } = useGeneral();
  const { mutateAsync: getChallenge } = useOneChallenge(
    sessionId,
    status,
    gameKey
  );
  const {
    data: challenges,
    isLoading,
    isFetching,
    isPending,
    refetch: refetchChallenges,
  } = useChallenges(sessionId, tab, status, undefined, gameKey);
  const [activeChallenge, changeActiveChallenge] = useState<
    IChallenge | undefined
  >();
  useEffect(() => {
    if (tab || status) refetchChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, status]);

  const setActiveChallenge = useCallback(
    async (id: string) => {
      try {
        let challenge = challenges?.data.find(
          (challenge) => challenge.id === id
        );
        if (!challenge) {
          const data = await getChallenge(id);
          challenge = data?.data;
        }

        changeActiveChallenge(challenge);
        refetchChallenges();
        return challenge;
      } catch {
        // console.error("error", error);
      }
    },
    [challenges?.data, getChallenge, refetchChallenges]
  );

  const refreshActiveChallenge = useCallback(async () => {
    if (!activeChallenge?.id) return;
    const data = await getChallenge(activeChallenge?.id);
    const challenge = data?.data;
    changeActiveChallenge(challenge);
    refetchChallenges();
    return challenge;
  }, [activeChallenge?.id, getChallenge, refetchChallenges]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshActiveChallenge();
      },
      3 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [refreshActiveChallenge]);

  return (
    <ChallengesContext.Provider
      value={{
        challenges: challenges?.data || [],
        isLoading: isLoading || isFetching || isPending,
        refetchChallenges,

        activeChallenge,
        setActiveChallenge,
        refreshActiveChallenge,

        tabs,
        tab,
        setTab,
        status,
        setStatus,

        gameKey,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
