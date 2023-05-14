import { Dispatch, SetStateAction, useRef } from "react";
import { times, Times } from "../hooks/useEngine";

const Timer = ({
  timeLeft, started, testTime
}: {
  timeLeft: number;
  started: boolean;
  testTime: React.MutableRefObject<Times>;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleClick = (time: Times) => {
    console.log("time:", time);
    testTime.current = time;
  };

  const timeButtons: JSX.Element[] = [];

  times.forEach((time: Times) => {
    timeButtons.push(
      <button
          ref={buttonRef}
          onClick={() => handleClick(time)}
          className = {'block rounded hover:text-white'}
      >{time}</button>
    )
  });

  if (started) {
    return (
      <h2 className="text-primary-400 text-xl font-medium mx-7">{timeLeft}</h2>
    );
  } else {
    return (
      <div className = {"flex text-xl font-medium text-primary-400"}>
        {timeButtons}
      </div>
    )
  }
}

export default Timer;