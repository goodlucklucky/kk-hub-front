import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance, localInstance } from "../axios";

export function useChallenges(
  sessionId?: TSessionId,
  type: string = "daily",
  status: ChallengeStatusEnum = ChallengeStatusEnum.ACTIVE,
  dates: { min?: string; max?: string } = {},
  gameKey: string = "1m1"
) {
  return useQuery({
    queryKey: ["challenges", sessionId, type, status, dates, gameKey],
    queryFn: () =>
      baseInstance
        .get<IChallengeResults>(`/game-service/challenges`, {
          params: {
            sessionId,
            type,
            size: -1,
            status,
            is_active: true,
            sort_by: "entry_fee,prize",
            minDate: dates?.min,
            maxDate: dates?.max,
          },
          headers: { "x-game-key": gameKey },
        })
        .then((res) => res.data),
  });
}

export function useMultiplerChallenges(
  sessionId?: TSessionId,
  type: string = "daily",
  status: ChallengeStatusEnum = ChallengeStatusEnum.ACTIVE,
  dates: { min?: string; max?: string } = {},
  gameKeys: string[] = ["1m1"]
) {
  return useQuery({
    queryKey: ["challenges", sessionId, type, status, dates, gameKeys],
    queryFn: async () =>
      Promise.all(
        gameKeys.map((key) =>
          baseInstance
            ?.get<IChallengeResults>(`/game-service/challenges`, {
              params: {
                sessionId,
                type,
                size: -1,
                status,
                is_active: true,
                sort_by: "entry_fee,prize",
                minDate: dates?.min,
                maxDate: dates?.max,
              },
              headers: { "x-game-key": key },
            })
            .then((res) => res?.data)
        )
      ),
  });
}

export interface IChallengeResults {
  data: IChallenge[];
  total: number;
  size: number;
  start: number;
  end: number;
}

export enum EChallengeCurrency {
  kokos = "kokos",
  usd = "USD",
  usdt = "USDT",
}

export const CurrencyIcons: { [key in EChallengeCurrency]: string } = {
  kokos: "🥥",
  USD: "$",
  USDT: "USDT",
};

