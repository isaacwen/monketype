import { useRef, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import useEngine from "./hooks/useEngine";
import { AnimatePresence } from "framer-motion";
import SingleplayerWordsPage from "./pages/SingleplayerWordsPage";
import SingleplayerResultsPage from "./pages/SingleplayerResultsPage";
import SignInPage from "./pages/SignInPage";
import StatsPage from "./pages/StatsPage";

export type Mode = "singleplayer" | "multiplayer";
const MAX_TEXT_WINDOW_SIZE = 1152;

const App = () => {
  const navigate = useNavigate();
  const textWidthRef = useRef<HTMLDivElement>(null);
  const textWindowSize = useRef<number>(MAX_TEXT_WINDOW_SIZE);
  const [user, setUser] = useState<string>("");
  const {state, currentRowWords, nextRowWords, timeLeft, currentRowTyped, testTime, getStats, restart: restartMain, updateRows, setTestTime} = useEngine(textWindowSize, user);

  const textWidthResize = () => {
    if (textWidthRef.current) {
      textWindowSize.current = textWidthRef.current.offsetWidth;
      updateRows(textWindowSize);
    }
  };

  const restart = () => {
    textWidthResize();
    restartMain();
    navigate("/");
  }

  const navProfile = () => {
    restartMain();
    if (user) {
      navigate("/stats");
    } else {
      navigate("/login");
    }
  }

  const navBack = () => {
    restartMain();
    navigate("/");
  }

  const signOut = () => {
    restartMain();
    setUser("");
    navigate("/login");
  }

  useEffect(() => {
    if (textWidthRef.current && textWidthRef.current.offsetWidth !== textWindowSize.current) {
      textWidthResize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", textWidthResize);
    return () => window.removeEventListener("resize", textWidthResize);
  });

  return (
    <AnimatePresence>
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
            setUser={setUser}
            navBack={navBack}
          />
        }></Route>
        <Route path="/stats" element={user === "" ? <Navigate to="../login"/> :
          <StatsPage
            user={user}
            className="mt-10"
            navBack={navBack}
            signOut={signOut}
          />
        }></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App;
