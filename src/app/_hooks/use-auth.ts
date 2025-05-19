"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useAuth({ walletAddress }: { walletAddress: string }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated" && walletAddress) {
      const login = async () => {
        const result = await signIn("credentials", {
          walletAddress,
          redirect: false,
        });

        // console.log('result', result);

        if (result?.error)
          toast.error(`Authentication failed: ${result.error}`);
      };

      login();
    }

    return () => {};
  }, [walletAddress, status]);

  return { session, status, isAuthenticated: status === "authenticated" };
}
