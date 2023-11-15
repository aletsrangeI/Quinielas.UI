import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'unauthenticated', // 'checking' | 'authenticated' | 'unauthenticated'
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    errorMessage: null,
    token: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.id = payload.userId;
      state.username = payload.userName;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.errorMessage = null;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.status = null
      state.id = null
      state.username = null
      state.firstName = null
      state.lastName = null
      state.errorMessage =null
      state.token = null
    },
    checkingCredentials: (state, payload) => {
      state.status = 'checking';
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
