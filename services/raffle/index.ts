import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface IRaffleEntry {
  entry: Entry | null;
  tickets: ITicket[];
  dailyClaimAvailable: boolean;
  additionalEntries: number;
  date: Date;
}

export interface Entry {
  id: string;
  sessionId: string;
  additional: number;
  daily_claimed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ITicket {
  prize: null;
  win: boolean;
  ticketNumber: number;
}

export function useGetRaffleUserEntries({
  sessionId,
}: {
  sessionId?: TSessionId;
}) {
  return useQuery({
    queryKey: ["raffle-user-entry", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: IRaffleEntry;
        }>("bonus-service/raffle/user-entry", { params: { sessionId } })
        .then((res) => res?.data?.data),
    enabled: !!sessionId,
  });
}

export function useClaimRaffle() {
  return useMutation({
    mutationFn: ({
      sessionId,
      openNow,
    }: {
      sessionId: TSessionId;
      openNow: boolean;
    }) =>
      baseInstance
        .post<{
          data: IRaffleEntry;
        }>("bonus-service/raffle/claim-ticket", { sessionId, openNow })
        .then((res) => res?.data),
  });
}

export interface IEnterRafflesRes {
  data: ITicket[];
}

export function useEnterUser() {
  return useMutation({
    mutationKey: ["enter-user"],
    mutationFn: ({ sessionId }: { sessionId: TSessionId }) =>
      baseInstance
        .post<IEnterRafflesRes>("bonus-service/raffle/enter", { sessionId })
        .then((res) => res?.data),
  });
}
