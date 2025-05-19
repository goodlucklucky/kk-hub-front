"use client";

import { useEffect, useState } from "react";
import { configureUserInterceptor } from "../_utils/addInitData";
import { encryptRequest } from "../_utils/encryption";

export const SECRET_KEY =
  process.env.NEXT_PUBLIC_COMMON_KEY || "this-should-be-a-strong-secret-key";

export default function useUserEncrypt({
  sessionId,
  username,
}: {
  sessionId: TSessionId;
  username: TSessionId;
}) {
  const [encrypted, setEncrypted] = useState("");

  useEffect(() => {
    const loadWebApp = async () => {
      // console.log("loadWebApp");

      if (typeof window == "undefined" || !window) return;

      try {
        const user = { id: sessionId, username: username };
        const encrypt = encryptRequest(user, SECRET_KEY);
        const data = JSON.stringify(encrypt);

        configureUserInterceptor(data);
        setEncrypted(data);
      } catch {
        // console.error("Failed to set data ", error);
      }
    };

    const interval = setInterval(loadWebApp, 30000);

    return () => clearInterval(interval);
  }, [sessionId, username]);

  return { encrypted };
}
