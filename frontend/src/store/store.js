import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import studentReducer from "./slice/studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
  },
});

