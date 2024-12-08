import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} AlertMessage
 * @property {string} message - Сообщение для отображения.
 * @property {'error' | 'warning' | 'info' | 'success'} type - Тип сообщения.
 * @property {boolean} isOpened - Флаг, показывающий, открыто ли сообщение.
 */

/**
 * @typedef {Object} AlertMessageState
 * @property {AlertMessage} value - Текущее состояние сообщения.
 */

// Начальное состояние
/** @type {AlertMessageState} */
const initialState = {
  value: { message: 'start', type: 'success', isOpened: false },
};

// Создание слайса
const alertMessageSlice = createSlice({
  name: 'alertMessageSlice',
  initialState,
  reducers: {
    /**
     * Устанавливает новое сообщение и его тип.
     * @param {AlertMessageState} state - Текущее состояние слайса.
     * @param {{ payload: AlertMessage }} action - Экшен с данными для обновления.
     */
    getAlert(state, action) {
      state.value = action.payload;
    },
  },
});

// Экспорт действий и редюсера
export const { getAlert } = alertMessageSlice.actions;
export default alertMessageSlice.reducer;
