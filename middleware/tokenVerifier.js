const { json } = require("express");
const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blacklist.model");
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const blackListedUser = await BlackListModel.findOne({
      blockedToken: token,
    });

    if (blackListedUser) res.status(200).json({ msg: "Please login first" });
    else {
      jwt.verify(token, "secure", (err, decode) => {
        if (!err) {
          const { userId, userName } = decode;
          req.body.userId = userId;
          req.body.userName = userName;
          next();
        } else if (err) res.status(200).json({ msg: "Something went wrong" });
      });
    }
  } else res.status(200).json({ msg: "Not authorized" });
};
module.exports = validateToken;
