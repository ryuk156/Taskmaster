// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import authReducer from "./authSlice";

// import other reducers

const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
});

export default rootReducer;
