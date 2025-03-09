import { rules } from '../../../../assets/zwift/rule';
import { tags } from '../../../../assets/zwift/tags';

import {
  fetchZwiftEventParams,
  fetchZwiftEventParamsForModerator,
} from './fetchZwiftEventParams';

/**
 * Общая функция для обработки успешного ответа.
 */
function handleEventParamsFulfilled(state, action) {
  {
    state.error = null;
    state.status = 'resolved';

    state.eventParamsRaw = action.payload;
    const { eventSubgroups } = action.payload;

    state.eventSubgroup_1 = eventSubgroups.find((elm) => elm.label === 1);
    state.eventSubgroup_2 = eventSubgroups.find((elm) => elm.label === 2);
    state.eventSubgroup_3 = eventSubgroups.find((elm) => elm.label === 3);
    state.eventSubgroup_4 = eventSubgroups.find((elm) => elm.label === 4);
    state.eventSubgroup_5 = eventSubgroups.find((elm) => elm.label === 5);

    // получение всех названий групп в Эвенте
    state.subgroupLabels = action.payload.eventSubgroups.map(
      (subgroup) => subgroup.subgroupLabel
    );

    state.eventMainParams = action.payload;

    // массив tags в настройках Эвента
    const tagsInEven = action.payload.tags;
    // массив tags в настройках "нулевой" подгруппы
    // наличие tag проверяется в любой группе, так как tag должны быть одинаковы у всех групп
    const tagsInEventSubgroup = action.payload.eventSubgroups[0].tags;

    state.checkboxTags = tags.map((tag) => {
      return {
        ...tag,
        checked: tagsInEven.includes(tag.value) || tagsInEventSubgroup.includes(tag.value),
      };
    });
  }
}

export const builderZwiftEventParams = (builder) => {
  builder.addCase(fetchZwiftEventParams.pending, (state) => {
    state.error = null;
    state.status = 'loading';
  });

  builder.addCase(fetchZwiftEventParams.fulfilled, handleEventParamsFulfilled);

  builder.addCase(fetchZwiftEventParams.rejected, (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
  });

  // ========================= Обработка fetchZwiftEventParamsForModerator ==========================
  builder.addCase(fetchZwiftEventParamsForModerator.pending, (state) => {
    state.error = null;
    state.status = 'loading';
  });

  builder.addCase(fetchZwiftEventParamsForModerator.fulfilled, handleEventParamsFulfilled);

  builder.addCase(fetchZwiftEventParamsForModerator.rejected, (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
  });
};
