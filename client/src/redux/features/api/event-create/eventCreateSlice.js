import { createSlice } from '@reduxjs/toolkit';

import { fetchEventCreatePost } from './fetchEventCreatePost';

const initialState = {
  needNavigate: false,
  eventId: 0,
  status: null,
  error: null,
};

const eventCreateSlice = createSlice({
  name: 'eventPostCreate',
  initialState,
  reducers: {
    setEventId(state, action) {
      state.eventId = action.payload;
    },
    resetEventIdCreated(state) {
      state.eventId = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchEventCreatePost.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchEventCreatePost.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';
      // id созданного Эвента в Звифте
      state.eventId = action.payload.eventId;
    });

    builder.addCase(fetchEventCreatePost.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setEventId, resetEventIdCreated } = eventCreateSlice.actions;

export default eventCreateSlice.reducer;
