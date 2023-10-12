import { createSlice } from '@reduxjs/toolkit';

import { fetchUserDeleteZwiftId } from './fetchUser';

const initialState = {
  status: null,
  error: null,
};

const userSettingDeleteZwiftIdSlice = createSlice({
  name: 'eventPost',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserDeleteZwiftId.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchUserDeleteZwiftId.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchUserDeleteZwiftId.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default userSettingDeleteZwiftIdSlice.reducer;
