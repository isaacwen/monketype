import React from "react";
import { useRef, useEffect, useState } from "react";
import ButtonRow from "./components/ButtonRow";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { AnimatePresence, motion, MotionValue } from "framer-motion";
import SingleplayerWordsPage from "./pages/SingleplayerWordsPage";
import SingleplayerResultsPage from "./pages/SingleplayerResultsPage";

const MAX_TEXT_WINDOW_SIZE = 1152;

const App = () => {
  const textWidthRef = useRef<HTMLDivElement>(null);
  // const [textWindowSize, setTextWindowSize] = useState<number>(MAX_TEXT_WINDOW_SIZE);
  const textWindowSize = useRef<number>(MAX_TEXT_WINDOW_SIZE);
  const {state, mode, currentRowWords, nextRowWords, timeLeft, currentRowTyped, getStats, restart: restartMain, changeMode, updateRows} = useEngine(textWindowSize);

  const textWidthResize = () => {
    if (textWidthRef.current) {
      textWindowSize.current = textWidthRef.current.offsetWidth;
      // setTextWindowSize(textWidthRef.current.offsetWidth);
      updateRows(textWindowSize);
    }
  };

  const restart = () => {
    textWidthResize();
    console.log("expected width: ", textWidthRef.current?.offsetWidth);
    console.log("actual width: ", textWindowSize.current);
    restartMain();
  }

  useEffect(() => {
    console.log("updating size")
    if (textWidthRef.current && textWidthRef.current.offsetWidth !== textWindowSize.current) {
      textWidthResize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", textWidthResize);
    return () => window.removeEventListener("resize", textWidthResize);
  });

  // return (
  //   <AnimatePresence mode = "popLayout">
  //     {state !== "finish" && (
  //       <motion.div
  //         key = "typingPage"
  //         // initial = {{opacity: 0}}
  //         animate = {{opacity: 1}}
  //         exit = {{opacity: 0, transition: {duration: 0.5}}}
  //         transition = {{duration: 0.5, delay: 0.5}}
  //       >
  //         <div className = "max-w-6xl test" ref = {textWidthRef}>
  //           <h2 className="text-primary-400 font-medium mx-7">Time: {timeLeft}</h2>
  //           <div className = "relative mt-3 mx-7 text-3xl leading-relaxed break-normal" >
  //             <div className="text-slate-500">{currentRowWords}</div>
  //             <UserTypings className = "absolute inset-0" userInput = {currentRowTyped} words = {currentRowWords}/>
  //             <div className="text-slate-500">{nextRowWords}</div>
  //           </div>
  //         </div>
  //         <RestartButton
  //           className = {"mx-auto mt-10 text-slate-500"}
  //           onRestart = {restart}
  //         />
  //       </motion.div>
  //     )}
  //     {state === "finish" && (
  //       <motion.div
  //         key = "resultsPage"
  //         // initial = {{opacity: 0}}
  //         animate = {{opacity: 1}}
  //         exit = {{opacity: 0, transition: {duration: 0.5}}}
  //         transition = {{duration: 0.5, delay: 0.5}}
  //       >
  //         <div className = "test">
  //           <Results
  //             state = {state}
  //             className = "mt-10"
  //             stats = {getStats()}
  //           />
  //           <RestartButton
  //             className = {"mx-auto mt-10 text-slate-500"}
  //             onRestart = {restart}
  //           />
  //         </div>
  //       </motion.div>
  //     )}
  //   </AnimatePresence>
  // )

  if (state !== "finish") {
    if (mode === "singleplayer") {
      return (
        <SingleplayerWordsPage
          textWidthRef={textWidthRef}
          timeLeft={timeLeft}
          currentRowWords={currentRowWords}
          currentRowTyped={currentRowTyped}
          nextRowWords={nextRowWords}
          restart={restart}
          mode={mode}
          changeMode={changeMode}
        />
      );
    } else {
      return ( <></>
      
      );
    }
  } else {
    if (mode === "singleplayer") {
      return (
        <SingleplayerResultsPage
          state={state}
          getStats={getStats}
          restart={restart}
          mode={mode}
          changeMode={changeMode}
        />
      );
    } else {
      return ( <></>

      );
    }
  }
}

const getPageDiv = (key: string, contents: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
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
