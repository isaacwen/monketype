interface User {
  username: string;
  password: string;
  completedTests: number;
  avgWPM: number;
  avgRaw: number;
  avgAcc: number;
  bestWPM15: number;
  bestWPM30: number;
  bestWPM60: number;
  bestWPM120: number;
  bestWPM15Acc: number;
  bestWPM30Acc: number;
  bestWPM60Acc: number;
  bestWPM120Acc: number;
};

export default User;