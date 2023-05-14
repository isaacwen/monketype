import { ReactElement } from "react";

const CHAR_SIZE_PIXELS = 19;
var randomWords = require('random-words');

export const generateWords = (size: number) => {
  const maxChars = Math.floor(size / CHAR_SIZE_PIXELS);
  var words = randomWords({exactly: 15, maxLength: 8, join: " "});
  while (words.length > maxChars) {
    words = words.slice(0, words.lastIndexOf(' '));
  }
  words += " ";
  return words;
};

export const basePage = (textWidthRef: React.RefObject<HTMLDivElement>, contents: ReactElement, className: string = "") => {
  return (
    <div className = {"max-w-6xl test content-center " + className} ref = {textWidthRef}>
      {contents}
    </div>
  )
}