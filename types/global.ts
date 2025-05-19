import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React from "react";

declare global {
  namespace JSX {
    interface Element extends React.ReactElement {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
  type Refresher<T> = (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>

  type TSessionId = string | undefined;

  interface IUser {
    id: string;
    sessionId: string;
    username: string;
    photo_url: string;
    twitterUsername: string;
    twitterUserId: string;
    email: string;
    referrals?: any[];
    created_at: Date;
    updated_at: Date;
    bans?: {
      id: string;
      sessionId: string;
      game_key: string;
      reason: string;
      created_at: Date;
      updated_at: Date;
    }[];
  }
}
