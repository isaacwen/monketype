import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCountdownTimer from "./useCountdownTimer";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";
export const times = [15, 30, 60, 120] as const;
export type Times = typeof times[number];

const useEngine = (textWindowSize: React.MutableRefObject<number>) => {
  const navigate = useNavigate();
  // const testTime = useRef<Times>(30);
  const [testTime, setTestTime] = useState<Times>(30);
  const [state, setState] = useState<State>("start");
  const [user, setUser] = useState<string | null>(null);
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(testTime);
  // const { currentRowTyped, cursor, currentRowWords, clearTyped, updateWords } = useTypings(state !== "finish", textWindowSize);
  const { currentRowTyped, currentRowWords, nextRowWords, cursor, updateRows, resetWords, getStats: getStatsMain } = useWords(state !== "finish", textWindowSize);

  const isStarting = state === "start" && cursor > 0;

  useEffect(() => {
    if (isStarting) {
      setState("run");
      console.log(testTime);
      startCountdown(testTime);
    }
  }, [isStarting, startCountdown, cursor, testTime]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("time is up...");
      setState("finish");
      navigate("/results");
    }
  }, [timeLeft]);

  const getStats = useCallback(() => {
    return getStatsMain(testTime);
  }, [getStatsMain]);

  const restart = useCallback(() => {
    console.log("restarting...");
    resetCountdown(testTime);
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

  return { state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, testTime, user, getStats, restart, updateRows, setTestTime };
}

export default useEngine;