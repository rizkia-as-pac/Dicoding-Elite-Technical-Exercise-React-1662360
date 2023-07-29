import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import threadsReducer from './threads/threadsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
