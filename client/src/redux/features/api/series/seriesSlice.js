import { createSlice } from '@reduxjs/toolkit';

import { fetchPostSeriesOrganizer } from './fetchSeries';

const initialState = {
  message: null,
  status: null,
  error: null,
};

/**
 * Слайс для работы Организатора с Сериями.
 */
const seriesOrganizerSlice = createSlice({
  name: 'seriesOrganizer',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // ============== получение данных о добавленных клубах у Организатора =================
    builder.addCase(fetchPostSeriesOrganizer.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostSeriesOrganizer.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostSeriesOrganizer.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== получение данных о клубах =================
  },
});

export default seriesOrganizerSlice.reducer;
