import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import useCountdownTimer from "./useCountdownTimer";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const COUNTDOWN_SECONDS = 5;

const useEngine = (textWindowSize: React.MutableRefObject<number>) => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("start");
  
  const [socket, setSocket] = useState<Socket>();
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECONDS);
  // const { currentRowTyped, cursor, currentRowWords, clearTyped, updateWords } = useTypings(state !== "finish", textWindowSize);
  const { currentRowTyped, currentRowWords, nextRowWords, cursor, updateRows, resetWords, getStats: getStatsMain } = useWords(state !== "finish", textWindowSize);

  const isStarting = state === "start" && cursor > 0;

  useEffect(() => {
    const s = io("http://localhost:3001");
    console.log("receiving socket", s);
    setSocket(s);

    return () => {
      s.disconnect();
    }
  }, []);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("time is up...");
      setState("finish");
      navigate("/results");
    }
  }, [timeLeft]);

  const getStats = useCallback(() => {
    return getStatsMain(COUNTDOWN_SECONDS);
  }, [getStatsMain]);

  const restart = useCallback(() => {
    console.log("restarting...");
    resetCountdown();
    setState("start");
    resetWords(textWindowSize);
    console.log("window size: ", textWindowSize);
  }, [resetWords, resetCountdown]);

  // const changeMode = useCallback(() => {
  //   if (mode === "singleplayer") {
  //     setMode("multiplayer");
  //   } else {
  //     setMode("singleplayer");
  //   }
  // }, [mode, setMode])

  const verifyRoom = async (id: string) => {
    console.log("socket", socket);
    socket?.emit("check-room-exists", id);
    socket?.on("check-room-exists-response", (exists: boolean) => {
      console.log("room ", id, " exists: ", exists)
      if (!exists) {
        navigate("/");
      }
    })
  }

  return { state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, getStats, restart, updateRows, verifyRoom };
}

export default useEngine;