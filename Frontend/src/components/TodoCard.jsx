import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTodo } from "./todos/actions";

export default function TodoCard({ todoItem }) {
  const {
    _id,
    taskTitle,
    taskDesc,
    taskTime,
    taskPriority,
    taskDeadline,
    day,
    isFavorite,
    isComplete,
  } = todoItem;

  const token = useSelector((store) => store.registerReducer.token);
  const dispatch = useDispatch();

  const handleTaskDelete = (taskId) => {
    dispatch(deleteTodo(token, taskId));
  };

  const handleTaskComplete = (taskId) => {
    dispatch(completeTask(token, taskId));
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-gradient-to-r from-red-100 via-red-200 to-red-300";
      case "MEDIUM":
        return "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-300";
      case "LOW":
        return "bg-gradient-to-l from-green-100 via-green-200 to-green-300";
      default:
        return "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100";
    }
  };

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg mb-6 flex flex-col border border-gray-200 relative ${getPriorityClasses(
        taskPriority
      )}`}
    >
      {isFavorite && (
        <div className="absolute top-0 left-0 mt-2 ml-2">
          <span className="bg-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold">
            Favorite
          </span>
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{taskTitle}</h3>
        <span className="text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
          {taskPriority} Priority
        </span>
      </div>
      <p className="text-gray-700 mb-4">{taskDesc}</p>
      <div className="flex justify-between items-center text-gray-700 mb-4">
        <span>
          <strong>Day:</strong> {day}
          <br />
          <strong>Deadline:</strong> {taskDeadline}
        </span>
        <span>
          <strong>Time:</strong> {taskTime}
        </span>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            handleTaskComplete(_id);
          }}
          className={`flex items-center px-4 py-2 text-white rounded-lg shadow focus:outline-none transition duration-300 ease-in-out ${
            isComplete ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <i
            className={`fas ${
              isComplete ? "fa-check-circle" : "fa-check"
            } mr-2`}
          ></i>{" "}
          {isComplete ? "✔️" : "Complete"}
        </button>

        <button
          onClick={() => {
            handleTaskDelete(_id);
          }}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow focus:outline-none transition duration-300 ease-in-out"
        >
          <i className="fas fa-trash-alt mr-2"></i> Delete
        </button>
      </div>
    </div>
  );
}
