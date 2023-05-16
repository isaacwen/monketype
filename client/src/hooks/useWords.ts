import { useCallback, useEffect, useState, useRef } from "react";

var randomWords = require('random-words');

const CHAR_SIZE_PIXELS = 19;
const MAX_WINDOW_SIZE = 1152;
const MAX_ADD_CHARACTERS = Math.floor(MAX_WINDOW_SIZE / CHAR_SIZE_PIXELS);

const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const useWords = (enabled: boolean, windowSize: React.MutableRefObject<number>) => {
  const [cursor, setCursor] = useState(0);
  const [allTyped, setAllTyped] = useState("");
  const [currentRowTyped, setCurrentRowTyped] = useState("");
  const allWords = useRef("");
  const currentWordIdx = useRef(0);
  const [currentRowWords, setCurrentRowWords] = useState("");
  const [nextRowWords, setNextRowWords] = useState("");
  const correctInputs = useRef(0);
  const incorrectInputs = useRef(0);

  const updateRows = useCallback((windowSize: React.MutableRefObject<number>) => {
    const maxCharsInRow = Math.floor(windowSize.current / CHAR_SIZE_PIXELS);

    // reset cursor
    var newStart: number = currentWordIdx.current + cursor;
    while (newStart >= 0 && allWords.current[newStart] !== " ") {
      newStart--;
    }
    newStart++;
    setCursor(cursor - (newStart - currentWordIdx.current));

    // reset user's typed words
    setCurrentRowTyped(currentRowTyped.substring(newStart - currentWordIdx.current));

    currentWordIdx.current = newStart;
    if (allWords.current.length - currentWordIdx.current < 2 * MAX_ADD_CHARACTERS) {
      allWords.current = allWords.current.concat(randomWords({exactly: 30, maxLength: 8, join: " "}), " ");
    }

    const getNextLineWords = (startIdx: number) => {
      let endIdx = startIdx;
      while (endIdx < allWords.current.length) {
        let counter = 0;
        while (allWords.current[counter + endIdx] !== " ") {
          counter++;
        }
        if (counter + endIdx - startIdx + 1 < maxCharsInRow) {
          endIdx += counter + 1;
        } else {
          break;
        }
      }
      return endIdx
    }

    const firstRowEndIdx = getNextLineWords(currentWordIdx.current);
    const secondRowEndIdx = getNextLineWords(firstRowEndIdx);
    setCurrentRowWords(allWords.current.substring(currentWordIdx.current, firstRowEndIdx));
    setNextRowWords(allWords.current.substring(firstRowEndIdx, secondRowEndIdx));
  }, [currentWordIdx, allWords, setCursor, cursor, currentRowTyped, setCurrentRowWords, setNextRowWords]);

  const finishedTypingRow = cursor >= currentRowWords.length;
  useEffect(() => {
    if (finishedTypingRow) {
      updateRows(windowSize);
    }
  }, [finishedTypingRow, updateRows]);

  const keydownHandler = ({key, code}: KeyboardEvent) => {
    if (!enabled || !isKeyboardCodeAllowed(code) || window.location.pathname != "/") {
      return;
    }
    switch (key) {
      case "Backspace":
        if (cursor !== 0) {
          setAllTyped(allTyped.slice(0, -1));
          setCurrentRowTyped(currentRowTyped.slice(0, -1));
          setCursor(cursor - 1);
        }
        break;
      default:
        if (currentRowWords[cursor] === key) {
          correctInputs.current++;
        } else {
          incorrectInputs.current++;
        }
        setAllTyped(allTyped.concat(key));
        setCurrentRowTyped(currentRowTyped.concat(key));
        setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  const getStats = useCallback((runtimeSecs: number) => {
    const accuracy = correctInputs.current / (incorrectInputs.current + correctInputs.current) * 100;
    
    let correctCharsInFullyCorrectWords = 0;
    let correctCharsInAllWords = 0;
    let incorrectWord = false;
    let currentWordCorrectChars = 0;

    const processChars = () => {
      correctCharsInAllWords += currentWordCorrectChars;
      if (!incorrectWord) {
        correctCharsInFullyCorrectWords += currentWordCorrectChars;
      }
      incorrectWord = false;
      currentWordCorrectChars = 0;
    }
    
    for (let i = 0; i < allTyped.length; i++) {
      if (allTyped[i] === allWords.current[i]) {
        currentWordCorrectChars++;
      } else {
        incorrectWord = true;
      }
      if (allWords.current[i] === " ") {
        processChars();
      }
    }
    processChars();

    // per monkeytype: wpm is total amount of characters in the correctly typed
    // words (including spaces), divided by 5 and normalized to 60 seconds. raw
    // is the same was wpm except characters in incorrectly typed words are also
    // counted.
    const multiplier = 60 / runtimeSecs;
    const wpm = correctCharsInFullyCorrectWords / 5 * multiplier;
    const raw = correctCharsInAllWords / 5 * multiplier;
    
    return [accuracy, wpm, raw];
  }, [correctInputs, incorrectInputs, allTyped, allWords]);

  const resetWords = useCallback((windowSize: React.MutableRefObject<number>) => {
    setCursor(0);
    setAllTyped("");
    setCurrentRowTyped("");
    allWords.current = "";
    currentWordIdx.current = 0;
    setCurrentRowWords("");
    setNextRowWords("");
    correctInputs.current = 0;
    incorrectInputs.current = 0;
    updateRows(windowSize);
  }, []);

  return { currentRowTyped, currentRowWords, nextRowWords, cursor, updateRows, resetWords, getStats }
}

export default useWords;