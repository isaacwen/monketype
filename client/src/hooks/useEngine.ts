import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";
export type Mode = "singleplayer" | "multiplayer";

const COUNTDOWN_SECONDS = 5;

const useEngine = (textWindowSize: React.MutableRefObject<number>) => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("start");
  const [mode, setMode] = useState<Mode>("singleplayer");
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECONDS);
  // const { currentRowTyped, cursor, currentRowWords, clearTyped, updateWords } = useTypings(state !== "finish", textWindowSize);
  const { currentRowTyped, currentRowWords, nextRowWords, cursor, updateRows, resetWords, getStats: getStatsMain } = useWords(state !== "finish", textWindowSize);

  const isStarting = state === "start" && cursor > 0;

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

  return { state, mode, currentRowWords, nextRowWords, timeLeft, currentRowTyped, getStats, restart, updateRows };
}

export default useEngine;