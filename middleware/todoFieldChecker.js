require("dotenv").config();
const todoField = (req, res, next) => {
  const { taskTitle, taskDesc, day, taskDeadline, taskPriority } = req.body;

  const typeCheck =
    typeof taskTitle === "string" &&
    typeof taskDesc === "string" &&
    typeof day === "string" &&
    typeof taskDeadline === "string" &&
    typeof taskPriority === "string";
  if (!typeCheck) res.status(200).json({ msg: process.env.todoFieldError });
  next();
};
module.exports = todoField;
