const Timer = ({
  timeLeft
}: {
  timeLeft: number;
}) => {
  return (
    <h2 className="text-primary-400 text-xl font-medium mx-7">Time: {timeLeft}</h2>
  )
}

export default Timer;