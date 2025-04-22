import { useMutation, useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export function useStoreItems(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["store-items", sessionId],
    queryFn: () =>
      baseInstance
        .get<{ data: IStoreItemsRes }>(`/nft-service/store/items`, {
          params: { sessionId },
        })
        .then((res) => res.data),
  });
}

export interface IStoreItemsRes {
  data: IStoreItem[];
  total: number;
  size: number;
  start: number;
  end: number;
}

export interface IStoreItem {
  id: string;
  name: string;
  description: string;
  price: string;
  details: {
    multiplier: number | string;
    days_unlockable: number;
    icon?: string;
    star?: boolean;
    isPopular?: boolean;
    rewards?: {
      kokos: number;
      spins: number;
      collectibles: number;
    };
  };
  type_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  type: IStoreItemType;
  user_items: IUserItem[];
}

export interface IStoreItemType {
  id: string;
  name: string;
  key: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserItem {
  id: string;
  sessionId: string;
  item_id: string;
  price: string;
  activated: boolean;
  purchase_details: {
    purchased_at: Date;
    payment_method: string;
    current_day?: number;
    last_update?: Date;
    activated_at?: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export function useBuyStore() {
  return useMutation({
    mutationKey: ["store-items"],
    mutationFn: ({
      title,
      description,
      price,
      item_id,
      payment_item_type,
    }: {
      title: string;
      description: string;
      price: number;
      item_id: string;
      payment_item_type?: "store" | "snake-skin";
    }) =>
      baseInstance
        .post<{ data: string }>(
          `/bot-snake-service/transactions/generate-invoice`,
          {
            title,
            description,
            price,
            item_id,
            payment_item_type,
          }
        )
        .then((res) => res.data),
  });
}

export function useEditUserItem() {
  return useMutation({
    mutationKey: ["edit-user-item"],
    mutationFn: ({ id, body }: { id: string; body: IEditUserItemBody }) =>
      baseInstance
        .patch<{ message: string }>(`/nft-service/store/user-items/${id}`, body)
        .then((res) => res.data),
  });
}

export function useActivateUserItem() {
  return useMutation({
    mutationKey: ["activate-user-item"],
    mutationFn: ({ id }: { id: string }) =>
      baseInstance
        .post<{ message: string }>(
          `/nft-service/store/user-items/${id}/activate`,
          {}
        )
        .then((res) => res.data),
  });
}

export interface IEditUserItemBody {
  sessionId?: string;
  item_id?: string;
  price?: number;
  activated?: boolean;
  purchase_details?: {
    purchased_at?: string;
    payment_method?: string;
    current_day?: number;
    last_update?: Date;
  };
}

export function useClaimCollectable() {
  return useMutation({
    mutationKey: ["claim-collectable"],
    mutationFn: ({
      sessionId,
      counts = 1,
      details = {},
    }: {
      sessionId: TSessionId;
      counts?: number;
      details?: Record<string, any>;
    }) =>
      baseInstance
        .post(`/nft-service/collectables`, { sessionId, counts, details })
        .then((res) => res.data),
  });
}
