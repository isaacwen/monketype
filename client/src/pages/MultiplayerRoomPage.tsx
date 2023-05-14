import ButtonRow from "../components/ButtonRow";
import { basePage } from "../utils/helpers";

const MultiplayerRoomPage = ({
  textWidthRef, restart, navProfile, navSettings
}: {
  textWidthRef: React.RefObject<HTMLDivElement>;
  restart: () => void;
  navProfile: () => void;
  navSettings: () => void;
}) => {
  return (basePage(textWidthRef, 
    <>
      <div className = "flex flex-wrap gap-x-4 gap-y-4 justify-center">
      <button type="submit" className="min-w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create New Room</button>
      <input type="text" id="default-input" className="text-center min-w-max w-80 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = "Enter Existing Room Code"/>
      </div>
      <ButtonRow
        buttonNames={["restart", "profile", "settings"]}
        buttonHandles={[restart, navProfile, navSettings]}
      />
    </>
  ));
}

export default MultiplayerRoomPage;