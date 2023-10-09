import { createSlice } from '@reduxjs/toolkit';

import { fetchZwiftId } from './fetchZwiftId';

const initialState = {
  zwiftId: 0,
  profile: {},
  status: null,
  error: null,
};

const zwiftIdSlice = createSlice({
  name: 'eventPost',
  initialState,
  reducers: {
    setZwiftId: (state, action) => {
      state.zwiftId = action.payload;
    },
    resetZwiftId: (state) => {
      state.zwiftId = 0;
    },
    resetProfileZwift: (state) => {
      state.profile = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchZwiftId.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchZwiftId.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      state.profile = action.payload;
      state.zwiftId = 0;
    });

    builder.addCase(fetchZwiftId.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setZwiftId, resetZwiftId, resetProfileZwift } = zwiftIdSlice.actions;

export default zwiftIdSlice.reducer;
