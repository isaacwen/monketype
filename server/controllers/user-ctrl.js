const User = require("../models/user");
const bcrypt = require("bcryptjs");

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and password',
    });
  };

  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false, error: err })
  }

  user.save().then(() => {
    return res.status(201).json({
      success: true,
      id: user.username,
      message: "User created",
    });
  }).catch((error) => {
    return res.status(400).json({
      error,
      message: "User not created",
    });
  });
}

verifyUser = async (req, res) => {
  if (!req.query.username || !req.query.password) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and password',
    });
  }

  const username = req.query.username;
  const password = req.query.password;

  const user = await User.findOne({"username": username});
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      return res.status(201).json({
        success: true
      })
    }
  }
  return res.status(400).json({
    success: false
  })
}

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and password',
    });
  };

  const user = await User.findOne({"username": body.username});
  if (user) {
    user.completedTests = user.completedTests + 1;
    const wpm = body.wpm;
    const acc = body.acc;
    const raw = body.raw;
    if (user.completedTests === 1) {
      user.avgWPM = wpm;
      user.avgRaw = raw;
      user.avgAcc = acc;
    } else {
      user.avgWPM = user.avgWPM * ((user.completedTests - 1) / user.completedTests) + wpm / user.completedTests;
      user.avgRaw = user.avgRaw * ((user.completedTests - 1) / user.completedTests) + raw / user.completedTests;
      user.avgAcc = user.avgAcc * ((user.completedTests - 1) / user.completedTests) + acc / user.completedTests;
    }
    switch (body.test) {
      case 120:
        if (wpm > user.bestWPM120) {
          user.bestWPM120 = wpm;
          user.bestWPM120Acc = acc;
        }
        break;
      case 60:
        if (wpm > user.bestWPM60) {
          user.bestWPM60 = wpm;
          user.bestWPM60Acc = acc;
        }
        break;
      case 30:
        if (wpm > user.bestWPM30) {
          user.bestWPM30 = wpm;
          user.bestWPM30Acc = acc;
        }
        break;
      default:
        if (wpm > user.bestWPM15) {
          user.bestWPM15 = wpm;
          user.bestWPM15Acc = acc;
        }
    }
    user.save().then(() => {
      return res.status(200).json(user);
    }).catch(() => {
      return res.status(404).json({
        success: false
      });
    })
  } else {
    return res.status(404);
  }
}

getUser = async (req, res) => {
  if (!req.query.username) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and password',
    });
  }

  const username = req.query.username;

  const user = await User.findOne({"username": username});
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(400).json({
    success: false
  })
}

module.exports = {
  createUser,
  verifyUser,
  updateUser,
  getUser
}