import { createSlice } from '@reduxjs/toolkit';

import { fetchActualSeries } from './fetchActualSeries';

const initialState = {
  series: [{ id: 0, value: '', name: '' }],
  status: null,
  error: null,
};

const actualSeriesSlice = createSlice({
  name: 'actualSeries',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchActualSeries.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchActualSeries.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'resolved';

      const seriesArray = action.payload.series;
      const seriesForOptions = seriesArray.map((seriesOne, index) => ({
        id: index,
        value: seriesOne._id,
        name: seriesOne.name,
      }));
      const nullOptions = [{ id: 0, value: null, name: null }];

      state.series = seriesArray.length ? seriesForOptions : nullOptions;
    });

    builder.addCase(fetchActualSeries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default actualSeriesSlice.reducer;
