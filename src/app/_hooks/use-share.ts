import { useCallback, useMemo } from "react";
import { useGeneral } from "../_providers/generalProvider";
import { trackEvent } from "../_lib/mixpanel";
import toast from "react-hot-toast";

export default function useShare() {
  const { sessionId } = useGeneral();

  const inviteUrl = useMemo(() => {
    const url = window?.location?.origin;
    return `${url}/?startapp=rs_${sessionId}`;
  }, [sessionId]);

  const handleCopy = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(inviteUrl);
      toast.success("Invite Link copied to clipboard");
      // saveAction(copyName);

      trackEvent("socialFi_copyLink_click", { sessionId });
    } catch {
      toast.error("Copy not supported");
    }
  }, [sessionId, inviteUrl]);

  return { handleCopy, inviteUrl };
}
