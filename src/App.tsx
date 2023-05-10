import React from "react";
import { useRef } from "react";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

const notifyResize = () => {
  // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight, 'y');
};

const App = () => {
  const {state, words, timeLeft, typed, errors, restart, totalTyped} = useEngine();
  const textWidthRef = useRef();

  const textWidthResize = () => {
    console.log('resized to: ', textWidthRef.current ? textWidthRef.current.offsetWidth : 0, 'x', window.innerHeight, 'y')
  }

  useEffect(() => {
    
  })

  return (
    <>
      <CountdownTimer timeLeft = {timeLeft}/>
      <WordComponents ref={textWidthRef}>
        <GeneratedWords words = {words}/>
        <UserTypings className = "absolute inset-0" userInput = {typed} words = {words}/>
      </WordComponents>
      <RestartButton
        className = {"mx-auto mt-10 text-slate-500"}
        onRestart = {restart}
      />
      <Results
        state = {state}
        className = "mt-10"
        errors = {errors}
        accuracyPercentage = {calculateAccuracyPercentage(errors, totalTyped)}
        total = {totalTyped}
      />
    </>
  );
}

// various component

const WordComponents = ({ ref, children }: { ref: React.Ref<Number>, children: React.ReactNode }) => {
  return (
    <div ref = {ref} className = "relative max-w-6xl mt-3 mx-7 text-3xl leading-relaxed break-normal">
      {children}
    </div>
  )
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="text-slate-500">{words}</div>
}

const CountdownTimer = ({ timeLeft }: { timeLeft: number}) => {
  return <h2 className="text-primary-400 font-medium mx-7">Time: {timeLeft}</h2>
}

export default App;
