import axios from "axios";
import { GET_QUOTES, ADD_QUOTES } from "./actionTypes";

export const getQuotes = (data) => {
  return {
    type: GET_QUOTES,
    payload: data,
  };
};

export const addQuotes = (data) => {
  return {
    type: ADD_QUOTES,
    payload: data,
  };
};

export const addAsyncQuotes = (params) => {
  return (dispatch) => {
    axios
      .post("https://redevcrm.herokuapp.com/quotes", params)
      .then((respons) => dispatch(addQuotes(respons.data)))
      .catch((err) => console.log(err));
  };
};

export const getAsyncQuotes = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/quotes")
      .then((response) => {
        const quotes = response.data;
        dispatch(getQuotes(quotes));
      })
      .catch((error) => console.log(error));
  };
};
