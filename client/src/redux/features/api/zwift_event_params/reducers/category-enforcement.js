import { accessExpression } from '../../../../../assets/zwift/accessExpression';

/**
 * Reducer установки параметров строгой категоризации CategoryEnforcement и accessExpression.
 */
export const setCategoryEnforcementReducer = (state, action) => {
  const name = action.payload;

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

    default:
    // Остается без изменения
  }
};
