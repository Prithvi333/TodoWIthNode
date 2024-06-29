const express = require("express");
const app = express();
const { connection } = require("./utility/dbconnection");
const { userRoute } = require("./routes/users.route");
const { taskRoute } = require("./routes/todos.route");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(express.json());
userRoute.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).json({ msg: "My application is up and running..." });
});
app.use("/user", userRoute);
app.use("/task", taskRoute);
app.listen(process.env.port, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server is up and running on port ${process.env.port}`);
});
