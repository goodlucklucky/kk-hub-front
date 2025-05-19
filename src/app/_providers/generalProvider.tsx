"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useAuth } from "../_hooks/use-auth";
import { initMixpanel, trackEvent } from "../_lib/mixpanel";
import useDisableInspect from "../_hooks/use-disable-inspect";
import {
  IUserWallet,
  IUserWalletRes,
  useUserWallet,
} from "../../../services/banking/wallet";
import { IInitialPoints, useInitialPoints } from "../../../services/user";
import { IUsdt, useUsdt } from "../../../services/usdt";
import { useSocialData } from "../_hooks/use-social-data";
import { IBonusCompletion } from "../../../services/bonus";

export interface IGeneralContext {
  user?: IUser | null;
  sessionId?: TSessionId;
  addMyUsdt?: (_score: number) => void;
  isLoadingMyUsdt?: boolean;
  refreshMyUsdt?: (
    _options?: RefetchOptions
  ) => Promise<QueryObserverResult<{ data: IUsdt }, Error>>;

  userWallet?: IUserWallet;
  isUserWalletPending?: boolean;
  refreshUserWallet?: Refresher<IUserWalletRes>;
  myScore?: number;
  addMyScore?: (_score: number) => void;
  refreshMyScore?: (
    _options?: RefetchOptions
  ) => Promise<QueryObserverResult<IInitialPoints, Error>>;
  isLoadingMyScore?: boolean;
  myUsdt?: number;
  isLoadingCurrentWallet?: boolean;
  encrypted?: string;

  completionStatus?: IBonusCompletion;
  getCompletionStatus?: (
    _options?: RefetchOptions
  ) => Promise<QueryObserverResult<{ data: IBonusCompletion }, Error>>;
}

export const GeneralContext = createContext<IGeneralContext>({});

export function GeneralProvider({
  children,
  initialUserData,
  sessionId,
  username,
  encrypted,
}: {
  children: React.ReactNode;
  initialUserData: { user: IUser; type?: string } | null;
  sessionId: string;
  username?: string;
  betaTester?: { exists: boolean };
  encrypted?: string;
}) {
  const [user, setUser] = useState(initialUserData?.user ?? null);
  const {
    data: walletRes,
    refetch: refreshWaller,
    isPending: walletPending,
  } = useUserWallet({ sessionId });
  const [myScore, setMyScore] = useState(0);
  // const [isMuted, setIsMuted] = useState(false);
  // const [completionStatus, setCompletionStatus] = useState<
  //   IBonusCompletion | undefined
  // >();

  // Queries
  const { isPending: isLoadingMyScore, refetch: refreshMyScore } =
    useInitialPoints(sessionId);
  const { isPending: isLoadingMyUsdt, refetch: refreshMyUsdt } = useUsdt({
    sessionId,
  });

  // const { data: completionStatusData } = useBonusCompletion({ sessionId });
  // const { data: challengesPlayedData, refetch: getChallengesPlayed } =
  //   useGetATH(sessionId);
  // const { data: retention, refetch: getRetention } =
  //   useUserRetention(sessionId);
  // const { data: multiplier, refetch: getMultiplier } = useMultiplier(sessionId);

  // functions
  const addMyScore = useCallback((amount: number) => {
    setMyScore((p) => {
      const newScore = p + (Number(amount) || 0);
      // mixpanel?.track('Score Updated', { score: newScore });
      return newScore;
    });
  }, []);

  const addMyUsdt = useCallback((amount: number) => {
    setMyUsdt((p) => {
      const newUsdt = Math.abs(p + (Number(amount) || 0));
      // mixpanel?.track('USDT Updated', { usdt: newUsdt });
      return newUsdt;
    });
  }, []);
  const userWallet = useMemo(() => walletRes?.wallet, [walletRes?.wallet]);

  useLayoutEffect(() => {
    initMixpanel();
  }, []);

  useEffect(() => {
    if (sessionId && initialUserData?.user) {
      setUser(initialUserData?.user);
      trackEvent("User Login", {
        sessionId,
        username,
      });
    }
  }, [sessionId, username, initialUserData?.user]);

  useAuth({ walletAddress: sessionId });
  useDisableInspect({ sessionId });
  useSocialData({ sessionId, wallet_address: userWallet?.wallet_address });

  const [myUsdt, setMyUsdt] = useState(0);

  return (
    <GeneralContext.Provider
      value={{
        user,
        sessionId,

        userWallet,
        isUserWalletPending: walletPending,
        refreshUserWallet: refreshWaller,
        myScore,
        addMyScore,
        refreshMyScore,
        isLoadingMyScore,
        myUsdt,
        addMyUsdt,
        isLoadingMyUsdt,
        refreshMyUsdt,

        encrypted,
      }}
    >
      <Suspense fallback={<></>}>
        {/* <SplashScreen /> */}
        {children}
      </Suspense>
    </GeneralContext.Provider>
  );
}
