import { useCallback, useEffect, useRef, useState } from "react";
import { Times } from "./useEngine";

const useCountdownTimer = (testTime: number) => {
  const [timeLeft, setTimeLeft] = useState(testTime);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountdown = useCallback((testTime: number) => {
    console.log("starting countdown...");
    setTimeLeft(testTime)
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000)
  }, [setTimeLeft, testTime]);

  const resetCountdown = useCallback((testTime: number) => {
    console.log("resetting countdown...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setTimeLeft(testTime);
  }, [testTime]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      console.log("clearing timer...");
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return {timeLeft, startCountdown, resetCountdown};
}

export default useCountdownTimer;