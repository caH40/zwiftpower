import { createSlice } from '@reduxjs/toolkit';

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
    // первоначальная установка (инициализация) сущностей после загрузки данных эвента с сервера Звифта
    setEventParams(state, action) {
      [
        state.eventSubgroup_0,
        state.eventSubgroup_1,
        state.eventSubgroup_2,
        state.eventSubgroup_3,
        state.eventSubgroup_4,
      ] = action.payload.eventSubgroups;

      state.eventMainParams = action.payload;

      // state.selectedRules = action.payload.rulesSet.map((rule) => ({
      //   value: rule,
      //   label: rule,
      // }));
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

    // установка значения текущего параметра Эвента для всех групп
    setSameParameter(state, action) {
      const { subgroupIndex, property } = action.payload;
      const isEventMainParameter = subgroupIndex === 'eventMainParameter';

      const valueProperty = isEventMainParameter
        ? state.eventMainParams[property]
        : state[`eventSubgroup_${subgroupIndex}`][property];

      // у подгрупп и Эвента разные названия свойства старта Эвента
      const propertySubgroup = property === 'eventStart' ? 'eventSubgroupStart' : property;
      const propertyEventMain = property === 'eventSubgroupStart' ? 'eventStart' : property;

      state.eventMainParams[propertyEventMain] = valueProperty;
      for (let i = 0; i < 5; i++) {
        // если подгруппа существует, то меняем нужное значение (property) в данной подгруппе
        if (state['eventSubgroup_' + i])
          state['eventSubgroup_' + i][propertySubgroup] = valueProperty;
      }
    },

    resetParams(state) {
      state.eventSubgroup_0 = {};
      state.eventSubgroup_1 = {};
      state.eventSubgroup_2 = {};
      state.eventSubgroup_3 = {};
      state.eventSubgroup_4 = {};
      state.eventMainParams = { id: 0 };
      state.checkboxRules = [];
      // state.selectedRules = [];
    },

    setMainParams(state, action) {
      delete action.payload.index;

      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },

    setSubgroupParams(state, action) {
      const property = `eventSubgroup_${action.payload.index}`;
      delete action.payload.index;

      state[property] = {
        ...state[property],
        ...action.payload,
      };
    },

    // setSelectedRules(state, action) {
    //   state.selectedRules = action.payload;
    // },
  },
});

export const {
  setEventParams,
  setMainParams,
  setSubgroupParams,
  // setSelectedRules,
  resetParams,
  setEventRules,
  setSameParameter,
} = eventParamsSlice.actions;

export default eventParamsSlice.reducer;
