import { GET_THEMES, ADD_THEMES } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function themesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THEMES:
      return { ...state, data: action.payload };
    case ADD_THEMES:
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
}
