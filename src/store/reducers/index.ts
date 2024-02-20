// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSilce";
import taskReducer from "./taskSlice";
// import other reducers

const rootReducer = combineReducers({
  counter: counterReducer,
  task: taskReducer
});

export default rootReducer;
