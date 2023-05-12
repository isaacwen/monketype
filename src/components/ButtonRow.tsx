import RestartButton from './RestartButton';
import ModeButton from './ModeButton';

const ButtonRow = ({
  handleRestart, mode, changeMode
}: {
  handleRestart: () => void;
  mode: string;
  changeMode: () => void;
}) => {
  const BUTTON_STYLE = "mx-auto mt-10 text-slate-500";
  return (
  <div className="flex content-center buttons test">
    <RestartButton
      className = {"mx-auto mt-10 text-slate-500"}
      handleRestart = {handleRestart}
    />
    <ModeButton
      mode = {mode}
      changeMode = {changeMode}
      className = {"mx-auto mt-10 text-slate-500"}
    />
  </div>)
}

export default ButtonRow;
