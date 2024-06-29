import {
  TODOLODDING,
  TODOERROR,
  FETCHTODO,
  ADDTASK,
  DELETETASK,
  COMPLETETASK,
  SEARCHTODOFETCH,
} from "./actionType";
import { searchTodoFetch } from "./actions";

const todoData = {
  userId: "",
  todos: [],
  isLoading: false,
  isError: false,
  searchedTodos: [],
};
const deleteOrComplete = (state, payload, type) => {
  if (type === "complete") {
    return {
      ...state,
      isLoading: false,
      todos: state.todos.map((element) => {
        if (element._id === payload) {
          element.isComplete = !element.isComplete;
        }
        return element;
      }),
    };
  }

  return {
    ...state,
    isLoading: false,
    todos: state.todos.filter((item) => item._id !== payload),
  };
};
export const todoReducer = (state = todoData, action) => {
  const { type, payload } = action;

  switch (type) {
    case TODOLODDING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCHTODO: {
      return {
        ...state,
        isLoading: false,
        todos: payload,
      };
    }

    case TODOERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case ADDTASK: {
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, payload],
      };
    }
    case SEARCHTODOFETCH: {
      return {
        ...state,
        searchedTodos: payload,
      };
    }
    case DELETETASK: {
      return deleteOrComplete(state, payload, "delete");
    }
    case COMPLETETASK: {
      return deleteOrComplete(state, payload, "complete");
    }
    default: {
      return state;
    }
  }
};
