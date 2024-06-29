import React, { useEffect } from "react";
import AddTask from "../AddTask";
import TodoList from "../TodoList";
import Loader from "../Loader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../todos/actions";

export default function Todo() {
  const { token } = useSelector((store) => store.registerReducer);

  const loading = useSelector(
    (store) => store.todoReducer.isLoading,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos(token));
  }, []);

  return (
    <div className=" ">
      <div className="flex justify-evenly   ">
        <AddTask />
        {loading ? <Loader /> : <TodoList />}
      </div>
    </div>
  );
}
