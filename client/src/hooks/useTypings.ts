import { useCallback, useEffect, useRef, useState } from "react";
import { generateWords } from "../utils/helpers";

const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const CHAR_SIZE_PIXELS = 19;

const useTypings = ( enabled: boolean, size: number ) => {
  const [cursor, setCursor] = useState(0);
  const [allTyped, setAllTyped] = useState("");
  const [currentRowTyped, setCurrentRowTyped] = useState<string>("");
  const [allWords, setAllWords] = useState("");
  const [currentWordIdx, setCurrentWordIdx] = useState("");
  const [currentRowWords, setCurrentRowWords] = useState<string>(generateWords(size));
  const [errors, setErrors] = useState(0);
  const maxChars = Math.floor(size / CHAR_SIZE_PIXELS);

  const updateWords = useCallback(() => {
    if (allWords)
    setCurrentRowWords(generateWords(size));
  }, [size]);

  const keydownHandler = ({key, code}: KeyboardEvent) => {
    if (!enabled || !isKeyboardCodeAllowed(code)) {
      return;
    }
    switch (key) {
      case "Backspace":
        setAllTyped(allTyped.slice(0, -1));
        setCurrentRowTyped(currentRowTyped.slice(0, -1));
        setCursor(cursor - 1);
        break;
      default:
        if (key !== currentRowWords[cursor]) {
          setErrors(errors + 1);
        }
        setAllTyped(allTyped.concat(key));
        setCurrentRowTyped(currentRowTyped.concat(key));
        setCursor(cursor + 1);
    }
  };

  const clearTyped = useCallback(() => {
    setCurrentRowTyped("");
    setCursor(0);
  }, [])

  // attach the keyboard event listener to record keystrokes
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    // remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return { currentRowTyped, cursor, currentRowWords, clearTyped, updateWords }
};

export default useTypings;