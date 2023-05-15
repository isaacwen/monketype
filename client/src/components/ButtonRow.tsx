import FlexButton from './FlexButton';
import { ButtonTypes } from './FlexButton';

const ButtonRow = ({
  buttonNames, buttonHandles
}: {
  buttonNames: ButtonTypes [];
  buttonHandles: { (): void} [];
}) => {
  const BUTTON_STYLE = "mx-auto mt-10 text-slate-500";
  const buttons = [];
  for (let i = 0; i < buttonNames.length; i++) {
    buttons.push(
      <FlexButton
        key = {buttonNames[i]}
        handleClick = {buttonHandles[i]}
        buttonName = {buttonNames[i]}
        className = {BUTTON_STYLE}
      />
    );
  }
  return (
    <div className="flex justify-center gap-x-4 buttons test">
      {buttons}
    </div>
  );
}

export default ButtonRow;
