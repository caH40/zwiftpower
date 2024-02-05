import resultEditSlice from '../features/api/result_edit/resultEditSlice';
import usersZwiftpowerSlice from '../features/api/user_zwiftpower/usersZwiftpowerSlice';
import zwiftClubSlice from '../features/api/zwift_club/zwiftClubSlice';

/**
 * Редюсеры доступные админам/модераторам
 */
export const adminReducers = {
  resultEdit: resultEditSlice,
  getUsers: usersZwiftpowerSlice,
  zwiftClub: zwiftClubSlice,
};
