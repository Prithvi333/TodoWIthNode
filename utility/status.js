const { TodoModel } = require("../models/todos.model");
const statusHandler = async (req, res, stats) => {
  const { taskId } = req.params;
  const uId = req.body.userId;

  try {
    const task = await TodoModel.findOne({ _id: taskId });
    const { userId } = task;
    if (userId === uId) {
      const modifyData = stats
        ? { isComplete: !task.isComplete }
        : { isFavorite: !task.isFavorite };
      await TodoModel.findByIdAndUpdate({ _id: taskId }, modifyData);
      res.status(200).json({
        msg: `Todo ${
          stats ? "complete" : "favorite"
        } status changed successfully`,
        taskId: taskId,
      });
    } else {
      res.status(200).json({ msg: "Permission denied" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = statusHandler;
