export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%"
}

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

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