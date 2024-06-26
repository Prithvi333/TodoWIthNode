import {
  TODOLODDING,
  TODOERROR,
  FETCHTODO,
  ADDTASK,
  DELETETASK,
  COMPLETETASK,
} from "./actionType";

const todoData = { userId: "", todos: [], isLoading: false, isError: false };
const deleteOrComplete = (state, payload, type) => {
  console.log(payload);
  if (type === "complete") {
    return {
      ...state,
      isLoading: false,
      todos: state.todos.map((element) => {
        if (element._id === payload) {
          element.isComplete = !element.isComplete;
          console.log(element);
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
