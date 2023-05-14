import React from 'react'
import ButtonRow from '../components/ButtonRow';
import Timer from '../components/Timer';
import WordRows from '../components/WordRows';
import { basePage } from '../utils/helpers';

const SingleplayerWordsPage = ({
  textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords, restart, modeChange
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  timeLeft: number;
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
  restart: () => void;
  modeChange: () => void;
}) => {
  return (basePage(textWidthRef,
    <>
      <Timer timeLeft = {timeLeft}/>
      <WordRows
        currentRowWords={currentRowWords}
        currentRowTyped={currentRowTyped}
        nextRowWords={nextRowWords}
      />
      <ButtonRow
      handleRestart = {restart}
      handleChangeMode = {modeChange}
      forSingleplayer = {true}
      addRestart = {true}
      />
    </>
  ))
}

export default SingleplayerWordsPage;
