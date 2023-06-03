import { createSlice } from '@reduxjs/toolkit';

import { DtoSubgroup } from '../../dto/subgroup';
import { rules } from '../../asset/zwift/rule';

const initialState = {
  eventMainParams: { id: 0 },
  eventSubgroup_0: {},
  eventSubgroup_1: {},
  eventSubgroup_2: {},
  eventSubgroup_3: {},
  eventSubgroup_4: {},
  selectedRules: [],
  checkboxRules: [],
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
      state.checkboxRules = rules.map((rule) => {
        return { ...rule, checked: action.payload.rulesSet.includes(rule.value) };
      });
    },
    setEventRules(state, action) {
      state.checkboxRules = state.checkboxRules.map((rule) => {
        if (rule.value === action.payload.property) {
          return { ...rule, checked: action.payload.checked };
        } else {
          return rule;
        }
      });
    },
    setEventParameter(state, action) {
      state[action.payload.target] = action.payload.parameter;
    },

    setSameParams(state, action) {
      state.eventMainParams.eventStart = action.payload.eventSubgroupStart;
      state.eventSubgroup_0 = state.eventSubgroup_0
        ? { ...state.eventSubgroup_0, ...new DtoSubgroup(action.payload) }
        : undefined;
      state.eventSubgroup_1 = state.eventSubgroup_1
        ? { ...state.eventSubgroup_1, ...new DtoSubgroup(action.payload) }
        : undefined;
      state.eventSubgroup_2 = state.eventSubgroup_2
        ? { ...state.eventSubgroup_2, ...new DtoSubgroup(action.payload) }
        : undefined;
      state.eventSubgroup_3 = state.eventSubgroup_3
        ? { ...state.eventSubgroup_3, ...new DtoSubgroup(action.payload) }
        : undefined;
      state.eventSubgroup_4 = state.eventSubgroup_4
        ? { ...state.eventSubgroup_4, ...new DtoSubgroup(action.payload) }
        : undefined;
    },

    resetParams(state) {
      state.eventSubgroup_0 = {};
      state.eventSubgroup_1 = {};
      state.eventSubgroup_2 = {};
      state.eventSubgroup_3 = {};
      state.eventSubgroup_4 = {};
      state.eventMainParams = { id: 0 };
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
  setSameParams,
  resetParams,
  setEventParameter,
  setEventRules,
} = eventParamsSlice.actions;

export default eventParamsSlice.reducer;
