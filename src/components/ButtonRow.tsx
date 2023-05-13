import FlexButton from './FlexButton';

const ButtonRow = ({
  handleRestart, handleChangeMode, forSingleplayer
}: {
  handleRestart: () => void;
  handleChangeMode: () => void;
  forSingleplayer: boolean;
}) => {
  const BUTTON_STYLE = "mx-auto mt-10 text-slate-500";
  return (
  <div className="flex content-center buttons test">
    <FlexButton
      handleClick = {handleRestart}
      buttonName = {"restart"}
      className = {BUTTON_STYLE}
    />
    <FlexButton
      handleClick = {handleChangeMode}
      buttonName = {forSingleplayer ? "multiplayer" : "singleplayer"}
      className = {BUTTON_STYLE}
    />
  </div>)
}

export default ButtonRow;
