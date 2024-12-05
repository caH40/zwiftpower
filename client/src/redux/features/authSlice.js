import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'checkAuth',
  initialState: {
    value: {
      status: false,
      user: {
        isModeratorClub: false,
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
      const { status, user } = action.payload;
      // Если есть клуб(ы) в модерации пользователя, то isModeratorClub:true
      const isModeratorClub = !!user?.moderator?.clubs?.length;
      state.value = { status, user: { ...user, isModeratorClub } };
    },
  },
});

export const { getAuth } = authSlice.actions;

export default authSlice.reducer;
