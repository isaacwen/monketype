import { useCallback, useState, useEffect } from "react";
import { countErrors } from "../utils/helpers";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish";

const MAX_TEXT_WINDOW_SIZE = 1152;
const COUNTDOWN_SECONDS = 5;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const [textWindowSize, setTextWindowSize] = useState<number>(MAX_TEXT_WINDOW_SIZE);
  const {words, updateWords } = useWords(textWindowSize);
  const {timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== "finish");

  const [errors, setErrors] = useState(0);

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

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

  const areWordsFinished = cursor === words.length;

  useEffect(() => {
    if (areWordsFinished) {
      console.log("words are finished...");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [cursor, words, clearTyped, areWordsFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    console.log("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart, setTextWindowSize };
}

export default useEngine;