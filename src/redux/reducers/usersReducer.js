import { GET_USERS } from "../actions/actionTypes";

const initialState = {
  data: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
