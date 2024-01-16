import { rules } from '../../../../../assets/zwift/rule';
import { tags } from '../../../../../assets/zwift/tags';

import { patternCatchUp } from './pattern-catchup';
import { patternNewbies } from './pattern-newbies';
import { patternSeries } from './pattern-series';

export const setPatternReducer = (state, action) => {
  // название паттерна
  const pattern = action.payload;
  let eventPrepared = {};

  // выбор соответствующего паттерна настроек Эвента в зависимости от выбранного названия паттерна
  switch (pattern) {
    case 'catchUp':
      eventPrepared = patternCatchUp(state.eventParamsRaw);
      break;
    case 'series':
      eventPrepared = patternSeries(state.eventParamsRaw);
      break;
    case 'newbies':
      eventPrepared = patternNewbies(state.eventParamsRaw);
      break;
    case 'Сброс настроек':
      eventPrepared = state.eventParamsRaw;
      break;
    default:
      throw Error(`Нет "пакета настроек" для "${pattern}"`);
  }

  [
    state.eventSubgroup_1,
    state.eventSubgroup_2,
    state.eventSubgroup_3,
    state.eventSubgroup_4,
    state.eventSubgroup_5,
  ] = eventPrepared.eventSubgroups;

  state.eventMainParams = eventPrepared;

  state.checkboxRules = rules.map((rule) => {
    return { ...rule, checked: eventPrepared.rulesSet.includes(rule.value) };
  });

  state.checkboxTags = tags.map((tag) => {
    return { ...tag, checked: eventPrepared.tags.includes(tag.value) };
  });
};
