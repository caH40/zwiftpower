import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice для создания Эвента в Zwift
 */

// eventSubgroup_ порядковый номер массива в свойстве  eventSubgroups
const initialState = {
  eventParamsRaw: {},
  eventMainParams: { id: 0 },
  eventSubgroup_1: undefined,
  eventSubgroup_2: undefined,
  eventSubgroup_3: undefined,
  eventSubgroup_4: undefined,
  eventSubgroup_5: undefined,
  checkboxRules: [],
  checkboxTags: [],
  subgroupLabels: [],
  status: null,
  error: null,
};

const zwiftEventParamsCreateSlice = createSlice({
  name: 'eventParamsCreate',
  initialState,
  reducers: {
    // установка правил и сохранение в состояние checkboxRules
    setEventRulesCreating(state, action) {
      state.checkboxRules = state.checkboxRules.map((rule) => {
        if (rule.value === action.payload.property) {
          return { ...rule, checked: action.payload.checked };
        } else {
          return rule;
        }
      });
    },

    // установка тэгов и сохранение в состояние checkboxTags
    setEventTagsCreating(state, action) {
      state.checkboxTags = state.checkboxTags.map((tag) => {
        if (tag.value === action.payload.property) {
          return { ...tag, checked: action.payload.checked };
        } else {
          return tag;
        }
      });
    },

    // установка значения текущего параметра Эвента для всех групп и Эвента
    setSameParameterCreating(state, action) {
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
        if (state['eventSubgroup_' + i]) {
          // при выборе одного из трех параметров laps, distanceInMeters, durationInSeconds
          // два других обнуляются
          if (property === 'laps') {
            state['eventSubgroup_' + i].distanceInMeters = 0;
            state['eventSubgroup_' + i].durationInSeconds = 0;
          } else if (property === 'distanceInMeters') {
            state['eventSubgroup_' + i].laps = 0;
            state['eventSubgroup_' + i].durationInSeconds = 0;
          } else if (property === 'durationInSeconds') {
            state['eventSubgroup_' + i].laps = 0;
            state['eventSubgroup_' + i].distanceInMeters = 0;
          }

          state['eventSubgroup_' + i][propertySubgroup] = valueProperty;
        }
      }
    },

    // сброс всех состояний
    resetParamsCreating(state) {
      state.eventParamsRaw = {};
      state.eventSubgroup_1 = undefined;
      state.eventSubgroup_2 = undefined;
      state.eventSubgroup_3 = undefined;
      state.eventSubgroup_4 = undefined;
      state.eventSubgroup_5 = undefined;
      state.eventMainParams = { id: 0 };
      state.subgroupLabels = [];
      state.checkboxRules = [];
      state.checkboxTags = [];
    },

    // установка нового параметра в настройках Эвента
    setMainParamsCreating(state, action) {
      delete action.payload.index;

      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },
  },
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
  addGroupToEvent,
  removeGroupFromEvent,
} = zwiftEventParamsCreateSlice.actions;

export default zwiftEventParamsCreateSlice.reducer;
