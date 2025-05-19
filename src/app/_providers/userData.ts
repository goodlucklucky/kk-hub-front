import { decodeInviteKey } from "../_utils/keys";
import { encryptRequest } from "../_utils/encryption";
import { SECRET_KEY } from "../_hooks/use-user-encrypt";
import { baseInstance, localInstance } from "../../../services/axios";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async (params: {
  sessionId: string;
  username?: string;
  referrerSessionId?: string;
  is_bot?: boolean;
}) => {
  try {
    const user = {
      id: params?.sessionId,
      username: params?.username,
      wallet_address: params?.sessionId,
    };
    const encrypt = encryptRequest(user, SECRET_KEY);
    const data = JSON.stringify(encrypt);

    const response = await localInstance.post<{
      user: IUser | null;
      isNew?: boolean;
    }>("/user", params, { headers: { ["x-encrypted-user"]: data } });
    return response?.data;
  } catch {
    // console.error("Error fetching user:", error);
    return { user: null, isNew: false };
  }
};

export const fetchIsBetaTester = async (username?: string) => {
  try {
    const response = await baseInstance.get<{
      exists: boolean;
    }>(`/user-service/beta-testers/exists/${username || "undefined"}`);
    return response.data;
  } catch {
    // console.error("Error fetching beta tester status:", error);
    return { exists: false };
  }
};

interface UseUserOptions {
  sessionId?: string;
  username?: string;
  startParam?: string;
  is_bot?: boolean;
}

export const useUser = ({
  sessionId,
  username,
  startParam,
  is_bot = false,
}: UseUserOptions) => {
  return useQuery({
    queryKey: ["user", sessionId, username, startParam],
    queryFn: async () => {
      if (!sessionId) throw new Error("No User Found");

      const [first] = `${startParam || ""}`.split("___");
      const [type, code] = `${first}`.split("_");
      let referral = "";

      if (type === "rs") referral = code;
      else if (type?.toLowerCase() === "gi") {
        const { sessionId: inviter } = decodeInviteKey(code);
        if (inviter) referral = `${inviter}`;
      }

      const [{ user, isNew }, betaTester] = await Promise.all([
        fetchUser({
          sessionId,
          username,
          referrerSessionId: referral,
          is_bot,
        }) || {},
        fetchIsBetaTester(username),
      ]);

      return {
        user,
        isNew,
        betaTester,
        type: type === "rs" ? "invite" : undefined,
      };
    },
    enabled: !!sessionId, // Only run if sessionId is defined
    staleTime: 1000 * 60 * 5, // Optional caching
  });
};
