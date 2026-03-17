import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/books/";

// Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Token ${token}` } };

    try {
      const res = await axios.get(API_URL, config);

      // 🔥 Fix image URL here
      const booksWithFullUrl = res.data.map((book) => ({
        ...book,
        photo: book.photo
          ? book.photo.startsWith("http")
            ? book.photo
            : `http://127.0.0.1:8000${book.photo}`
          : null,
      }));

      return booksWithFullUrl;
    } catch (err) {
      console.log("ERROR:", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const buyBook = createAsyncThunk(
  "books/buyBook",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}${id}/buy/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      return id;
    } catch (err) {
      console.log("ERROR:", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Add book
export const addBook = createAsyncThunk("books/addBook", async (bookData, thunkAPI) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Token ${token}` } };
  try {
    const res = await axios.post(API_URL, bookData, config);
    return res.data;
  } catch (err) {
    console.log("ERROR:", err.response.data);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// Update book
export const updateBook = createAsyncThunk("books/updateBook", async ({ id, bookData }, thunkAPI) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Token ${token}` } };
  try {
    const res = await axios.put(`${API_URL}${id}/`, bookData, config);
    return res.data;
  } catch (err) {
    console.log("ERROR:", err.response.data);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// Delete book
export const deleteBook = createAsyncThunk("books/deleteBook", async (id, thunkAPI) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Token ${token}` } };
  try {
    await axios.delete(`${API_URL}${id}/`, config);
    return id;
  } catch (err) {
    console.log("ERROR:", err.response.data);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.loading = true; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.books = state.books.map(b => b.id === action.payload.id ? action.payload : b);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(b => b.id !== action.payload);
      })
      .addCase(buyBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) =>
        book.id === action.payload
        ? { ...book, is_sold: true }
        : book
      );
    })
  },
});

export default bookSlice.reducer;