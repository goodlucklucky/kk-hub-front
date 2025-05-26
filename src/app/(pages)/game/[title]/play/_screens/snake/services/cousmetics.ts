import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "@/../services/axios";

export interface ISkinRes {
  data: {
    data: ISkin[];
    total: number;
    size: number;
    start: number;
    end: number;
  };
  message: string;
}

export interface ISkin {
  id: string;
  name: string;
  description: string;
  price: number;
  is_default: boolean;
  skin_url: string;
  details: {
    icon: string;
    star: boolean;
    // rewards: {};
    isPopular: boolean;
    color: string;
  };
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  game_key: string;
  user_items: IUserSkin | null;
}

export interface IUserSkin {
  id: string;
  sessionId: string;
  snake_id: string;
  price: string;
  game_key: string;
  activated: boolean;
  purchase_details: {
    game_key: string;
    purchased_at: Date;
    payment_method: string;
  };
  created_at: Date;
  updated_at: Date;
}

export function useSkins(sessionId?: TSessionId) {
  return useQuery({
    queryKey: ["skins", sessionId],
    queryFn: () =>
      baseInstance
        .get<ISkinRes>(`/game-service/cosmetics/snake-skins`, {
          params: { sessionId, size: -1, sort_by: "-is_default,-created_at" },
        })
        .then((res) => res.data),
  });
}

export function useSkinActivate() {
  return useMutation({
    mutationKey: ["skin-activate"],
    mutationFn: ({ id }: { id: string }) =>
      baseInstance
        .post(`/game-service/cosmetics/user-snake-skins/${id}/activate`, {})
        .then((res) => res.data),
  });
}

export function useSkinDisactivate() {
  return useMutation({
    mutationKey: ["skin-disactivate"],
    mutationFn: ({ sessionId }: { sessionId: TSessionId }) =>
      baseInstance
        .post(
          `/game-service/cosmetics/user-snake-skins/${sessionId}/disactivate-all`,
          {}
        )
        .then((res) => res.data),
  });
}

export function useClaimFreeSkin() {
  return useMutation({
    mutationKey: ["claim-free-skin"],
    mutationFn: ({ id, sessionId }: { id: string; sessionId: TSessionId }) =>
      baseInstance
        .post<{
          message: string;
        }>(`/game-service/cosmetics/user-snake-skins/claim-free-skin`, {
          id,
          sessionId,
        })
        .then((res) => res.data),
  });
}
