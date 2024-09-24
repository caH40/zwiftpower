import {
  accessExpressionDefault,
  accessExpressionDefaultRacingScoreDefault,
} from '../../../../../assets/zwift/accessExpression';

/**
 * Reducer установки параметров строгой категоризации CategoryEnforcement и accessExpression.
 */
export const setCategoryEnforcementReducer = (state, action) => {
  const name = action.payload;

  switch (name) {
    case 'disabled': {
      state.eventMainParams.categoryEnforcement = false;
      state.eventMainParams.accessExpression = null;
      break;
    }
    case 'category': {
      state.eventMainParams.categoryEnforcement = true;
      state.eventMainParams.accessExpression = accessExpressionDefault.value;
      break;
    }
    case 'racingScore': {
      state.eventMainParams.categoryEnforcement = true;
      state.eventMainParams.accessExpression = accessExpressionDefaultRacingScoreDefault.value;
      break;
    }

    default:
    // Остается без изменения
  }
};
