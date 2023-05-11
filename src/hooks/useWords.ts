import { useCallback, useState, useEffect } from "react";

const CHAR_SIZE_PIXELS = 19;
var randomWords = require('random-words');

const generateWords = (size: number) => {
  const maxChars = Math.floor(size / CHAR_SIZE_PIXELS);
  var words = randomWords({exactly: 15, maxLength: 8, join: " "});
  while (words.length > maxChars) {
    console.log(words);
    words = words.slice(0, words.lastIndexOf(' '));
  }
  words += " ";
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