const User = require("../models/user");

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



module.exports = {
  createUser
}