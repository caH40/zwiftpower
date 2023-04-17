import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventMainParams: {},
  eventSubgroup_0: {},
  eventSubgroup_1: {},
  eventSubgroup_2: {},
  eventSubgroup_3: {},
  eventSubgroup_4: {},
  selectedRules: [],
};

const eventParamsSlice = createSlice({
  name: 'eventParams',
  // eventSubgroup_ порядковый номер массива в свойстве  eventSubgroups
  initialState,
  reducers: {
    setEventParams(state, action) {
      [
        state.eventSubgroup_0,
        state.eventSubgroup_1,
        state.eventSubgroup_2,
        state.eventSubgroup_3,
        state.eventSubgroup_4,
      ] = action.payload.eventSubgroups;

      state.eventMainParams = action.payload;

      state.selectedRules = action.payload.rulesSet.map((rule) => ({
        value: rule,
        label: rule,
      }));
    },
    setSameParams() {},
    setMainParams(state, action) {
      // console.log(action.payload);
      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },
    setSelectedRules(state, action) {
      state.selectedRules = action.payload;
    },
  },
});

export const { setEventParams, setMainParams, setSelectedRules } = eventParamsSlice.actions;

export default eventParamsSlice.reducer;
