import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetAllFinishProtocol,
  fetchPostFinishProtocol,
  fetchPutFinishProtocol,
} from './fetchFinishProtocol';

const initialState = {
  protocols: [],
  message: null,
  status: null,
  error: null,
};

/**
 * Слайс для работы конфигами для финишных протоколов.
 */
const finishProtocolSlice = createSlice({
  name: 'finishProtocol',
  initialState,
  reducers: {
    resetFinishProtocols: (state) => {
      state.protocol = [];
    },
  },

  extraReducers: (builder) => {
    // ============== Получение данных конфигураций финишных протоколов. =================
    builder.addCase(fetchGetAllFinishProtocol.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchGetAllFinishProtocol.fulfilled, (state, action) => {
      state.protocols = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchGetAllFinishProtocol.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== Создание названия конфигурации финишного протокола. =================
    builder.addCase(fetchPostFinishProtocol.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPostFinishProtocol.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPostFinishProtocol.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });

    // ============== Обновление данных конфигурации финишного протокола. =================
    builder.addCase(fetchPutFinishProtocol.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchPutFinishProtocol.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchPutFinishProtocol.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetFinishProtocol } = finishProtocolSlice.actions;

export default finishProtocolSlice.reducer;
