import { GET_QUOTES, ADD_QUOTES } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function quotesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return { ...state, data: action.payload };
    case ADD_QUOTES:
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
}
