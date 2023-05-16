import { ReactElement } from "react";
import { motion } from "framer-motion";

export const basePage = (textWidthRef: React.RefObject<HTMLDivElement>, contents: ReactElement, className: string = "") => {
  return (
    <div className = {"max-w-6xl test content-center " + className} ref = {textWidthRef}>
      {contents}
    </div>
  )
}

export const pageWrapper = (contents: ReactElement) => {
  return (
    <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      exit = {{opacity: 0}}
      transition = {{duration: 0.4}}
    >
      {contents}
    </motion.div>
  )
}