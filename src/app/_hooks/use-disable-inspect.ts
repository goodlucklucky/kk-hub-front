"use client";

import { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { baseInstance } from "../../../services/axios";

export default function useDisableInspect({
  sessionId,
}: {
  sessionId: TSessionId;
}) {
  const node_env = useMemo(() => process.env.NODE_ENV, []);

  const saveAction = useCallback(
    async (name: string, details: { [key: string]: any } = {}) => {
      baseInstance
        .post(`/activity-service/activities`, {
          sessionId,
          activityType: name,
          pointsEarned: 0,
          details,
          metadata: {},
        })
        .then((response) => {
          // console.log(`Action ${name} tracked for session ${sessionId}`);
          return response.data;
        })
        .catch(() => {
          // console.error("Failed to track action:", error);
        });

      return true;
    },
    [sessionId]
  );

  useEffect(() => {
    if (node_env == "development") return;

    const disableRightClick = async (e: MouseEvent) => {
      e.preventDefault();
      saveAction("right_click");
      toast.error("Right click is disabled");
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, [saveAction, node_env]);

  useEffect(() => {
    if (node_env == "development") return;

    const disableDevToolsShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        saveAction("dev_tools");
        toast.error("Dev tools are disabled");
      }
    };
    document.addEventListener("keydown", disableDevToolsShortcuts);
    return () =>
      document.removeEventListener("keydown", disableDevToolsShortcuts);
  }, [saveAction, node_env]);

  return {};
}
