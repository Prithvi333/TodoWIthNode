const userEmailPasswordDecoder = (userEmail, userPassword) => ({
  userEmail: Buffer.from(userEmail, "base64").toString("utf-8"),
  userPassword: Buffer.from(userPassword, "base64").toString("utf-8"),
});
module.exports = userEmailPasswordDecoder;
