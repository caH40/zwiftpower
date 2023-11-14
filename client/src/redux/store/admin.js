import resultEditSlice from '../features/api/result_edit/resultEditSlice';
import usersZwiftpowerSlice from '../features/api/user_zwiftpower/usersZwiftpowerSlice';

/**
 * Редюсеры доступные админам/модераторам
 */
export const adminReducers = {
  resultEdit: resultEditSlice,
  getUsers: usersZwiftpowerSlice,
};
