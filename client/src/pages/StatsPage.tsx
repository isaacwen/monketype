import { useEffect, useState } from "react";
import api from "../api/api";
import User from "../api/User";
import ButtonRow from "../components/ButtonRow";
import { pageWrapper } from "../utils/helpers";

const StatsPage = ({
  user, className, navBack, signOut
}: {
  user: string | null;
  className: string;
  navBack: () => void;
  signOut: () => void;
}) => {
  const [userStats, setUserStats] = useState<User | null>(null);

  const headingStyle = "text-xl font-semibold";

  useEffect(() => {
    api.getUser({"username": user}, setUserStats);
  }, [user, setUserStats]);

  return (pageWrapper(
    <div className="flex min-h-full flex-col justify-center test px-6 lg:px-8 max-w-6xl items-center text-primary-400 space-y-3 py-10">
      {userStats ? (
        <>
          <h2 className={`${headingStyle}`}>Tests completed: {userStats.completedTests}</h2>
          <h2 className={`pt-8 ${headingStyle}`}>Averages</h2>
          <ul className = {`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
            <li>{displayValue(userStats.avgWPM)} WPM</li>
            <li>{displayValue(userStats.avgRaw)} raw</li>
            <li>{displayValue(userStats.avgAcc, true)} accuracy</li>
          </ul>
          <h2 className={`pt-8 ${headingStyle}`}>Best Scores</h2>
          <ul className = {`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
            <li>15 seconds: {userStats.bestWPM15 === -1 ? "-" : (`${displayValue(userStats.bestWPM15)} WPM (${displayValue(userStats.bestWPM15Acc, true)})`)}</li>
            <li>30 seconds: {userStats.bestWPM30 === -1 ? "-" : (`${displayValue(userStats.bestWPM30)} WPM (${displayValue(userStats.bestWPM30Acc, true)})`)}</li>
            <li>60 seconds: {userStats.bestWPM60 === -1 ? "-" : (`${displayValue(userStats.bestWPM60)} WPM (${displayValue(userStats.bestWPM60Acc, true)})`)}</li>
            <li>90 seconds: {userStats.bestWPM120 === -1 ? "-" : (`${displayValue(userStats.bestWPM120)} WPM (${displayValue(userStats.bestWPM120Acc, true)})`)}</li>
          </ul>
        </>
        ) : <></> }
      <ButtonRow
        buttonNames={["back", "sign out"]}
        buttonHandles={[navBack, signOut]}
      />
    </div>
    
  ))
}

const displayValue = (num: number, addPercentage: boolean = false) => {
  return (num === -1 ? "-" : (num.toFixed(0).toString() + (addPercentage ? "%" : "")));
}

export default StatsPage;