import { createSlice } from '@reduxjs/toolkit';
import { register, login, refreshUser, logout } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const handleRejected = state => {
  state.isRefreshing = false;
};
const handlePending = state => {
  state.isRefreshing = true;
};
const handelFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};
const handelFulfilledLogout = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};
const handelFulfilledRefresh = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, handelFulfilled)
      .addCase(register.fulfilled, handelFulfilled)
      .addCase(logout.fulfilled, handelFulfilledLogout)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, handelFulfilledRefresh)
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
