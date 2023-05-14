import React from 'react'
import ButtonRow from '../components/ButtonRow';
import Results from '../components/Results';
import { State } from '../hooks/useEngine';

const SingleplayerResultsPage = ({
  state, getStats, restart, modeChange
}: {
  state: State;
  getStats: () => number[];
  restart: () => void;
  modeChange: () => void;
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
        handleChangeMode = {modeChange}
        forSingleplayer = {true}
        addRestart = {true}
      />
    </>
  )
}

export default SingleplayerResultsPage
