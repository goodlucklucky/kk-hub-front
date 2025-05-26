import { useEffect, useRef, useCallback, useState } from "react";

interface StockfishMessage {
  type: "message" | "error" | "ready";
  data: string;
}

interface UseStockfishReturn {
  sendCommand: (command: string) => void;
  isReady: boolean;
  lastMessage: string;
  error: string | null;
}

export const useStockfish = (): UseStockfishReturn => {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load worker from public directory
      workerRef.current = new Worker("/workers/stockfish-worker.js");

      workerRef.current.onmessage = (event: MessageEvent<StockfishMessage>) => {
        const { type, data } = event.data;

        switch (type) {
          case "message":
            setLastMessage(data);
            // console.log("Stockfish:", data);
            break;
          case "error":
            setError(data);
            // console.error("Stockfish error:", data);
            break;
          case "ready":
            setIsReady(true);
            setError(null);
            // console.log("Stockfish ready!");
            break;
        }
      };

      workerRef.current.onerror = (error) => {
        const errorMessage = `Worker error: ${error.message}`;
        setError(errorMessage);
        // console.error(errorMessage);
      };
    } catch (err) {
      setError(`Failed to create worker: ${err}`);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const sendCommand = useCallback((command: string): void => {
    if (workerRef.current) {
      workerRef.current.postMessage(command);
    } else {
      // console.warn("Worker not available");
    }
  }, []);

  return {
    sendCommand,
    isReady,
    lastMessage,
    error,
  };
};
