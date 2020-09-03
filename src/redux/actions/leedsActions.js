import axios from "axios";
import { GET_LEEDS } from "./actionTypes";

export const getLeeds = (data) => {
  return {
    type: GET_LEEDS,
    payload: data,
  };
};

export const getAsyncLeeds = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/leeds")
      .then((result) => {
        const leeds = result.data;
        dispatch(getLeeds(leeds));
      })
      .catch((error) => console.log(error));
  };
};
