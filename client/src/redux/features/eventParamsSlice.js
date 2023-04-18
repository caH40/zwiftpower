import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventMainParams: { id: 0 },
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

    resetParams(state) {
      state.eventSubgroup_0 = {};
      state.eventSubgroup_1 = {};
      state.eventSubgroup_2 = {};
      state.eventSubgroup_3 = {};
      state.eventSubgroup_4 = {};
      state.eventMainParams = {};
      state.selectedRules = [];
    },
    setMainParams(state, action) {
      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },
    setSubgroupParams(state, action) {
      const property = `eventSubgroup_${action.payload.index}`;
      state[property] = {
        ...state[property],
        ...action.payload.obj,
      };
    },

    setSelectedRules(state, action) {
      state.selectedRules = action.payload;
    },
  },
});

export const {
  setEventParams,
  setMainParams,
  setSubgroupParams,
  setSelectedRules,
  resetParams,
} = eventParamsSlice.actions;

export default eventParamsSlice.reducer;
