"use client";

import { useGeneral } from "@/app/_providers/generalProvider";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useEffect } from "react";

export default function FlappyPlayScreen() {
  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { sessionId, user } = useGeneral();
  const challenge_id = useMemo(
    () => searchParams.get("challenge_id"),
    [searchParams]
  );

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendMessage = () => {
      if (!iframe?.contentWindow) return;

      iframe.contentWindow.postMessage(
        { type: "INIT_DATA", sessionId, challenge_id, user },
        "*"
      );

      // console.log("Message sent to iframe");
    };

    // Wait a moment after load in case the iframe is not yet listening
    const handleLoad = () => {
      setTimeout(sendMessage, 500); // can be tuned
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [sessionId, challenge_id, user]);

  return (
    <iframe
      ref={iframeRef}
      id="unity-frame"
      src="https://flappydunk-webgl-orpin.vercel.app"
      width="100%"
      height="100%"
      className="border-0"
    />
  );
}
