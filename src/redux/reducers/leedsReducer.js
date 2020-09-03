import { GET_LEEDS } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function leedsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEEDS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
