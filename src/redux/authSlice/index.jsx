import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.token = '';
      state.isAuthenticated = false;
    },
  },
});

export const { authenticateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
