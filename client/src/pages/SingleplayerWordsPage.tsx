import React, { Dispatch, SetStateAction } from 'react'
import ButtonRow from '../components/ButtonRow';
import Timer from '../components/Timer';
import WordRows from '../components/WordRows';
import { Times } from '../hooks/useEngine';
import { basePage } from '../utils/helpers';

const SingleplayerWordsPage = ({
  textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords, started, testTime, restart, navProfile, navSettings
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  timeLeft: number;
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
  started: boolean;
  testTime: React.MutableRefObject<Times>
  restart: () => void;
  navProfile: () => void;
  navSettings: () => void;
}) => {
  return (basePage(textWidthRef,
    <>
      <Timer timeLeft = {timeLeft} started = {started} testTime = {testTime}/>
      <WordRows
        currentRowWords={currentRowWords}
        currentRowTyped={currentRowTyped}
        nextRowWords={nextRowWords}
      />
      <ButtonRow
        buttonNames={["restart", "profile", "settings"]}
        buttonHandles={[restart, navProfile, navSettings]}
      />
    </>
  ))
}

export default SingleplayerWordsPage;
