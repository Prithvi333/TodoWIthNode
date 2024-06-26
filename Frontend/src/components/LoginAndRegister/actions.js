import axios from "axios";
import {
  LOADING,
  ERROR,
  REGISTRATIONSUCCESS,
  LOGINSUCCESS,
  LOGOUT,
} from "./actionType";

const absolutePath = "http://localhost:8080/user";

const headerFormer = () => ({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const registerUser = (cred, navigate) => (dispatch) => {
  dispatch({ type: LOADING });

  return axios
    .post(`${absolutePath}/register`, cred, headerFormer())
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ERROR });
      }
      dispatch({
        type: REGISTRATIONSUCCESS,
        payload: cred,
      });
    })
    .catch((error) => {
      dispatch({ type: ERROR });
      navigate("/");
    });
};

const loginUser = (userCred, navigate) => (dispatch) => {
  dispatch({ type: LOADING });

  const { userEmail, userPassword } = userCred;
  fetch(`${absolutePath}/login`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${userEmail}:${userPassword}`),
    },
  })
    .then((res) => {
      if (res.status === 400 || res.status === 404) {
        dispatch({ type: ERROR });
      } else {
        dispatch({
          type: LOGINSUCCESS,
          payload: res.headers.get("Authorization").split(" ")[1],
        });
        localStorage.setItem("email", userEmail);
        navigate("/todo");
      }
    })
    .catch(() => {
      dispatch({ type: ERROR });
    });
};

const logout = (token) => (dispatch) => {
  return axios
    .get(`${absolutePath}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      dispatch({ type: LOGOUT });
    });
};

export { registerUser, loginUser, logout };
