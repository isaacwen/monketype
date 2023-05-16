import { State } from "../hooks/useEngine";

const Results = (
  {state, stats, className}:
  {state: State, stats: number[], className?: string}
) => {
  if (state !== "finish") {
    return null;
  }

  return (
    <ul
      className = {`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <li className = "text-xl font-semibold">Stats</li>
      <li>WPM: {Math.trunc(stats[1])}</li>
      <li>Raw: {Math.trunc(stats[2])}</li>
      <li>Accuracy: {stats[0].toFixed(0) + "%"}</li>
    </ul>
  )
}

export default Results