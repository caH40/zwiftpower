import { rules } from '../../../../../assets/zwift/rule';
import { tags } from '../../../../../assets/zwift/tags';

import { patternCatchUp } from './pattern-catchup';
import { patternNewbies } from './pattern-newbies';
import { patternSeries } from './pattern-series';

/**
 * Reducer установки параметров для Эвента согласно выбранному "Пакету настроек" (pattern)
 */
export const setPatternReducer = (state, action) => {
  // название паттерна
  const pattern = action.payload;
  if (pattern === '') {
    return;
  }
  let eventPrepared = {};

  const { eventSubgroups: eventSubgroupsRaw, ...eventParamsRaw } = { ...state.eventParamsRaw };

  const eventSubgroups = [
    { ...state.eventSubgroup_1 },
    { ...state.eventSubgroup_2 },
    { ...state.eventSubgroup_3 },
    { ...state.eventSubgroup_4 },
    { ...state.eventSubgroup_5 },
  ].filter((elm) => elm?.label);

  // выбор соответствующего паттерна настроек Эвента в зависимости от выбранного названия паттерна
  switch (pattern) {
    case 'catchUp':
      eventPrepared = patternCatchUp(eventParamsRaw, eventSubgroups, state.subgroupLabels);
      break;
    case 'series':
      eventPrepared = patternSeries(eventParamsRaw, eventSubgroups, state.subgroupLabels);
      break;
    case 'newbies':
      eventPrepared = patternNewbies(eventParamsRaw, eventSubgroups, state.subgroupLabels);
      break;
    // case 'Сброс настроек':
    //   eventPrepared = state.eventParamsRaw;
    //   break;
    default:
      throw Error(`Нет "пакета настроек" для "${pattern}"`);
  }

  // присваивание нового значения для соответствующих групп
  eventPrepared.eventSubgroups.forEach((subgroup) => {
    switch (subgroup.label) {
      case 1: {
        state.eventSubgroup_1 = subgroup;
        break;
      }
      case 2: {
        state.eventSubgroup_2 = subgroup;
        break;
      }
      case 3: {
        state.eventSubgroup_3 = subgroup;
        break;
      }
      case 4: {
        state.eventSubgroup_4 = subgroup;
        break;
      }
      case 5: {
        state.eventSubgroup_5 = subgroup;
        break;
      }
    }
  });

  state.eventMainParams = eventPrepared;

  state.checkboxTags = tags.map((tag) => {
    return { ...tag, checked: eventPrepared.tags.includes(tag.value) };
  });
};
