const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(`${process.env.mongoURL}/todo`);
module.exports = { connection };
