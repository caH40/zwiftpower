import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      externalAccounts: {
        vk: {
          id: null,
          firstName: null,
          lastName: null,
          avatarSrc: null,
          gender: null,
          birthday: null,
          email: null,
        },
      },
    },
  },
};

const authSlice = createSlice({
  name: 'checkAuth',
  initialState,
  reducers: {
    getAuth(state, action) {
      const { status, user } = action.payload;
      // Если есть клуб(ы) в модерации пользователя, то isModeratorClub:true
      const isModeratorClub = !!user?.moderator?.clubs?.length;
      state.value = { status, user: { ...user, isModeratorClub } };
    },
    resetAuth(state) {
      state.value = initialState.value;
    },
  },
});

export const { getAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
