import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Định nghĩa RootState để sử dụng trong toàn bộ ứng dụng
export type RootState = ReturnType<typeof store.getState>;

export default store;