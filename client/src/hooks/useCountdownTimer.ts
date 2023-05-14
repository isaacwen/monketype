import { useCallback, useEffect, useRef, useState } from "react";
import { Times } from "./useEngine";

const useCountdownTimer = (testTime: React.RefObject<Times>) => {
  const [timeLeft, setTimeLeft] = useState(testTime.current ? testTime.current.valueOf() : 30);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountdown = useCallback(() => {
    console.log("starting countdown...");
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000)
  }, [setTimeLeft, testTime.current]);

  const resetCountdown = useCallback(() => {
    console.log("resetting countdown...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setTimeLeft(testTime.current ? testTime.current.valueOf() : 30);
  }, [testTime.current]);

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