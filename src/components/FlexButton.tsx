import { useRef } from 'react'
import { MdRefresh } from 'react-icons/md';
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";

export type ButtonTypes = "restart" | "singleplayer" | "multiplayer";

const FlexButton = ({ handleClick: handleClickMain, buttonName, className = " "}: {handleClick: () => void; buttonName: ButtonTypes; className: string}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleClickMain();
  };

  const getButtonIcon = (className: string) => {
    switch (buttonName) {
      case "restart":
        return <MdRefresh className={className}/>
      case "singleplayer":
        return <BsFillPersonFill className={className}/>
      default:
        return <BsFillPeopleFill className={className}/>
    }
  }

  return (
    <button
      ref = { buttonRef }
      onClick = { handleClick }
      className = {`block rounded px-8 py-2 hover:bg-zinc-700 ${className}`}
    >
      {getButtonIcon("w-6 h-6")}
    </button>
  )
};

export default FlexButton;