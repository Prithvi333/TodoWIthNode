import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { searchTodoFetch } from "./todos/actions";
import EmptyTodoList from "./EmptyTodoList";
const barSelectors = { sortVal: "", searchVal: "", checkVal: false };
const getFilteredTodos = (todos, customValue, favorite) => {
  let myTodos = todos;
  if (customValue === "low")
    myTodos = todos.filter((ele) => ele.taskPriority === "LOW");
  else if (customValue === "high")
    myTodos = todos.filter((ele) => ele.taskPriority === "HIGH");
  else if (customValue === "medium")
    myTodos = todos.filter((ele) => ele.taskPriority === "MEDIUM");

  myTodos = favorite ? myTodos.filter((item) => item.isFavorite) : myTodos;

  return myTodos;
};
export default function TodoList() {
  const { todos, searchedTodos } = useSelector((store) => store.todoReducer);
  const { token } = useSelector((store) => store.registerReducer);
  const dispatch = useDispatch();
  const [checker, setChecker] = useState(barSelectors);
  const { sortVal, searchVal, checkVal } = checker;

  useEffect(() => {
    searchTodoFetch(searchVal, token, dispatch);
  }, [searchVal]);
  const fieldChanger = (e) => {
    let value =
      e.target.name === "checkVal" ? e.target.checked : e.target.value;
    setChecker({
      ...checker,
      [e.target.name]: value,
    });
  };
  let myTodo = [];
  searchedTodos.length > 0
    ? (myTodo = searchedTodos)
    : (myTodo = getFilteredTodos(todos, sortVal, checkVal));

  return (
    <>
      <div className="  w-4/5">
        <div className=" bg-slate-100 p-8   ">
          <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg">
            <select
              onChange={fieldChanger}
              name="sortVal"
              className="bg-blue-50 border border-blue-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
            >
              <option value="">Order by priority</option>
              <option value="low">Low</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              className="bg-blue-50 border border-blue-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              onChange={fieldChanger}
              name="searchVal"
            />

            <label className="inline-flex items-center bg-blue-50 border border-blue-300 px-3 py-2 rounded-lg cursor-pointer transition duration-200 ease-in-out transform hover:bg-blue-100 hover:scale-105">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 focus:ring-blue-500"
                onChange={fieldChanger}
                name="checkVal"
              />
              <span className="ml-2 text-gray-700 font-medium">Favorite</span>
            </label>
          </div>
        </div>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">My Todos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {myTodo?.length > 0 ? (
              myTodo.map((element) => (
                <TodoCard key={element._id} todoItem={element} />
              ))
            ) : (
              <EmptyTodoList />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
