import { useEffect, useMemo, useRef } from "react";
import { useProfiles } from "thirdweb/react";
import { client } from "../_utils/thirdWebClient";
import { usePlayfull } from "../../../services/playfull";

const socialsIdentifier = {
  email: ["email", "email"],
  google: ["email", "email"],
  telegram: ["id", "telegramId"],
  discord: ["id", "discordId"],
  apple: ["id", "appleId"],
} as const;

type TType = keyof typeof socialsIdentifier;

type UseSocialDataProps = {
  sessionId?: string;
  wallet_address?: string;
};

export const useSocialData = ({
  sessionId,
  wallet_address,
}: UseSocialDataProps) => {
  const { data } = useProfiles({ client });
  const { mutateAsync: playfull } = usePlayfull({});

  const controllerRef = useRef<AbortController | null>(null);

  const socials = useMemo<{ [key in TType]?: string }>(() => {
    if (!data) return {};

    const entries = data.map((profile) => {
      const { type, details } = profile;
      const identifier = socialsIdentifier?.[type as TType]?.[0] as
        | "id"
        | "email";
      if (!identifier || !details[identifier]) return [];
      return [type, details[identifier]];
    });

    return Object.fromEntries(entries) as { [key in TType]?: string };
  }, [data]);

  useEffect(() => {
    if (!sessionId) return;

    const walletAddress = wallet_address;
    const socialData: Record<string, string> = Object.fromEntries(
      Object.entries(socials).map(([type, value]) => {
        const key = socialsIdentifier?.[type as TType]?.[1];
        return [[key], value];
      })
    );

    const body = { userId: sessionId, walletAddress, ...socialData };

    const handlePlayfull = async () => {
      try {
        if (controllerRef?.current?.signal) return;

        controllerRef.current = new AbortController();
        controllerRef.current.signal.onabort = () => {
          controllerRef.current?.abort();
        };

        await playfull({
          body: body as any,
          signal: controllerRef.current.signal,
        });
      } catch {
        // console.error("Failed to set data ", error);
      } finally {
        controllerRef.current = null;
      }
    };

    handlePlayfull();

    return () => {
      controllerRef?.current?.abort?.();
    };
  }, [sessionId, wallet_address, socials, controllerRef, playfull]);

  return { socials };
};
