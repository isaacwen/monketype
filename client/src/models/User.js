const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
  // completedTests: {type: Number, default: 0},
  // avgWPM: {type: Number, default: -1},
  // avgRaw: {type: Number, default: -1},
  // avgAcc: {type: Number, default: -1},
  // bestWPM15: {type: Number, default: -1},
  // bestWPM30: {type: Number, default: -1},
  // bestWPM60: {type: Number, default: -1},
  // bestWPM120: {type: Number, default: -1}
});

UserSchema.pre("save", (next) => {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
    if (saltError) return next(saltError);
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      user.password = hash;
      next()
    })
  })
})

UserSchema.methods.comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  })
}
const User = mongoose.model("User", UserSchema);
// module.exports = User;
module.exports = User;