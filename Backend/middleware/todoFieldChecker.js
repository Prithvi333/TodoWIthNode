require("dotenv").config();
const todoField = (req, res, next) => {
  const { taskTitle, taskDesc, day, taskDeadline, taskPriority } = req.body;

  const typeCheck =
    typeof taskTitle === "string" &&
    taskTitle !== "" &&
    typeof taskDesc === "string" &&
    taskDesc !== "" &&
    typeof taskDeadline === "string" &&
    taskDeadline !== "" &&
    typeof taskPriority === "string";
  taskPriority !== "";

  if (!typeCheck) res.status(200).json({ msg: process.env.todoFieldError });
  else {
    next();
  }
};
module.exports = todoField;
