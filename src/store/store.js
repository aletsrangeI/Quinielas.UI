import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { QuinielaAuth } from './apis/QuinielaAuth';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [QuinielaAuth.reducerPath]: QuinielaAuth.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(QuinielaAuth.middleware);
  },
});
