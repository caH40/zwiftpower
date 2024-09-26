import { accessExpression } from '../../../../../assets/zwift/accessExpression';

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

  switch (name) {
    case 'disabled': {
      state.eventMainParams.categoryEnforcement = false;
      state.eventMainParams.accessExpression = null;
      state.eventMainParams.categoryEnforcementDescription = '';
      break;
    }
    case 'category': {
      state.eventMainParams.categoryEnforcement = true;
      state.eventMainParams.accessExpression = accessExpression.default.value;
      state.eventMainParams.categoryEnforcementDescription =
        accessExpression.default.description;
      break;
    }
    case 'racingScore': {
      state.eventMainParams.categoryEnforcement = true;
      state.eventMainParams.accessExpression = accessExpression.racingScoreDefault.value;
      state.eventMainParams.categoryEnforcementDescription =
        accessExpression.racingScoreDefault.description;
      break;
    }
    case 'catchUpNew': {
      state.eventMainParams.categoryEnforcement = true;
      state.eventMainParams.accessExpression = accessExpression.catchUpNew.value;
      state.eventMainParams.categoryEnforcementDescription =
        accessExpression.catchUpNew.description;
      setPaceValues(eventSubgroups, accessExpression.catchUpNew);

      break;
    }

    default:
    // Остается без изменения
  }
};

/**
 * Установка отображаемых диапазонов FTP райдера в описании заезда для каждой группы.
 */
function setPaceValues(eventSubgroups, accessExpressionCurrent) {
  if (!accessExpressionCurrent) {
    return;
  }
  for (const subgroup of eventSubgroups) {
    if (!subgroup) {
      continue;
    }

    const paceValues = accessExpressionCurrent.paceValues[subgroup.label] ?? {
      from: 1,
      to: 6,
    };
    subgroup.fromPaceValue = paceValues.from;
    subgroup.toPaceValue = paceValues.to;
  }
}
