import React from "react";

const EmptyTodoList = () => {
  return (
    <div className="flex items-center justify-center   ">
      <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your To-Do List is Empty
        </h2>
        <p className="text-gray-500 mt-2">Add tasks to get started!</p>
      </div>
    </div>
  );
};

export default EmptyTodoList;
