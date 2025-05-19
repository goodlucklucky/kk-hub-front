import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export interface IExemptedUser {
  id: string;
  sessionId: string;
  created_at: string;
  updated_at: string;
}

export interface IExemptedUserResponse {
  data: IExemptedUser[];
  total: number;
  size: number;
  start: number;
  end: number;
}

export function useCheckBetaTester() {
  return useMutation({
    mutationKey: ["check-beta-tester"],
    mutationFn: (username?: string) =>
      baseInstance
        .get<{
          exists: boolean;
        }>(`/user-service/beta-testers/exists/${username || "undefined"}`)
        .then((res) => res.data),
  });
}

export function useGetExemptedUserDetails(sessionId: TSessionId) {
  return useQuery({
    queryKey: ["get-exempted-user-details", sessionId],
    queryFn: () =>
      baseInstance
        .get<{
          data: IExemptedUser;
        }>(`/game-service/exempted-user/${sessionId}`)
        .then((res) => res.data?.data),
  });
}

export interface IFeatureRes {
  message: string;
  data: IFeature;
}

export interface IFeature {
  id: string;
  name: string;
  key: string;
  status: string;
  description: string;
  details: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export function useFeatureStatus(key?: string) {
  return useQuery({
    queryKey: ["feature-status", key],
    queryFn: () =>
      baseInstance
        .get<IFeatureRes>(`/user-service/features/by-key/${key}`)
        .then((res) => res?.data?.data),
  });
}
