import { useMutation } from "@tanstack/react-query";
import { localInstance } from "../axios";

export function usePlayfull({
  onSuccess,
}: {
  onSuccess?: () => Promise<unknown>;
}) {
  return useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async ({
      signal,
      body,
    }: {
      signal?: AbortSignal;
      body?: Record<string, string>;
    }) => localInstance?.post(`/playfull`, body, { signal }),
    onSuccess,
  });
}
