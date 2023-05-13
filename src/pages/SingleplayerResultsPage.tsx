import React from 'react'
import ButtonRow from '../components/ButtonRow';
import Results from '../components/Results';
import { State } from '../hooks/useEngine';

const SingleplayerResultsPage = ({
  state, getStats, restart, mode, changeMode
}: {
  state: State;
  getStats: () => number[];
  restart: () => void;
  mode: string;
  changeMode: () => void;
}) => {
  return (
    <>
      <Results
        state = {state}
        className = "mt-10"
        stats = {getStats()}
      />
      <ButtonRow
        handleRestart = {restart}
        mode = {mode}
        changeMode = {changeMode}
      />
    </>
  )
}

export default SingleplayerResultsPage
