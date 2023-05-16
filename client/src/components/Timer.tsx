import { Dispatch, SetStateAction, useRef } from "react";
import { times, Times } from "../hooks/useEngine";

const Timer = ({
  timeLeft, started, testTime, setTestTime
}: {
  timeLeft: number;
  started: boolean;
  testTime: number;
  setTestTime: Dispatch<SetStateAction<Times>>;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleClick = (time: Times) => {
    testTime = time;
    setTestTime(time);
  };

  const timeButtons: JSX.Element[] = [];

  times.forEach((time: Times) => {
    timeButtons.push(
      <button
          key={`button${time}`}
          ref={buttonRef}
          onClick={() => handleClick(time)}
          className = {`block rounded hover:font-extrabold hover:underline ${testTime === time? "text-white" : "text-primary-400"}`}
      >{time}</button>
    )
  });

  if (started) {
    return (
      <h2 className="text-primary-400 text-xl font-medium mx-7">{timeLeft}</h2>
    );
  } else {
    return (
      <div className = {"flex text-xl font-medium text-primary-400 gap-6 mx-7"}>
        <h2 className="text-primary-400 text-xl font-medium">Timer: </h2>
        {timeButtons}
      </div>
    )
  }
}

export default Timer;