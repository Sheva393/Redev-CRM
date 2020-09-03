import axios from "axios";
import { GET_TASKS, ADD_TASKS } from "./actionTypes";

export const getTasks = (data) => {
  return {
    type: GET_TASKS,
    payload: data,
  };
};

export const addTasks = (data) => {
  return {
    type: ADD_TASKS,
    payload: data,
  };
};

export const addAsyncTasks = (e) => {
  return (dispatch) => {
    axios
      .post("https://redevcrm.herokuapp.com/tasks", e)
      .then((result) => dispatch(addTasks(result.data)))
      .catch((error) => console.log(error));
  };
};

export const getAsyncTasks = () => {
  return (dispatch) => {
    axios
      .get("https://redevcrm.herokuapp.com/tasks")
      .then((result) => {
        const tasks = result.data;
        dispatch(getTasks(tasks));
      })
      .catch((error) => console.log(error));
  };
};
