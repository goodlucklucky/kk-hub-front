"use client";

import UserProvider from "./userProvider";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useActiveAccount } from "thirdweb/react";
import useUserEncrypt from "../_hooks/use-user-encrypt";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Connect from "../_components/shared/connect";

interface ThirdWebProps {
  children: React.ReactNode;
}

export function ThirdWeb({ children }: ThirdWebProps) {
  const searchParams = useSearchParams();

  // const profile = useProfiles({ client: client });
  const account = useActiveAccount();
  const sessionId = useMemo<TSessionId>(
    () => `${account?.address || ""}`,
    [account?.address]
  );
  const username = useMemo<TSessionId>(
    () => `${account?.address || ""}`,
    [account?.address]
  );
  const startParam = useMemo(
    () => searchParams?.get("startapp") || "",
    [searchParams]
  );

  // console.log("profile", profile?.data);

  const { encrypted } = useUserEncrypt({
    sessionId: account?.address,
    username,
  });

  if (!account) return <Connect />;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 0,
        retry: false,
      },
    },
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider
          sessionId={sessionId ?? ""}
          username={username}
          startParam={startParam}
          encrypted={encrypted}
        >
          {children}
        </UserProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
