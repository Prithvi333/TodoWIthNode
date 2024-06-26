import {
  ADDTASK,
  DELETETASK,
  FETCHTODO,
  TODOERROR,
  TODOLODDING,
  COMPLETETASK,
} from "./actionType";
import axios from "axios";

const aboluteURL = "http://localhost:8080/task";

const headerFormer = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const loadTodos = (token) => (dispatch) => {
  dispatch({ type: TODOLODDING });
  return axios
    .get(`${aboluteURL}/todos`, headerFormer(token))
    .then((res) => {
      dispatch({ type: FETCHTODO, payload: res.data.Todos });
    })
    .catch((err) => {
      dispatch({ type: TODOERROR });
    });
};

const createTodo = (token, todo) => (dispatch) => {
  dispatch({ type: TODOLODDING });

  axios
    .post(`${aboluteURL}/create`, todo, headerFormer(token))
    .then((res) => {
      dispatch({ type: ADDTASK, payload: res.data.todo });
    })
    .catch(() => {
      dispatch({ type: TODOERROR });
    });
};

const deleteTodo = (token, taskId) => (dispatch) => {
  dispatch({ type: TODOLODDING });
  axios
    .delete(`${aboluteURL}/todo/${taskId}`, headerFormer(token))
    .then((res) => {
      dispatch({ type: DELETETASK, payload: res.data.taskId });
    })
    .catch(() => dispatch({ type: TODOERROR }));
};

const completeTask = (token, taskId) => (dispatch) => {
  // dispatch({ type: TODOLODDING });

  fetch(`${aboluteURL}/cstatus/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: COMPLETETASK, payload: res.taskId });
    })
    .catch(() => {
      dispatch({ type: TODOERROR });
    });
};

export { loadTodos, createTodo, deleteTodo, completeTask };
