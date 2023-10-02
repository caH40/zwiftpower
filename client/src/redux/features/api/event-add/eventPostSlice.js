import { createSlice } from '@reduxjs/toolkit';

import { fetchEventPost } from './fetchEventPost';

const initialState = {
  series: [],
  status: null,
  error: null,
};

const eventPostSlice = createSlice({
  name: 'eventPost',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchEventPost.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchEventPost.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchEventPost.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default eventPostSlice.reducer;
