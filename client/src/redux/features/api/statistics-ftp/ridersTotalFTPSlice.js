import { createSlice } from '@reduxjs/toolkit';

import { fetchRidersTotalFTP } from './fetchRidersTotalFTP';

const initialState = {
  ridersTotal: [],
  status: null,
  error: null,
};

const ridersTotalFTPSlice = createSlice({
  name: 'ridersTotalFTP',
  initialState,
  reducers: {
    resetRidersTotalFTP(state) {
      state.ridersTotal = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRidersTotalFTP.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchRidersTotalFTP.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      state.ridersTotal = action.payload;
    });

    builder.addCase(fetchRidersTotalFTP.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetRidersTotalFTP } = ridersTotalFTPSlice.actions;
export default ridersTotalFTPSlice.reducer;
