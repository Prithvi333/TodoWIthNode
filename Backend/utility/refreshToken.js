const jwt = require("jsonwebtoken");

const generateToken = (req, res, rtoken) => {
  jwt.verify(rtoken, "refresh", (err, decode) => {
    if (err)
      res.status(200).json({ msg: "Please provide valid refresh token" });
    else {
      const newToken = jwt.sign(
        { userId: decode.userId, userName: decode.userName },
        "secure",
        { expiresIn: 6000 }
      );
      res.setHeader("token", newToken);
      res.status(200).json({ msg: "Token created successfully" });
    }
  });
};

module.exports = generateToken;
