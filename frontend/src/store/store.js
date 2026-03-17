import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import studentReducer from "./slice/studentSlice";
import bookReducer from "./slice/bookSlice";
import reviewReducer from "./slice/reviewSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    books: bookReducer,
    reviews: reviewReducer,
  },
});

