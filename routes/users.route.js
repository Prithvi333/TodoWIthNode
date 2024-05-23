const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blacklist.model");
const validateToken = require("../middleware/tokenVerifier");
const generateToken = require("../utility/refreshToken");
const userField = require("../middleware/userFieldChecker");
userRoute.post("/register", userField, (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    bcrypt.hash(userPassword, 4, async (err, hash) => {
      if (err) res.send(err);
      const newUser = new UserModel({
        userName,
        userEmail,
        userPassword: hash,
      });
      await newUser.save();
    });
    res.status(201).json({ msg: "User has been created successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRoute.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await UserModel.findOne({ userEmail: userEmail });
  if (user) {
    try {
      bcrypt.compare(userPassword, user.userPassword, (err, valid) => {
        if (valid) {
          const { _id, userName } = user;
          const token = jwt.sign({ userId: _id, userName }, "secure", {
            expiresIn: 6000,
          });
          const refToken = jwt.sign({ userId: _id, userName }, "refresh", {
            expiresIn: "1h",
          });
          res.setHeader("token", token);
          res.setHeader("refToken", refToken);
          res.status(200).json({ msg: "Login successful" });
        } else if (err) res.status(200).json({ msg: "Incorrect password" });
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else res.status(404).json({ msg: "User not found" });
});

userRoute.get("/logout", validateToken, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const loggedOutUser = new BlackListModel({
      userId: req.body.userId,
      blockedToken: token,
    });
    await loggedOutUser.save();
    res.status(200).json({ msg: "Logout successfully" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
userRoute.get("/rtoken", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  generateToken(req, res, token);
});

module.exports = { userRoute };
