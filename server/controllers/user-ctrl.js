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
  // if (!req.body) {
  //   return res.status(400).json({
  //     success: false,
  //     error: 'You must provide a username and password',
  //   });
  // };

  // const username = req.body["username"];
  // const password = req.body["password"];

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

module.exports = {
  createUser,
  verifyUser
}