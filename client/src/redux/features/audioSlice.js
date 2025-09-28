import { createSlice } from '@reduxjs/toolkit';

import { lsNotificationVolume } from '../../constants/localstorage';

const dataFromLS = localStorage.getItem(lsNotificationVolume);

const initialState = {
  volume: dataFromLS === null || isNaN(+dataFromLS) ? 0.2 : dataFromLS,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setVolume(state, action) {
      const { volume } = action.payload;

      // Ограничение от 0 до 1;
      state.volume = Math.min(1, Math.max(0, volume));
    },
  },
});

export const { setVolume } = audioSlice.actions;

export default audioSlice.reducer;
