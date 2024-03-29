import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'checkAuth',
  initialState: {
    value: {
      status: false,
      user: {
        email: '',
        id: '',
        zwiftId: '',
        role: '',
        moderator: { clubs: [] },
        username: '',
        photoProfile: '',
      },
    },
  },
  reducers: {
    getAuth(state, action) {
      state.value = action.payload;
    },
  },
});

export const { getAuth } = authSlice.actions;

export default authSlice.reducer;
