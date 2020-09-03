import axios from "axios";
import { GET_SECTIONS, ADD_SECTIONS } from "./actionTypes";

export const getSections = (data) => {
  return {
    type: GET_SECTIONS,
    payload: data,
  };
};

export const addSections = (data) => {
  return {
    type: ADD_SECTIONS,
    payload: data,
  };
};

export const addAsyncSections = (params) => {
  return (dispatch) => {
    axios
      .post("https://redevcrm.herokuapp.com/CheatSheetSections", params)
      .then((response) => dispatch(addSections(response.data)))
      .catch((err) => console.log(err));
  };
};

export const getAsyncSections = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/CheatSheetSections")
      .then((response) => {
        const sections = response.data;
        dispatch(getSections(sections));
      })
      .catch((error) => console.log(error));
  };
};
