import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import studentReducer from "./slice/studentSlice";
import bookReducer from "./slice/bookSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    books: bookReducer,
  },
});

