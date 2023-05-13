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