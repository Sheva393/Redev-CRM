import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import leedsReducer from "./leedsReducer";
import tasksReducer from "./tasksReducer";
import quotesReducer from "./quotesReducer";
import themesReducer from "./themesReducer";
import sectionsReducer from "./sectionsReducer";

export default combineReducers({
  users: usersReducer,
  leeds: leedsReducer,
  tasks: tasksReducer,
  quotes: quotesReducer,
  themes: themesReducer,
  sections: sectionsReducer,
});
