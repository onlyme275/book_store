// src/features/student/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/students/";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Token ${token}` },
};

// Fetch all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const res = await axios.get(API_URL, config);
    return res.data;
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData) => {
    const res = await axios.post(API_URL, studentData, config);
    return res.data;
  }
);

// Update student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentData }) => {
    const res = await axios.put(`${API_URL}${id}/`, studentData, config);
    return res.data;
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`${API_URL}${id}/`, config);
    return id;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students = state.students.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
