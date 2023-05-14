import React, { Dispatch, SetStateAction, useEffect } from 'react'
import ButtonRow from '../components/ButtonRow';
import Timer from '../components/Timer';
import WordRows from '../components/WordRows';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { basePage } from '../utils/helpers';
import { Times } from '../hooks/useEngine';

// var io = require("socket.io");

const MultiplayerWordsPage = () => {}
//   textWidthRef, timeLeft, currentRowWords, currentRowTyped, nextRowWords, started, restart, navProfile, navSettings, verifyRoom, setTestTime
// }: {
//   textWidthRef: React.RefObject<HTMLDivElement>;
//   timeLeft: number;
//   currentRowWords: string;
//   currentRowTyped: string;
//   nextRowWords: string;
//   started: boolean;
//   restart: () => void;
//   navProfile: () => void;
//   navSettings: () => void;
//   verifyRoom: (id: string) => void;
//   setTestTime: Dispatch<SetStateAction<Times>>;
// }) => {
//   const { id } = useParams();
  
//   useEffect(() => {
//     if (id) {
//      verifyRoom(id);
//     }
//   }, []);

//   return (basePage(textWidthRef,
//     <>
//       <Timer timeLeft = {timeLeft} started = {started} setTestTime = {setTestTime}/>
//       <WordRows
//         currentRowWords={currentRowWords}
//         currentRowTyped={currentRowTyped}
//         nextRowWords={nextRowWords}
//       />
//       <ButtonRow
//         buttonNames={["restart", "profile", "settings"]}
//         buttonHandles={[restart, navProfile, navSettings]}
//       />
//     </>
//   ))
// }

export default MultiplayerWordsPage;

