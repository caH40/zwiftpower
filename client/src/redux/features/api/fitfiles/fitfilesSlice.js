import { createSlice } from '@reduxjs/toolkit';

import { fetchGetFitfiles } from './fetchFitfiles';

const initialState = {
  fitfile: null,
  status: null,
  error: null,
};

const fitfilesSlice = createSlice({
  name: 'fitfile',
  initialState,
  reducers: {
    resetFitfiles(state) {
      state.fitfile = null;
    },
  },

  extraReducers: (builder) => {
    // ============== получение=================
    builder.addCase(fetchGetFitfiles.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetFitfiles.fulfilled, (state, action) => {
      state.fitfile = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetFitfiles.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetFitfiles } = fitfilesSlice.actions;

export default fitfilesSlice.reducer;
