import {
  LOADING,
  REGISTRATIONSUCCESS,
  ERROR,
  LOGINSUCCESS,
  LOGOUT,
  ERRORTOOGLE,
} from "./actionType";

const user = {
  isError: false,
  isLoading: false,
  isAuth:
    localStorage.getItem("auth") !== null &&
    localStorage.getItem("auth") == "true"
      ? true
      : false,
  token: localStorage.getItem("token"),
  errorToogle: false,
};
export const registerReducer = (state = user, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTRATIONSUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        token: payload,
      };
    }

    case LOGINSUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
      };
    }

    case ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    }

    case ERRORTOOGLE: {
      return {
        ...state,
        errorToogle: !state.errorToogle,
      };
    }

    case LOGOUT: {
      return {
        ...user,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};
