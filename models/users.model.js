const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    userEmail: { type: String, require: true },
    userPassword: { type: String, require: true },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
