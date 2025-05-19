import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";
import { create } from "zustand";

export interface IRaffle {
  sessionId: string;
  openNow: boolean;
}

export interface IEnterRaffle {
  prize: string;
  win: boolean;
  ticketNumber: number;
}

export interface IRafflePrize {
  id: string;
  sessionId: string;
  ticket_number: number;
  raffle_date: string;
  claimed: boolean;
  win: boolean;
  prize: {
    type: string;
    value: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IRaffleResult {
  ticket_number: number;
  prize: number;
}

export interface IRaffleEntry {
  id: string;
  sessionId: string;
  additional: number;
  daily_claimed: boolean;
  created_at: string;
  updated_at: string;
  tickets: IEnterRaffle[];
}

export function useClaimRaffle() {
  //   return useQuery({
  //     queryKey: ["raffle", sessionId],
  //     queryFn: () => baseInstance.post<IRaffle>("raffle/claim-ticket", ),
  //   });

  return useMutation({
    mutationKey: ["raffle"],
    mutationFn: (body: IRaffle) =>
      baseInstance
        .post<IRaffle>("bonus-service/raffle/claim-ticket", body)
        .then((res) => res.data),
  });
}

export function useGetUnclaimedRaffle() {
  return useMutation({
    mutationKey: ["raffle"],
    mutationFn: (sessionId?: TSessionId) =>
      baseInstance
        .get<{ data: IRafflePrize[] }>(
          `bonus-service/raffle/unclaimed-prizes`,
          {
            params: { sessionId },
          }
        )
        .then((res) => res.data),
  });
}

export function useGetRaffleEntry() {
  const setTickets = useRaffleStore((state) => state.setTickets);
  return useMutation({
    mutationKey: ["raffle"],
    mutationFn: async (sessionId?: TSessionId) => {
      const res = await baseInstance.get<{ data: IRaffleEntry }>(
        `bonus-service/raffle/user-entry`,
        {
          params: { sessionId },
        }
      );
      // .then((res) => res.data);
      setTickets(res.data.data.tickets);
    },
  });
}

export function useGetRaffleResults() {
  return useQuery({
    queryKey: ["raffle"],
    queryFn: () =>
      baseInstance
        .get<{ data: IRaffleResult[] }>("bonus-service/raffle/results")
        .then((res) => res.data),
  });
}

interface RaffleStore {
  ticket: IEnterRaffle[]; // Store the tickets
  setTickets: (tickets: IEnterRaffle[]) => void; // Function to update tickets
}

export const useRaffleStore = create<RaffleStore>((set) => ({
  ticket: [],
  setTickets: (ticket) => set({ ticket }), // Update tickets
}));

export function useEnterRaffle() {
  const setTickets = useRaffleStore((state) => state.setTickets);
  return useMutation({
    mutationKey: ["enter-raffle"],
    mutationFn: async (body: { sessionId: string }) => {
      const res = await baseInstance.post<{ data: IEnterRaffle[] }>(
        "bonus-service/raffle/enter",
        body
      );
      // .then((res) => setTickets(res.data.data));
      setTickets(res.data.data);
      return res.data.data;
    },
  });
}
