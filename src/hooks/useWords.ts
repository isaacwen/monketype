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

const useWords = (windowSize: number) => {
  const [cursor, setCursor] = useState(0);
  const [allTyped, setAllTyped] = useState("");
  const [currentRowTyped, setCurrentRowTyped] = useState("");
  const allWords = useRef("");
  // var allWords = "";
  // const [allWords, setAllWords] = useState("");
  const currentWordIdx = useRef(0);
  // const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentRowWords, setCurrentRowWords] = useState("");
  const [nextRowWords, setNextRowWords] = useState("");

  const updateRows = (windowSize: number) => {
    const maxCharsInRow = Math.floor(windowSize / CHAR_SIZE_PIXELS);
    console.log("windowSize: ", windowSize); //todo: remove
    console.log("maxCharsInRow: ", maxCharsInRow); // todo: remove

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
    // setCurrentWordIdx(newStart);

    // reset expected words
    // while (allWords.current.length - currentWordIdx < 2 * MAX_ADD_CHARACTERS) {
    //   allWords.current = allWords.current.concat(randomWords({exactly: 1, maxLength: 8, join: " "}), " ");
    // }
    if (allWords.current.length - currentWordIdx.current < 2 * MAX_ADD_CHARACTERS) {
      allWords.current = allWords.current.concat(randomWords({exactly: 30, maxLength: 8, join: " "}), " ");
    }
    console.log("printing allwords:", allWords); // TODO remove

    const getNextLineWords = (startIdx: number) => {
      var endIdx = startIdx;
      while (endIdx < allWords.current.length) {
        var counter = 0;
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
  }

  const finishedTypingRow = cursor >= currentRowWords.length;
  useEffect(() => {
    if (finishedTypingRow) {
      console.log("Finsihed row of words, resetting...");
      updateRows(windowSize);
    }
  }, [finishedTypingRow, updateRows]);

  const keydownHandler = ({key, code}: KeyboardEvent) => {
    if (!isKeyboardCodeAllowed(code)) {
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

  const resetWords = useCallback((windowSize: number) => {
    setCursor(0);
    setAllTyped("");
    setCurrentRowTyped("");
    allWords.current = "";
    currentWordIdx.current = 0;
    // setCurrentWordIdx(0);
    setCurrentRowWords("");
    setNextRowWords("");
    updateRows(windowSize);
  }, [])

  return { currentRowTyped, currentRowWords, nextRowWords, cursor, resetWords }
}

export default useWords;