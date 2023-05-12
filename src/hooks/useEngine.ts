import { useCallback, useState, useEffect, useRef } from "react";
import { countErrors } from "../utils/helpers";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const MAX_TEXT_WINDOW_SIZE = 1152;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const [textWindowSize, setTextWindowSize] = useState<number>(MAX_TEXT_WINDOW_SIZE);
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECONDS);
  // const { currentRowTyped, cursor, currentRowWords, clearTyped, updateWords } = useTypings(state !== "finish", textWindowSize);
  const { currentRowTyped, currentRowWords, nextRowWords, cursor, updateRows, resetWords } = useWords(textWindowSize);

  const totalTyped = 0;
  

  const [errors, setErrors] = useState(0);

  const sumErrors = useCallback(() => {
    const wordsReached = currentRowWords.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(currentRowTyped, wordsReached));
  }, [currentRowTyped, currentRowWords, cursor]);

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
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  // const areWordsFinished = cursor === currentRowWords.length;

  // useEffect(() => {
  //   if (areWordsFinished) {
  //     console.log("words are finished...");
  //     sumErrors();
  //     resetWords(textWindowSize);
  //     // updateWords();
  //     // clearTyped();
  //   }
  // }, [cursor, currentRowWords, areWordsFinished, resetWords, sumErrors]);

  const restart = useCallback(() => {
    console.log("restarting...");
    resetCountdown();
    setState("start");
    setErrors(0);
    resetWords(textWindowSize);
    // updateWords();
    // clearTyped();
  }, [resetWords, resetCountdown]);

  return { state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, errors, totalTyped, restart, updateRows, setTextWindowSize };
}

export default useEngine;