import UserTypings from './UserTypings';

const WordRows = ({
  currentRowWords, currentRowTyped, nextRowWords
}: {
  currentRowWords: string;
  currentRowTyped: string;
  nextRowWords: string;
}) => {
  return (
    <div className = "relative mt-3 mx-7 text-3xl leading-relaxed break-normal" >
      <div className="text-slate-500">{currentRowWords}</div>
      <UserTypings className = "absolute inset-0" userInput = {currentRowTyped} words = {currentRowWords}/>
      <div className="text-slate-500">{nextRowWords}</div>
    </div>
  );
}

export default WordRows;
