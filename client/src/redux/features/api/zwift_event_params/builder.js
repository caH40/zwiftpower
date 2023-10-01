import { rules } from '../../../../assets/zwift/rule';
import { tags } from '../../../../assets/zwift/tags';

import { fetchZwiftEventParams } from './fetchZwiftEventParams';

export const builderZwiftEventParams = (builder) => {
  builder.addCase(fetchZwiftEventParams.pending, (state) => {
    state.error = null;
    state.status = 'loading';
  });

  builder.addCase(fetchZwiftEventParams.fulfilled, (state, action) => {
    state.error = null;
    state.status = 'resolved';

    state.eventParamsRaw = action.payload;
    [
      state.eventSubgroup_0,
      state.eventSubgroup_1,
      state.eventSubgroup_2,
      state.eventSubgroup_3,
      state.eventSubgroup_4,
    ] = action.payload.eventSubgroups;

    state.eventMainParams = action.payload;

    state.checkboxRules = rules.map((rule) => {
      return { ...rule, checked: action.payload.rulesSet.includes(rule.value) };
    });

    state.checkboxTags = tags.map((tag) => {
      return { ...tag, checked: action.payload.tags.includes(tag.value) };
    });
  });

  builder.addCase(fetchZwiftEventParams.rejected, (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
  });
};
