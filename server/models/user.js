const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  completedTests: {type: Number, default: 0},
  avgWPM: {type: Number, default: -1},
  avgRaw: {type: Number, default: -1},
  avgAcc: {type: Number, default: -1},
  bestWPM15: {type: Number, default: -1},
  bestWPM30: {type: Number, default: -1},
  bestWPM60: {type: Number, default: -1},
  bestWPM120: {type: Number, default: -1},
  bestWPM15Acc: {type: Number, default: -1},
  bestWPM30Acc: {type: Number, default: -1},
  bestWPM60Acc: {type: Number, default: -1},
  bestWPM120Acc: {type: Number, default: -1}
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        })
      }
    })
  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
}

module.exports = mongoose.model("User", UserSchema);