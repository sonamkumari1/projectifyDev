import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./features/api/authApi";
import { courseApi } from "./features/api/courseApi";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]:courseApi.reducer,
});

export default rootReducer;
