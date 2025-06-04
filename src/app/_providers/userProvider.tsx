"use client";

import React, { createContext, useContext } from "react";
import UserNotFound from "../_components/shared/not/found";
import UserNotFoundBanned from "../_components/shared/not/found-banned";
import { useUser } from "./userData";
import { GeneralProvider } from "./generalProvider";
import WalletProvider from "./wagmiProvider";
import { TokenProvider } from "../(pages)/(default)/_context/tokenContext";
import { ThirdwebValuesProvider } from "../(pages)/(default)/_context/thirdwebContext";

export type ServerUserWrapperProps = {
  children: React.ReactNode;
  sessionId: string;
  username?: string;
  startParam?: string;
  encrypted?: string;
};

type UserContextType = {
  user: IUser | null;
  type: string | null;
  refetch?: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within <UserProvider />");
  return context;
};

export default function UserProvider({
  children,
  sessionId,
  username,
  startParam,
  encrypted,
}: ServerUserWrapperProps) {
  const { data, error, isLoading, refetch } = useUser({
    sessionId,
    startParam,
  });

  const node_env = process.env.NODE_ENV;
  const user = { ...(data?.user || {}) };

  // console.log("UserProvider", data);

  if (
    // !user?.sessionId ||
    isLoading
  )
    return null;

  if (node_env !== "development" && (!data?.user || error))
    return <UserNotFound />;

  const gameKey = "snake_v2";
  if (data?.user?.bans?.some((b) => ["all", gameKey].includes(b?.game_key)))
    return <UserNotFoundBanned />;

  // if (node_env !== "development" && !data?.betaTester?.exists)
  //   return <UserNotTester />;

  delete user.bans;

  return (
    <UserContext.Provider
      value={{
        user: user as IUser,
        type: data?.type || null,
        refetch,
      }}
    >
      <WalletProvider>
        <ThirdwebValuesProvider>
          <TokenProvider>
            <GeneralProvider
              initialUserData={{ user: user as IUser, type: data?.type }}
              sessionId={sessionId}
              username={username}
              betaTester={data?.betaTester}
              encrypted={encrypted}
            >
              {children}
            </GeneralProvider>
          </TokenProvider>
        </ThirdwebValuesProvider>
      </WalletProvider>
    </UserContext.Provider>
  );
}
