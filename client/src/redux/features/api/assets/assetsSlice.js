import { createSlice } from '@reduxjs/toolkit';

import { fetchAssetsRoute } from './fetchAssets';

const initialState = {
  routes: new Map(),
  error: null,
  status: null,
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getRouter: (state, action) => {
      return state.routes.get(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAssetsRoute.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAssetsRoute.fulfilled, (state, action) => {
      const route = action.payload.data;

      state.routes.set(route?.id, route);
      state.error = null;
      state.status = 'resolved';
    });
    builder.addCase(fetchAssetsRoute.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { getRouter } = assetsSlice.actions;

export default assetsSlice.reducer;
