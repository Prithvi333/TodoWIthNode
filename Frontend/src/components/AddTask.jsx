import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "./todos/actions";
const taskDetails = {
  taskTitle: "",
  taskDesc: "",
  taskPriority: "",
  taskDeadline: "",
  isFavorite: false,
};
const today = new Date().toISOString().split("T")[0];

export default function AddTask() {
  const [task, setTask] = useState(taskDetails);
  const token = useSelector((store) => store.registerReducer.token);
  const dispatch = useDispatch();
  const handleTaskData = (e) => {
    let value;
    if (e.target.name === "isFavorite") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setTask({
      ...task,
      [e.target.name]: value,
    });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();

    dispatch(createTodo(token, task));
  };

  return (
    <div className="flex  bg-gradient-to-br from-blue-50 to-slate-100 w-1/3">
      <form className="p-8 bg-white shadow-xl rounded-lg w-full max-w-md ">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600">
          Add Task
        </h2>

        <div className="mb-6">
          <label
            htmlFor="taskTitle"
            className="block text-gray-700 font-medium mb-2"
          >
            Task Title
          </label>
          <input
            required
            type="text"
            id="taskTitle"
            name="taskTitle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            onChange={handleTaskData}
            value={task.taskTitle}
            maxLength={50}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskDesc"
            className="block text-gray-700 font-medium mb-2"
          >
            Task Description
          </label>
          <textarea
            required
            style={{ height: "171px" }}
            id="taskDesc"
            name="taskDesc"
            className="resize-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            onChange={handleTaskData}
            value={task.taskDesc}
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskDeadline"
            className="block text-gray-700 font-medium mb-2"
          >
            Task Deadline
          </label>
          <input
            required
            type="date"
            id="taskDeadline"
            name="taskDeadline"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleTaskData}
            value={task.taskDeadline}
            min={today}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={handleTaskData}
              value={task.isFavorite}
            />
            <label
              htmlFor="isFavorite"
              className="ml-2 text-gray-700 font-medium"
            >
              Favorite
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="taskPriority"
            className="block text-gray-700 font-medium mb-2"
          >
            Task Priority
          </label>
          <select
            id="taskPriority"
            name="taskPriority"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleTaskData}
            value={task.taskPriority}
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={handleDataSubmit}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
