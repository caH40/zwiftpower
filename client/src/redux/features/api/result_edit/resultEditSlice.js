import { createSlice } from '@reduxjs/toolkit';

import { fetchResultEdit } from './fetchResultEdit';

const initialState = {
  error: null,
  state: null,
};

const resultEditSlice = createSlice({
  name: 'resultEdit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResultEdit.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchResultEdit.fulfilled, (state) => {
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchResultEdit.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    });
  },
});

export default resultEditSlice.reducer;
