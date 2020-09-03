import axios from "axios";
import { GET_THEMES, ADD_THEMES } from "./actionTypes";

export const getThemes = (data) => {
  return {
    type: GET_THEMES,
    payload: data,
  };
};

export const addThemes = (data) => {
  return {
    type: ADD_THEMES,
    payload: data,
  };
};

export const addAsyncThemes = (params) => {
  return (dispatch) => {
    axios
      .post("https://redevcrm.herokuapp.com/CheatSheetThemes", params)
      .then((response) => dispatch(addThemes(response.data)))
      .catch((err) => console.log(err));
  };
};

export const getAsyncThemes = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/CheatSheetThemes")
      .then((response) => dispatch(getThemes(response.data)))
      .catch((error) => console.log(error));
  };
};
