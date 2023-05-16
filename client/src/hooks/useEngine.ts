import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCountdownTimer from "./useCountdownTimer";
import useWords from "./useWords";
import api from "../api/api";

export type State = "start" | "run" | "finish";
export const times = [15, 30, 60, 120] as const;
export type Times = typeof times[number];

const useEngine = (textWindowSize: React.MutableRefObject<number>, user: string) => {
  const navigate = useNavigate();
  // const testTime = useRef<Times>(30);
  const [testTime, setTestTime] = useState<Times>(30);
  const [state, setState] = useState<State>("start");
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
      if (user !== "") {
        const stats = getStatsMain(testTime);
        const payload = {
          "username": user,
          "test": testTime,
          "wpm": stats[1],
          "raw": stats[2],
          "acc": stats[0]
        }
        api.updateUser(payload);
      }
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

  return { state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, testTime, getStats, restart, updateRows, setTestTime };
}

export default useEngine;