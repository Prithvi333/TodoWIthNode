const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
  userId: String,
  blockedToken: String,
});
const BlackListModel = mongoose.model("blacklist", blackListSchema);

module.exports = BlackListModel;
