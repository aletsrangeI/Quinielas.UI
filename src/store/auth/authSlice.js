import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' | 'authenticated' | 'unauthenticated'
    id: null,
    email: null,
    nombres: null,
    photoURL: null,
    errorMessage: null,
    token: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.id = payload.id;
      state.email = payload.email;
      state.nombres = `${payload.firstName} ${payload.lastName}`;
      state.photoURL = null;
      state.errorMessage = null;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.status = 'unauthenticated';
      state.errorMessage = payload?.errorMessage;
      state.id = null;
      state.email = null;
      state.nombres = null;
      state.photoURL = null;
      state.token = null;
    },
    checkingCredentials: (state, payload) => {
      state.status = 'checking';
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
