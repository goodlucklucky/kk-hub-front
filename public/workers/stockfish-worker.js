// Browser-compatible Stockfish worker
let engine = null;
let isInitialized = false;

// Load Stockfish from CDN
importScripts("https://cdn.jsdelivr.net/npm/stockfish@16.0.0/stockfish.js");

const initStockfish = () => {
  try {
    if (typeof Stockfish !== "undefined" && !isInitialized) {
      engine = Stockfish();
      isInitialized = true;

      engine.onmessage = (line) => {
        postMessage({ type: "message", data: line });

        if (line.includes("uciok")) {
          postMessage({ type: "ready", data: "UCI ready" });
        }

        if (line.includes("readyok")) {
          postMessage({ type: "ready", data: "Engine ready" });
        }
      };

      // Initialize UCI
      engine.postMessage("uci");
    } else if (typeof Stockfish === "undefined") {
      throw new Error("Stockfish not loaded from CDN");
    }
  } catch (error) {
    postMessage({
      type: "error",
      data: `Init failed: ${error.message}`,
    });
  }
};

// Initialize after CDN loads
setTimeout(initStockfish, 500);

onmessage = (event) => {
  if (engine && isInitialized) {
    engine.postMessage(event.data);
  } else {
    // Retry once
    setTimeout(() => {
      if (engine && isInitialized) {
        engine.postMessage(event.data);
      } else {
        postMessage({
          type: "error",
          data: `Engine not ready: ${event.data}`,
        });
      }
    }, 1000);
  }
};

self.onerror = (error) => {
  postMessage({
    type: "error",
    data: `Worker error: ${error.message}`,
  });
};
