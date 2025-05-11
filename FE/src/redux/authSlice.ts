import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = '';
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
