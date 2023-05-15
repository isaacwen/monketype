import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";

const Results = (
  {state, stats, className}:
  {state: State, stats: number[], className?: string}
) => {
  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const duration = { duration: 0.3 }

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul
      className = {`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li initial = {initial} animate = {animate} transition = {{...duration, delay: 0}} className = "text-xl font-semibold">Stats</motion.li>
      <motion.li initial = {initial} animate = {animate} transition = {{...duration, delay: 0.5}}>WPM: {Math.trunc(stats[1])}</motion.li>
      <motion.li initial = {initial} animate = {animate} transition = {{...duration, delay: 0.5}}>Raw: {Math.trunc(stats[2])}</motion.li>
      <motion.li initial = {initial} animate = {animate} transition = {{...duration, delay: 0.5}}>Accuracy: {stats[0].toFixed(0) + "%"}</motion.li>
    </motion.ul>
  )
}

export default Results