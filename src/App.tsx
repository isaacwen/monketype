import React from "react";
import { useRef, useEffect } from "react";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";
import { motion, MotionValue } from "framer-motion";

const App = () => {
  const {state, words, timeLeft, typed, errors, totalTyped, restart, setTextWindowSize} = useEngine();
  const textWidthRef = useRef<HTMLDivElement>(null);

  const textWidthResize = () => {
    if (textWidthRef.current) {
      setTextWindowSize(textWidthRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    textWidthResize();
    window.addEventListener("resize", textWidthResize);
    return () => window.removeEventListener("resize", textWidthResize);
  });
  if (state !== "finish") {
    return getPageDiv(
      <>
        <div className = "max-w-6xl test">
          <h2 className="text-primary-400 font-medium mx-7">Time: {timeLeft}</h2>
          <div className = "relative mt-3 mx-7 text-3xl leading-relaxed break-normal" ref = {textWidthRef}>
            <div className="text-slate-500">{words}</div>
            <UserTypings className = "absolute inset-0" userInput = {typed} words = {words}/>
          </div>
        </div>
        <RestartButton
          className = {"mx-auto mt-10 text-slate-500"}
          onRestart = {restart}
        />
      </>
    );
  } else {
    return getPageDiv(
      <>
        <Results
          state = {state}
          className = "mt-10"
          errors = {errors}
          accuracyPercentage = {calculateAccuracyPercentage(errors, totalTyped)}
          total = {totalTyped}
        />
        <RestartButton
          className = {"mx-auto mt-10 text-slate-500"}
          onRestart = {restart}
        />
      </>
    );
  }
  
}

const getPageDiv = (contents: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
  return (
    <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity: 0}}
      transition = {{duration: 3}}
    >
      {contents}
    </motion.div>
  )
}

export default App;
