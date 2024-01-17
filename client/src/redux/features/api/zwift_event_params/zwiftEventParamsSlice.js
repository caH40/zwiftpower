import { createSlice } from '@reduxjs/toolkit';

import { labelsSubgroups } from '../../../../assets/subgroups';

import { builderZwiftEventParams } from './builder';
import { setPatternReducer } from './reducers/pattern';

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
    resetParams(state) {
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
    setMainParams(state, action) {
      delete action.payload.index;

      state.eventMainParams = { ...state.eventMainParams, ...action.payload };
    },

    // установка нового параметра в настройках подгруппы
    setSubgroupParams(state, action) {
      const params = action.payload;
      const property = `eventSubgroup_${params.index}`;
      delete params.index;

      // при выборе одного из трех параметров laps, distanceInMeters, durationInSeconds
      // два других обнуляются
      if (params.laps) {
        params.distanceInMeters = 0;
        params.durationInSeconds = 0;
      } else if (params.distanceInMeters) {
        params.laps = 0;
        params.durationInSeconds = 0;
      } else if (params.durationInSeconds) {
        params.laps = 0;
        params.distanceInMeters = 0;
      }

      state[property] = {
        ...state[property],
        ...params,
      };
    },

    // установка параметров Эвента согласно выбранному паттерну (набору правил)
    setPattern(state, action) {
      setPatternReducer(state, action);
    },

    // массив названий групп, которые можно добавить в заезд
    addGroupToEvent(state, action) {
      const label = action.payload;

      // добавление в список название группы (A,B...E)
      state.subgroupLabels.push(label);

      // поиск первой
      const groupParams =
        state.eventSubgroup_1 ||
        state.eventSubgroup_2 ||
        state.eventSubgroup_3 ||
        state.eventSubgroup_4 ||
        state.eventSubgroup_5;
      // номер группы
      const groupNumber = labelsSubgroups.find((elm) => elm.subgroupLabel == label).label;
      // название объекта для группы с соответствующими параметрами
      const groupName = `eventSubgroup_${groupNumber}`;

      state[groupName] = {
        ...groupParams,
        subgroupLabel: label,
        label: groupNumber,
        id: null,
      };
    },

    removeGroupFromEvent(state, action) {
      // номер группы
      const groupNumber = action.payload;

      // название группы
      const { subgroupLabel } = labelsSubgroups.find(
        (subgroup) => subgroup.label == groupNumber
      );

      // возвращение название группы в список групп для добавления
      state.subgroupLabels = state.subgroupLabels.filter((label) => label !== subgroupLabel);

      // название объекта для группы с соответствующими параметрами
      const groupName = `eventSubgroup_${groupNumber}`;
      state[groupName] = undefined;
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
  addGroupToEvent,
  removeGroupFromEvent,
} = zwiftEventParamsSlice.actions;

export default zwiftEventParamsSlice.reducer;
