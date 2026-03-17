// src/store/slice/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/reviews/";

// Fetch all reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Token ${token}` },
      });
      return res.data;
    } catch (err) {
        console.log(err.response.data)
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ bookId, rating, comment }, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/reviews/",
        {
          book: bookId, // <-- Must be "book", not bookId
          rating,
          comment
        },
        {
          headers: { Authorization: `Token ${token}` }
        }
      );
      return res.data;
    } catch (err) {
      console.error("Review POST error:", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewSlice.reducer;