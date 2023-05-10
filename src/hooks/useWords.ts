import { useCallback, useState, useEffect } from "react";

var randomWords = require('random-words');

const generateWords = (count: number) => {
  return randomWords({exactly: count, maxLength: 8, join: " "});
};

const notifyResize = () => {
  // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight, 'y');
};

const useWords = (count: number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count])

  useEffect(() => {
    window.addEventListener('resize', notifyResize);
    return () => window.removeEventListener('resize', notifyResize);
  });

  return { words, updateWords };
}

export default useWords;