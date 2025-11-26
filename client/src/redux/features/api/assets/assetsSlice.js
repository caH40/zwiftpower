import { createSlice } from '@reduxjs/toolkit';

import { fetchAssetsAllRoutes, fetchAssetsRoutes } from './fetchAssets';

const initialState = {
  routes: {},
  allRoutes: [],
  error: null,
  status: null,
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    resetAllRoutes: (state) => {
      return (state.allRoutes = []);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAssetsRoutes.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAssetsRoutes.fulfilled, (state, action) => {
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

    // ============== получение всех маршрутов=================
    builder.addCase(fetchAssetsAllRoutes.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(fetchAssetsAllRoutes.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAssetsAllRoutes.fulfilled, (state, action) => {
      state.allRoutes = action.payload.data;
      state.status = 'resolved';
      state.error = null;
    });

    builder.addCase(fetchAssetsRoutes.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetAllRoutes } = assetsSlice.actions;

export default assetsSlice.reducer;
