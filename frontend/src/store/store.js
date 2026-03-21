import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import studentReducer from "./slice/studentSlice";
import bookReducer from "./slice/bookSlice";
import reviewReducer from "./slice/reviewSlice";
import messageReducer from "./slice/messageSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    books: bookReducer,
    reviews: reviewReducer,
    messages: messageReducer,
  },
});

