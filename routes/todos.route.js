const express = require("express");
const taskRoute = express.Router();
const validation = require("../middleware/tokenVerifier");
const { TodoModel } = require("../models/todos.model");
const statusHandler = require("../utility/status");
const todoField = require("../middleware/todoFieldChecker");
const todoCache = require("../middleware/todoCache");
require("dotenv").config();
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);
(async () => {
  await client.connect();
})();
taskRoute.use(validation);

taskRoute.post("/create", todoField, async (req, res) => {
  req.body.taskPriority = req.body.taskPriority.toUpperCase();
  req.body.isComplete = false;
  req.body.isFavorite = false;
  const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  req.body.taskTime = time;
  try {
    const newTask = new TodoModel(req.body);
    await newTask.save();
    await client.set("todos", "");
    res.status(201).json({ msg: "Todo item create successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

taskRoute.get("/todos", todoCache(client), async (req, res) => {
  try {
    const todoList = await TodoModel.find({ userId: req.body.userId });
    await client.set("todos", JSON.stringify(todoList), (err, reply) => {
      if (err) console.log(err);
    });
    if (todoList.length == 0)
      res.status(200).json({ msg: "Todo list is empty" });
    else {
      res.status(200).json({ Todos: todoList });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

taskRoute.patch("/update/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const uId = req.body.userId;

  try {
    const task = await TodoModel.findOne({ _id: taskId });
    const { userId } = task;

    if (userId === uId) {
      await TodoModel.findByIdAndUpdate({ _id: taskId }, req.body);
      await client.set("todos", "");
      res.status(200).json({ msg: "Todo item updated successfully" });
    } else {
      res.status(200).json({ msg: "Permission denied" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

taskRoute.delete("/todo/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const uId = req.body.userId;

  try {
    const task = await TodoModel.findOne({ _id: taskId });
    const { userId } = task;

    if (userId === uId) {
      await TodoModel.findByIdAndDelete({ _id: taskId });
      await client.set("todos", "");
      res.status(200).json({ msg: "Todo item deleted successfully" });
    } else {
      res.status(200).json({ msg: "Permission denied" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

taskRoute.patch("/cstatus/:taskId", async (req, res) => {
  statusHandler(req, res, true, client);
});
taskRoute.patch("/fstatus/:taskId", async (req, res) => {
  statusHandler(req, res, false, client);
});

module.exports = { taskRoute, client };
