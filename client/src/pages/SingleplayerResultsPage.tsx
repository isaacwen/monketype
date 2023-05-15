import ButtonRow from '../components/ButtonRow';
import Results from '../components/Results';
import { State } from '../hooks/useEngine';

const SingleplayerResultsPage = ({
  state, getStats, restart, navProfile
}: {
  state: State;
  getStats: () => number[];
  restart: () => void;
  navProfile: () => void;
}) => {
  return (
    <>
      <Results
        state = {state}
        className = "mt-10"
        stats = {getStats()}
      />
      <ButtonRow
        buttonNames={["restart", "profile"]}
        buttonHandles={[restart, navProfile]}
      />
    </>
  )
}

export default SingleplayerResultsPage
