import { useState, useEffect } from "react";
import { useGameStore } from "../utils/useChessGameStore";

const useTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { setTime, setStartTime } = useGameStore();

  useEffect(() => {
    const startTime = Date.now();
    setStartTime(startTime);
  }, [setStartTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        setTime(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return { time: elapsedTime, formattedTime };
};

export default useTimer;
