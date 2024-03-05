import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
