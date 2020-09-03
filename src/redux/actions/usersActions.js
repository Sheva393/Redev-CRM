import axios from "axios";
import { GET_USERS } from "./actionTypes";

export const getUsers = (data) => {
  return {
    type: GET_USERS,
    payload: data,
  };
};

export const getAsyncUsers = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/users")
      .then((result) => {
        const users = result.data;
        dispatch(getUsers(users));
      })
      .catch((error) => console.log(error));
  };
};
