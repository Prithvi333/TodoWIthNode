require("dotenv").config();
const userField = (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;

  const typeCheck =
    typeof userName === "string" &&
    typeof userEmail === "string" &&
    typeof userPassword === "string";

  if (!typeCheck) res.status(200).json({ msg: process.env.userFieldError });
  else next();
};
module.exports = userField;
