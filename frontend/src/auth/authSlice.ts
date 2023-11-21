import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

import { User } from "../types/common";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: user ? user : null,
  isError: false,
  errorMessage: "",
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Register the user
export const register = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      let message = (error as Error).message || (error as Error).toString();
      if (axios.isAxiosError(error)) {
        message = error?.response?.data.message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => { 
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;

      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
        state.user = null;
      });
    
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
