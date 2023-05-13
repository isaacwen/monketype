import React from 'react'
import ButtonRow from '../components/ButtonRow';
import UserTypings from '../components/UserTypings';

const SingleplayerWordsPage = ({
  textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords, restart, mode, changeMode
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  timeLeft: number;
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
  restart: () => void;
  mode: string;
  changeMode: () => void;
}) => {
  return (
  <div className = "content-center">
        <div className = "max-w-6xl test" ref = {textWidthRef}>
          <h2 className="text-primary-400 font-medium mx-7">Time: {timeLeft}</h2>
          <div className = "relative mt-3 mx-7 text-3xl leading-relaxed break-normal" >
            <div className="text-slate-500">{currentRowWords}</div>
            <UserTypings className = "absolute inset-0" userInput = {currentRowTyped} words = {currentRowWords}/>
            <div className="text-slate-500">{nextRowWords}</div>
          </div>
        </div>
        <ButtonRow
          handleRestart = {restart}
          mode = {mode}
          changeMode = {changeMode}
        />
      </div>
  )
}

export default SingleplayerWordsPage;
