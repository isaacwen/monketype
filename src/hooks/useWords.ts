import { useCallback, useState, useEffect } from "react";

const CHAR_SIZE_PIXELS = 18;
var randomWords = require('random-words');

const generateWords = (size: number) => {
  console.log(size);
  const maxChars = Math.floor(size / CHAR_SIZE_PIXELS);
  console.log("max chars", maxChars);
  var words = randomWords({exactly: 15, maxLength: 8, join: " "});
  while (words.length > maxChars) {
    console.log(words);
    words = words.slice(0, words.lastIndexOf(' '));
  }
  return words;
};

const notifyResize = () => {
  // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight, 'y');
};

const useWords = (size: number) => {
  const [words, setWords] = useState<string>(generateWords(size));

  const updateWords = useCallback(() => {
    setWords(generateWords(size));
  }, [size])

  useEffect(() => {
    window.addEventListener('resize', notifyResize);
    return () => window.removeEventListener('resize', notifyResize);
  });

  return { words, updateWords };
}

export default useWords;