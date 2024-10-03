import { accessExpressions } from '../../../../../assets/zwift/accessExpression';

/**
 * Reducer установки параметров строгой категоризации CategoryEnforcement и accessExpression.
 */
export const setCategoryEnforcementReducer = (state, action) => {
  const name = action.payload;

  const eventSubgroups = [
    state.eventSubgroup_1,
    state.eventSubgroup_2,
    state.eventSubgroup_3,
    state.eventSubgroup_4,
    state.eventSubgroup_5,
  ];

  const accessExpression = accessExpressions.find((elm) => elm.name === name);
  const isDisabled = name === 'disabled';

  // Удаления value строки, так как она уже есть в сущности ZwiftEvent в которую вносятся данные изменения.
  const { paceValues, value, id, ...accessExpressionObj } = accessExpression;

  state.eventMainParams.categoryEnforcement = !isDisabled ? true : false;
  state.eventMainParams.accessExpression = !isDisabled ? value : null;
  state.eventMainParams.accessExpressionObj = accessExpressionObj;
  setPaceValues(eventSubgroups, paceValues);
};

/**
 * Установка отображаемых диапазонов FTP райдера в описании заезда для каждой группы.
 */
function setPaceValues(eventSubgroups, paceValuesCurrent) {
  if (!paceValuesCurrent) {
    return;
  }
  for (const subgroup of eventSubgroups) {
    if (!subgroup) {
      continue;
    }

    const paceValues = paceValuesCurrent[subgroup.label] ?? {
      from: 1,
      to: 6,
    };
    subgroup.fromPaceValue = paceValues.from;
    subgroup.toPaceValue = paceValues.to;
  }
}
