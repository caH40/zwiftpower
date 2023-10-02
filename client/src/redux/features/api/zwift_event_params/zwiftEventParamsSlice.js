import { createSlice } from '@reduxjs/toolkit';

import { builderZwiftEventParams } from './builder';
import { setPatternReducer } from './reducers/pattern';

// eventSubgroup_ порядковый номер массива в свойстве  eventSubgroups
const initialState = {
  eventParamsRaw: {},
  eventMainParams: { id: 0 },
  eventSubgroup_0: {},
  eventSubgroup_1: {},
  eventSubgroup_2: {},
  eventSubgroup_3: {},
  eventSubgroup_4: {},
  checkboxRules: [],
  checkboxTags: [],
};

const zwiftEventParamsSlice = createSlice({
  name: 'eventParams',
  initialState,
  reducers: {
    // установка правил и сохранение в состояние checkboxRules
    setEventRules(state, action) {
      state.checkboxRules = state.checkboxRules.map((rule) => {
        if (rule.value === action.payload.property) {
          return { ...rule, checked: action.payload.checked };
        } else {
          return rule;
        }
      });
    },

    // установка тэгов и сохранение в состояние checkboxTags
    setEventTags(state, action) {
      state.checkboxTags = state.checkboxTags.map((tag) => {
        if (tag.value === action.payload.property) {
          return { ...tag, checked: action.payload.checked };
        } else {
          return tag;
        }
      });
    },

    // установка значения текущего параметра Эвента для всех групп и Эвента
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

    // сброс всех состояний
    resetParams(state) {
      state.eventParamsRaw = {};
      state.eventSubgroup_0 = {};
      state.eventSubgroup_1 = {};
      state.eventSubgroup_2 = {};
      state.eventSubgroup_3 = {};
      state.eventSubgroup_4 = {};
      state.eventMainParams = { id: 0 };
      state.checkboxRules = [];
      state.checkboxTags = [];
    },

    // установка нового параметра в настройках Эвента
    setMainParams(state, action) {
      delete action.payload.index;

      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },

    // установка нового параметра в настройках подгруппы
    setSubgroupParams(state, action) {
      const property = `eventSubgroup_${action.payload.index}`;
      delete action.payload.index;

      state[property] = {
        ...state[property],
        ...action.payload,
      };
    },

    // установка параметров Эвента согласно выбранному паттерну (набору правил)
    setPattern(state, action) {
      setPatternReducer(state, action);
    },
  },
  extraReducers: (builder) => builderZwiftEventParams(builder),
});

export const {
  setEventParams,
  setMainParams,
  setSubgroupParams,
  resetParams,
  setEventRules,
  setEventTags,
  setSameParameter,
  setPattern,
} = zwiftEventParamsSlice.actions;

export default zwiftEventParamsSlice.reducer;
