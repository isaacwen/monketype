import React from 'react'
import ButtonRow from '../components/ButtonRow';
import Results from '../components/Results';
import { State } from '../hooks/useEngine';

const SingleplayerResultsPage = ({
  state, getStats, restart, navProfile, navSettings
}: {
  state: State;
  getStats: () => number[];
  restart: () => void;
  navProfile: () => void;
  navSettings: () => void;
}) => {
  return (
    <>
      <Results
        state = {state}
        className = "mt-10"
        stats = {getStats()}
      />
      <ButtonRow
        buttonNames={["restart", "profile", "settings"]}
        buttonHandles={[restart, navProfile, navSettings]}
      />
    </>
  )
}

export default SingleplayerResultsPage
