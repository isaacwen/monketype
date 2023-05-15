import React from "react";
import { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import useEngine from "./hooks/useEngine";
import { AnimatePresence, motion, MotionValue } from "framer-motion";
import SingleplayerWordsPage from "./pages/SingleplayerWordsPage";
import SingleplayerResultsPage from "./pages/SingleplayerResultsPage";
import SignInPage from "./pages/SignInPage";

export type Mode = "singleplayer" | "multiplayer";
const MAX_TEXT_WINDOW_SIZE = 1152;

const App = () => {
  const navigate = useNavigate();
  const textWidthRef = useRef<HTMLDivElement>(null);
  // const [textWindowSize, setTextWindowSize] = useState<number>(MAX_TEXT_WINDOW_SIZE);
  const textWindowSize = useRef<number>(MAX_TEXT_WINDOW_SIZE);
  const [mode, setMode] = useState<Mode>("singleplayer");
  const {state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, testTime, user, getStats, restart: restartMain, updateRows, setTestTime} = useEngine(textWindowSize);

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
    navigate("/");
  }

  const changeMode = () => {
    if (mode === "singleplayer") {
      navigate("/mp");
      setMode("multiplayer");
    } else {
      navigate("/");
      restartMain();
      setMode("singleplayer");
    }
  }

  const navProfile = () => {
    navigate("/login");
  }

  const navSettings = () => {

  }

  const navBack = () => {
    restartMain();
    navigate("/");
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

  return (
    <Routes>
      <Route path="/" element={
        <SingleplayerWordsPage
          textWidthRef={textWidthRef}
          timeLeft={timeLeft}
          currentRowWords={currentRowWords}
          currentRowTyped={currentRowTyped}
          nextRowWords={nextRowWords}
          started={state === "run"}
          testTime={testTime}
          restart={restart}
          navProfile={navProfile}
          setTestTime={setTestTime}
        />
      }></Route>
      <Route path="/results" element={state !== "finish" ? <Navigate to="/"/> :
        <SingleplayerResultsPage
          state={state}
          getStats={getStats}
          restart={restart}
          navProfile={navProfile}
        />
      }></Route>
      <Route path="/login" element={
        <SignInPage
          user={user}
          navBack={navBack}
        />
      }></Route>
    </Routes>
  )
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
