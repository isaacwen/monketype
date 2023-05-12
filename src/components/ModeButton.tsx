import { useRef } from 'react'
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";

const ModeButton = ({mode, changeMode, className}: {mode: string; changeMode: () => void; className: string}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    changeMode();
  };
  return (
    <button
      ref = { buttonRef }
      onClick = { handleClick }
      className = {`block rounded px-8 py-2 hover:bg-zinc-700 ${className}`}
    >
      {mode === "singleplayer" ? <BsFillPeopleFill className = "w-6 h-6"/> : <BsFillPersonFill className = "w-6 h-6"/>}
    </button>
  )
};

export default ModeButton;