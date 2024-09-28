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

  state.eventMainParams.categoryEnforcement = !isDisabled ? true : false;
  state.eventMainParams.accessExpression = !isDisabled ? accessExpression.value : null;
  state.eventMainParams.categoryEnforcementName = accessExpression.name;
  setPaceValues(eventSubgroups, accessExpression.paceValues);

  // switch (name) {
  //   case 'disabled': {
  //     state.eventMainParams.categoryEnforcement = false;
  //     state.eventMainParams.accessExpression = null;
  //     state.eventMainParams.categoryEnforcementName = 'disabled';
  //     break;
  //   }
  //   case 'category': {
  //     state.eventMainParams.categoryEnforcement = true;
  //     state.eventMainParams.accessExpression = accessExpression.default.value;
  //     state.eventMainParams.categoryEnforcementDescription =
  //       accessExpression.default.description;
  //     break;
  //   }
  //   case 'racingScore': {
  //     state.eventMainParams.categoryEnforcement = true;
  //     state.eventMainParams.accessExpression = accessExpression.racingScoreDefault.value;
  //     state.eventMainParams.categoryEnforcementDescription =
  //       accessExpression.racingScoreDefault.description;
  //     break;
  //   }
  //   case 'catchUpNew': {
  //     const accessExpressionCatchUpNew = accessExpressions.find(
  //       (elm) => elm.name === 'catchUpNew'
  //     );
  //     state.eventMainParams.categoryEnforcement = true;
  //     state.eventMainParams.accessExpression = accessExpressionCatchUpNew.value;
  //     state.eventMainParams.categoryEnforcementDescription = accessExpressionCatchUpNew.name;
  //     setPaceValues(eventSubgroups, accessExpressionCatchUpNew.paceValues);

  //     break;
  //   }

  //   default:
  //   // Остается без изменения
  // }
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
