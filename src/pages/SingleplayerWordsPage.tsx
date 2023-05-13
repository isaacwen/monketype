import React from 'react'
import ButtonRow from '../components/ButtonRow';
import WordRows from '../components/WordRows';

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
    <WordRows
      textWidthRef={textWidthRef}
      timeLeft={timeLeft}
      currentRowWords={currentRowWords}
      currentRowTyped={currentRowTyped}
      nextRowWords={nextRowWords}
    />
    <ButtonRow
      handleRestart = {restart}
      mode = {mode}
      changeMode = {changeMode}
    />
  </div>
  )
}

export default SingleplayerWordsPage;
