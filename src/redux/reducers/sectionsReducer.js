import { GET_SECTIONS, ADD_SECTIONS } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function sectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SECTIONS:
      return { ...state, data: action.payload };
    case ADD_SECTIONS:
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
}
