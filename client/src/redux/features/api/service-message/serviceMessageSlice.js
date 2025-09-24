import { createSlice } from '@reduxjs/toolkit';

import { fetchServiceMessages } from './fetchServiceMessage';

const initialState = {
  serviceMessages: [],
  team: null,
  message: null,
  status: null,
  error: null,
};

/**
 * Редукторы для работы с сущностью Сервисные сообщения.
 */
const serviceMessageSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetServiceMessages: (state) => {
      state.serviceMessages = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение всех сервисных сообщений для пользователя =================
    builder.addCase(fetchServiceMessages.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchServiceMessages.fulfilled, (state, action) => {
      state.serviceMessages = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchServiceMessages.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetServiceMessages } = serviceMessageSlice.actions;

export default serviceMessageSlice.reducer;
