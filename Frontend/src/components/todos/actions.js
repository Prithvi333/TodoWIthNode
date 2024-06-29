import {
  ADDTASK,
  DELETETASK,
  FETCHTODO,
  TODOERROR,
  TODOLODDING,
  COMPLETETASK,
  SEARCHTODOFETCH,
} from "./actionType";
import axios from "axios";
import { ERRORTOOGLE } from "../LoginAndRegister/actionType";
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
  axios
    .post(`${aboluteURL}/create`, todo, headerFormer(token))
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ERRORTOOGLE });
      } else dispatch({ type: ADDTASK, payload: res.data.todo });
    })
    .catch(() => {
      dispatch({ type: TODOERROR });
    });
};

const deleteTodo = (token, taskId) => (dispatch) => {
  // dispatch({ type: TODOLODDING });

  axios
    .delete(`${aboluteURL}/todo/${taskId}`, headerFormer(token))
    .then((res) => {
      if (res.status === 2000) {
        dispatch({ type: ERRORTOOGLE });
      } else dispatch({ type: DELETETASK, payload: res.data.taskId });
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

const searchTodoFetch = (query, token, dispatch) => {
  return axios
    .get(`${aboluteURL}/titletodos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        taskTitle: query,
      },
    })
    .then((res) => {
      if (res.data?.msg) {
        dispatch({ type: SEARCHTODOFETCH, payload: [] });
      } else {
        dispatch({ type: SEARCHTODOFETCH, payload: res.data.Todos });
      }
    })
    .catch((err) => {
      dispatch({ type: TODOERROR });
    });
};

export { loadTodos, createTodo, deleteTodo, completeTask, searchTodoFetch };
