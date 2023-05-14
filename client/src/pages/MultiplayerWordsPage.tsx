import React, { useEffect } from 'react'
import ButtonRow from '../components/ButtonRow';
import Timer from '../components/Timer';
import WordRows from '../components/WordRows';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { basePage } from '../utils/helpers';

// var io = require("socket.io");

const MultiplayerWordsPage = ({
  textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords, restart, modeChange, verifyRoom
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  timeLeft: number;
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
  restart: () => void;
  modeChange: () => void;
  verifyRoom: (id: string) => void;
}) => {
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
     verifyRoom(id);
    }
  }, []);

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

export default MultiplayerWordsPage;

