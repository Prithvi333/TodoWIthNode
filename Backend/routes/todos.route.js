const express = require("express");
const taskRoute = express.Router();
const validation = require("../middleware/tokenVerifier");
const { TodoModel } = require("../models/todos.model");
const statusHandler = require("../utility/status");
const todoField = require("../middleware/todoFieldChecker");

require("dotenv").config();

taskRoute.use(validation);

taskRoute.post("/create", todoField, async (req, res) => {
  req.body.taskPriority = req.body.taskPriority.toUpperCase();
  req.body.isComplete = false;
  const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  req.body.day = weekdays[new Date().getDay()];
  req.body.taskTime = time;
  try {
    const newTask = new TodoModel(req.body);
    await newTask.save();

    res.status(201).json({ todo: req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
taskRoute.get("/todos", async (req, res) => {
  try {
    const todoList = await TodoModel.find({ userId: req.body.userId });

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
      res.status(200).json({ taskId: taskId });
    } else {
      res.status(200).json({ msg: "Permission denied" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

taskRoute.patch("/cstatus/:taskId", async (req, res) => {
  statusHandler(req, res, true);
});
taskRoute.patch("/fstatus/:taskId", async (req, res) => {
  statusHandler(req, res, false);
});

module.exports = { taskRoute };
