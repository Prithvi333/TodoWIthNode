require("dotenv").config();
const userField = (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;

  const typeCheck =
    typeof userName === "string" &&
    userName !== "" &&
    typeof userEmail === "string" &&
    userName !== "" &&
    typeof userPassword === "string" &&
    userName !== "";

  if (!typeCheck) res.status(200).json({ msg: process.env.userFieldError });
  else next();
};
module.exports = userField;
