import { useRef } from 'react'
import { MdRefresh } from 'react-icons/md';
import { BsFillPersonFill, BsFillGearFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { RxExit } from "react-icons/rx";

export type ButtonTypes = "restart" | "profile" | "settings" | "back" | "sign out";

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
      case "profile":
        return <BsFillPersonFill className={className}/>
      case "settings":
        return <BsFillGearFill className={className}/>
      case "back":
        return <BiArrowBack className={className}/>
      default:
        return <RxExit className={className}/>
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