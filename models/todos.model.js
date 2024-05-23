const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    userId: { type: String, require: false },
    userName: { type: String, require: false },
    taskTitle: { type: String, require: true },
    taskDesc: { type: String, require: true },
    day: { type: String, require: true },
    taskDeadline: { type: String, require: true },
    isFavorite: { type: Boolean, require: true },
    isComplete: { type: Boolean, require: true },
    taskPriority: { type: String, require: true },
    taskTime: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const TodoModel = mongoose.model("task", todoSchema);
module.exports = { TodoModel };
