import { GET_TASKS, ADD_TASKS } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, data: action.payload };
    case ADD_TASKS:
      return { ...state, data: [...state.data, action.payload] };

    default:
      return state;
  }
}
