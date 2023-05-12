import { useCallback, useState, useEffect, useRef } from "react";
import { countErrors } from "../utils/helpers";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const COUNTDOWN_SECONDS = 1;

const useEngine = (textWindowSize: React.MutableRefObject<number>) => {
  const [state, setState] = useState<State>("start");
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

  return { state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, getStats, restart, updateRows };
}

export default useEngine;