import React from 'react'
import UserTypings from './UserTypings';

const WordRows = ({
  textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  timeLeft: number;
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
}) => {
  return (
    <div className = "max-w-6xl test" ref = {textWidthRef}>
      <h2 className="text-primary-400 text-xl font-medium mx-7">Time: {timeLeft}</h2>
      <div className = "relative mt-3 mx-7 text-3xl leading-relaxed break-normal" >
        <div className="text-slate-500">{currentRowWords}</div>
        <UserTypings className = "absolute inset-0" userInput = {currentRowTyped} words = {currentRowWords}/>
        <div className="text-slate-500">{nextRowWords}</div>
      </div>
    </div>
  );
}

export default WordRows;
