import { useMutation } from "@tanstack/react-query";
import { baseInstance } from "../axios";

export function useMigrateUser() {
  return useMutation({
    mutationKey: ["migrate-user"],
    mutationFn: (body: { sessionId: string; wallet_address: string }) =>
      baseInstance
        .post(`/user-service/otps/register`, body)
        .then((res) => res.data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (body: { sessionId: string; code: string }) =>
      baseInstance
        .post(`/user-service/otps/verify`, body)
        .then((res) => res.data),
  });
}
