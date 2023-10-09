import { createSlice } from '@reduxjs/toolkit';

import { fetchUserPut } from './fetchUser';

const initialState = {
  status: null,
  error: null,
};

const userSettingSlice = createSlice({
  name: 'eventPost',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserPut.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUserPut.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUserPut.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

// export const { } = userSettingSlice.actions;

export default userSettingSlice.reducer;
