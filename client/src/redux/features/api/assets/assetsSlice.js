import { createSlice } from '@reduxjs/toolkit';

import { fetchAssetsRoute } from './fetchAssets';

const initialState = {
  routes: {},
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
      const { data } = action.payload;

      // Нет данных — НО статус и error должны обновиться!
      if (!data) {
        state.status = 'resolved';
        state.error = null;
        return;
      }

      // Если одиночный объект
      const routes = Array.isArray(data) ? data : [data];

      for (const route of routes) {
        if (route?.id) {
          state.routes[route.id] = route;
        }
      }

      state.status = 'resolved';
      state.error = null;
    });

    builder.addCase(fetchAssetsRoute.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { getRouter } = assetsSlice.actions;

export default assetsSlice.reducer;
