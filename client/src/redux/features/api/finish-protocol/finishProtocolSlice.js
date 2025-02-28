import { createSlice } from '@reduxjs/toolkit';

import { fetchFinishProtocol } from './fetchFinishProtocol';

const initialState = {
  protocol: null,
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
    resetFinishProtocol: (state) => {
      state.protocol = null;
    },
  },

  extraReducers: (builder) => {
    // ============== Создание названия конфигурации финишного протокола. =================
    builder.addCase(fetchFinishProtocol.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchFinishProtocol.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchFinishProtocol.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetFinishProtocol } = finishProtocolSlice.actions;

export default finishProtocolSlice.reducer;