export interface IChallenge {
  id: string;
  name: string;
  type: "daily" | "weekly" | "instant" | string;
  description: string;
  prize: number | null;
  currency: EChallengeCurrency;
  entry_fee: number;
  max_participations: number | null;
  is_active: boolean;
  game_key: string;
  details: {
    total_attempts: unknown;
    color: string;
    end_time?: Date;
  };
  created_at: Date;
  updated_at: Date;
  scores?: IUserScore[];
  score_summary?: {
    prize?: number;
    minimumPoints?: number;
    yourPosition?: number;
    minScoreToBeat?: number;
    // added start
    minPrizeToBeat?: number;
    minTimeToBeat?: number;
    totalPrizes?: number;
    totalWinners?: number;
    // added end
    time?: number;
    paid?: boolean;
    highPrize?: number;
    myLatestScore?: number;
    maxPrize?: number;
    last_attempt?: Date;
    myLatestHighScore?: number;
    yourTotalScore?: number;
    participationCount?: number;
    estimatedPrize?: number;
    entryFee?: number;
    highestScore?: number;
    freeEntryBonus?: number;
    total_attempts?: number;
  };
  wallet: {
    id: string;
    challenge_id: string;
    backend_wallet: string;
    day: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface IUserScore {
  sessionId: string;
  last_participation: Date;
  // details: {};
  user_id: number;
  score: number;
  challenge_id: string;
  created_at: Date;
  updated_at: Date;
}

export function useOneChallenge(
  sessionId?: TSessionId,
  status?: ChallengeStatusEnum,
  gameKey: string = "1m1"
) {
  return useMutation({
    mutationKey: ["challenges", sessionId, status, gameKey],
    mutationFn: (id: string) =>
      baseInstance
        .get<IOneChallengeResults>(`/game-service/challenges/${id}/get`, {
          params: { sessionId, status },
          headers: { "x-game-key": gameKey },
        })
        .then((res) => res.data),
  });
}

export function useGetChallenge(
  id: string,
  sessionId?: TSessionId,
  status?: ChallengeStatusEnum,
  gameKey: string = "1m1"
) {
  return useQuery({
    queryKey: ["challenges", id, sessionId, status, gameKey],
    queryFn: () =>
      baseInstance
        .get<IOneChallengeResults>(`/game-service/challenges/${id}/get`, {
          params: { sessionId, status },
          headers: { "x-game-key": gameKey },
        })
        .then((res) => res.data),
  });
}

export interface IOneChallengeResults {
  data: IChallenge;
}

export function usePostScore2() {
  return useMutation({
    mutationKey: ["post-score"],
    mutationFn: (body: IPostScore) =>
      baseInstance
        .post<IPostScoreResults>(`/game-service/challenges/score`, body)
        .then((res) => res.data),
  });
}

export function usePostScore() {
  return useMutation({
    mutationKey: ["post-score"],
    mutationFn: (body: IPostScore) =>
      localInstance
        .post<IPostScoreResults>(`/score`, body)
        .then((res) => res.data),
  });
}

export function usePayFee({
  onSuccess,
}: {
  onSuccess?: (
    data: any,
    variables: { id: string; sessionId: TSessionId },
    context: unknown
  ) => Promise<unknown> | unknown;
}) {
  return useMutation({
    mutationKey: ["pay-fee"],
    onSuccess,
    mutationFn: ({ id, sessionId }: { id: string; sessionId: TSessionId }) =>
      baseInstance
        .post(`/game-service/challenges/${id}/${sessionId}/pay-fee`, {})
        .then((res) => res.data),
  });
}

export function usePayFeeV2({
  onSuccess,
}: {
  onSuccess?: (
    data: any,
    variables: { id: string; sessionId: TSessionId },
    context: unknown
  ) => Promise<unknown> | unknown;
}) {
  return useMutation({
    mutationKey: ["pay-fee-v2"],
    onSuccess,
    mutationFn: ({
      id,
      sessionId,
      txHash,
    }: {
      id: string;
      sessionId: TSessionId;
      txHash: string;
    }) =>
      baseInstance
        .post(`/game-service/challenges/${id}/${sessionId}/pay-fee-v2`, {
          txHash,
        })
        .then((res) => res.data),
  });
}

export interface IPostScore {
  challenge_id: string;
  sessionId: TSessionId;
  score: number;
  status: string;
  details: {
    play_time: number;
    scores: number;
  };
}
export enum ChallengeStatusEnum {
  ACTIVE = "active",
  FINISHED = "finished",
}

export interface IPostScoreResults {
  data: {
    challenge_id: string;
    sessionId: string;
    score: number;
    last_participation: Date;
    details: { play_time: number };
    id: string;
    created_at: Date;
    updated_at: Date;
  };
  details: IPostScoreResultsDetails;
}

export interface IPostScoreResultsDetails {
  topScore: number;
  scoreToQualify: number;
  eligible: boolean;
  minimumPoints: number;
  participationCount: number;
  maxParticipations: null;
  estimatedPrize: number;
  maxPrize: number;
  freeEntryBonus: number;
}

export function useGetEstimatedPrize() {
  return useMutation({
    mutationKey: ["get-estimated-prize"],
    mutationFn: (body: IGetEstimatedPrize) =>
      baseInstance
        .post(`/game-service/challenges/estimated-prize`, body)
        .then((res) => res.data),
  });
}

export interface IGetEstimatedPrize {
  challenge_id: string;
  sessionId: TSessionId;
  score: number;
}

export function useGetATH(sessionId?: TSessionId) {
  return useQuery({
    queryKey: ["ath", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: { ath: number; gamesPlayed: number; days: number };
        }>(`/game-service/challenges/score/ath`, { params: { sessionId } })
        .then((res) => res.data),
  });
}

export function useChallengesCount(sessionId?: TSessionId) {
  return useQuery({
    queryKey: ["challenges-count", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: { count: number };
        }>(`/game-service/score/challenge-count/${sessionId}`)
        .then((res) => res.data),
  });
}

export function useUserPrize() {
  return useMutation({
    mutationKey: ["user-unclaimed-prize"],
    mutationFn: (sessionId?: TSessionId) =>
      baseInstance
        .get<IUnclaimedResponse>(
          `/game-service/challenges/score/unclaimed/${sessionId}`,
          { params: { sessionId } }
        )
        .then((res) => res.data),
  });
}

export interface IUnclaimedResponse {
  sessionId: string;
  unclaimedPrizes: {
    challengeId: string;
    rank: number;
    prizeAmount: number;
    currency: EChallengeCurrency;
    score: number;
    topScore: number;
    createdAt: Date;
  }[];
}

export function useUserPrizeClaim() {
  return useMutation({
    mutationKey: ["user-prize-claim"],
    mutationFn: (sessionId?: TSessionId) =>
      baseInstance
        .post(`/game-service/challenges/score/collect`, { sessionId })
        .then((res) => res.data),
  });
}
