"use client";
import { Chessboard } from "react-chessboard";
import { cn } from "@/app/_lib/utils";
import Header from "../../(default)/_components/layout/header";
import { NavBar } from "../../(default)/_components/xp/bar";
import Image from "next/image";
import profile2 from "@assets/images/chess-profile-2.png";
import profile1 from "@assets/images/chess-profile-1.jpg";
import message from "@assets/svg/message.svg";
import otherdraw from "@assets/svg/otherdraw.svg";
import redign from "@assets/svg/resign.svg";
import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../../../services/store/usChassGameStore";

interface StockfishMessage {
  type: "message" | "error" | "ready";
  data: string;
}

export default function ChessBoard() {
  const { game, actions } = useGameStore();
  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  const stockfishRef = useRef<Worker | null>(null);
  const [, setIsStockfishReady] = useState(false);
  const [, setStockfishError] = useState<string | null>(null);

  const onDrop = (source: string, target: string) => {
    actions.clearError();
    const move = { from: source, to: target, promotion: "q" };
    return actions.makeMove(move);
  };

  useEffect(() => {
    // Create worker from public directory (CDN-based)
    try {
      const worker = new Worker("/workers/stockfish-worker.js");
      stockfishRef.current = worker;

      worker.onmessage = (event: MessageEvent<StockfishMessage>) => {
        const { type, data } = event.data;

        switch (type) {
          case "message":
            // console.log("Stockfish:", data);

            // Handle best move
            if (data.startsWith("bestmove")) {
              const bestMove = data.split(" ")[1];
              if (bestMove && bestMove !== "none") {
                const from = bestMove.substring(0, 2);
                const to = bestMove.substring(2, 4);
                const promotion = bestMove.length > 4 ? bestMove[4] : undefined;

                setTimeout(() => {
                  actions.makeMove({ from, to, promotion });
                  actions.setComputerThinking(false);
                }, 100);
              } else {
                actions.setComputerThinking(false);
              }
            }
            break;

          case "error":
            setStockfishError(data);
            actions.setComputerThinking(false);
            // console.error("Stockfish error:", data);
            break;

          case "ready":
            setIsStockfishReady(true);
            setStockfishError(null);
            // console.log("Stockfish ready!");
            break;
        }
      };

      worker.onerror = (error) => {
        const errorMessage = `Worker error: ${error.message}`;
        setStockfishError(errorMessage);
        // console.error(errorMessage);
      };

      // Send initial UCI command
      worker.postMessage("uci");
    } catch (error) {
      setStockfishError(`Failed to create worker: ${error}`);
      // console.error("Worker creation failed:", error);
    }

    return () => {
      if (stockfishRef.current) {
        stockfishRef.current.terminate();
        stockfishRef.current = null;
      }
    };
  }, [actions]);

  // const getComputerMove = () => {
  //   if (game.isGameOver() || !isStockfishReady || !stockfishRef.current) {
  //     console.log("Cannot get computer move:", {
  //       gameOver: game.isGameOver(),
  //       stockfishReady: isStockfishReady,
  //       workerExists: !!stockfishRef.current,
  //     });
  //     return;
  //   }

  //   actions.setComputerThinking(true);
  //   stockfishRef.current.postMessage(`position fen ${game.fen()}`);
  //   stockfishRef.current.postMessage("go depth 15");
  // };

  return (
    <div className=" w-screen bg-[url(/images/bg-chess-board.png)] bg-center bg-no-repeat pb-10">
      <div
        className={cn(
          "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
          "bg-[#808080]"
        )}
      >
        <Header />
      </div>
      <NavBar title={"Casual chess"} />
      <div className=" bg-[url(/images/bg-chess-board2.png)] bg-center bg-no-repeat bg-[length:100%_100%] h-[80%] p-3 mt-6 w-[92%] mx-[4%]">
        <h3 className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-bold">
          Casual
        </h3>
        <div className=" flex justify-between items-center mx-5 my-4">
          <div className="flex flex-col items-center justify-center">
            <Image
              className=" h-10 w-10 rounded-full"
              src={profile2}
              alt="profile-1"
            />
            <h3 className=" text-[#6E5C4F] text-[16px] font-light">
              Aishwarya
            </h3>
            <p className="text-black/45 text-[12px]  font-extralight">
              Level 2
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              className=" h-10 w-10 rounded-full"
              src={profile2}
              alt="profile-1"
            />
            <h3 className="text-black text-[12px]">00:45</h3>
            <p className="text-[#8A7D6B] text-[12px] border-1 bg-white/20 border-[#BABABA] rounded-2xl px-2">
              Manzi's Move
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              className=" h-10 w-10 rounded-full"
              src={profile1}
              alt="profile-1"
            />
            <h3 className=" text-[#6E5C4F] text-[16px] font-light">Manzi</h3>
            <p className="text-black/45 text-[12px] font-extralight">Level 2</p>
          </div>
        </div>

        {/* Chessboard with coordinate labels */}
        <div
          className={cn(
            "mx-2 p-1",
            "rounded-2xl",
            "bg-gradient-to-r from-[#FFE0BF] to-[#EBC6A8]"
          )}
        >
          <div className="flex justify-center items-center rounded-xl shadow-lg bg-black/50 ">
            <div className="relative">
              {/* Top coordinate labels (A-H) */}
              <div className="flex justify-center items-center h-4">
                <div
                  className="flex"
                  style={{
                    width: "270px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  {files.map((letter) => (
                    <div key={letter} className="flex-1 text-center">
                      <span className=" font-extralight text-[10px] text-white rounded">
                        {letter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                {/* Left rank numbers (8-1) */}
                <div className="flex flex-col">
                  {ranks.map((number) => (
                    <div
                      key={number}
                      className="flex items-center justify-center"
                      style={{ height: "33.75px" }}
                    >
                      <span className="font-extralight text-[10px] text-white rounded mr-1">
                        {number}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chessboard */}
                {/* <div className="rounded-xl shadow-lg p-4 bg-black/50"> */}
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  boardWidth={270}
                  showBoardNotation={false}
                  customDarkSquareStyle={{ backgroundColor: "#A6A6A6" }}
                  customLightSquareStyle={{ backgroundColor: "#ffffff" }}
                  customBoardStyle={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                />
                {/* </div> */}

                {/* Right rank numbers (8-1) */}
                <div className="flex flex-col ml-1">
                  {ranks.map((number) => (
                    <div
                      key={number}
                      className="flex items-center justify-center"
                      style={{ height: "33.75px" }}
                    >
                      <span className="font-extralight text-[10px] text-white rounded">
                        {number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom coordinate labels (A-H) */}
              <div className="flex justify-center items-center h-4">
                <div
                  className="flex"
                  style={{
                    width: "270px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  {files.map((letter) => (
                    <div key={letter} className="flex-1 text-center">
                      <span className="font-extralight text-[10px] text-white rounded">
                        {letter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game controls */}
        <div
          className={cn(
            "p-[3px] mt-7 mb-8",
            "rounded-2xl",
            "bg-gradient-to-r from-[#F7D8B7] to-[#EBC6A8]"
          )}
        >
          <div
            className={cn(
              "bg-[#DDC2A7]",
              "rounded-xl",
              "p-1 pr-7",
              "text-black flex justify-between items-center"
            )}
          >
            <div className=" bg-[#EED1B8] flex items-center gap-1 rounded-lg text-[#5F3F57] text-center text-[10px] font-made-tommy font-bold px-2 w-fit h-[28px]">
              <Image src={otherdraw} width={14} height={14} alt="other draw" />
              <p>Offer Draw</p>
            </div>
            <div className=" bg-[#491F36B2] flex items-center p-2 gap-1 rounded-xl font-made-tommy text-[7px] w-fit text-[#D7BCA3] font-[700] h-[15px]">
              <Image src={redign} alt="redign-icon" />
              <p>Redign</p>
            </div>
            <div className=" flex items-center">
              <Image src={message} width={18} height={16} alt="msg-icon" />
              <p className=" h-[15px] text-[9px] text-[#D7BCA3] font-made-tommy font-semibold rounded-lg bg-[#491F36B2] w-fit px-2.5">
                chat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
