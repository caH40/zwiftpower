import clubModeratorSlice from '../features/api/club_moderator/clubModeratorSlice';
import organizerAdminSlice from '../features/api/organizer_admin/organizerAdminSlice';
import resultEditSlice from '../features/api/result_edit/resultEditSlice';
import usersZwiftpowerSlice from '../features/api/user_zwiftpower/usersZwiftpowerSlice';
import zwiftClubSlice from '../features/api/zwift_club/zwiftClubSlice';
import fitfilesSlice from '../features/api/fitfiles/fitfilesSlice';
import riderBanSlice from '../features/api/rider-ban/riderBanSlice';

/**
 * reducers доступные админам/модераторам
 */
export const adminReducers = {
  resultEdit: resultEditSlice,
  getUsers: usersZwiftpowerSlice,
  zwiftClub: zwiftClubSlice,
  clubModerator: clubModeratorSlice,
  organizerAdmin: organizerAdminSlice,
  fitfiles: fitfilesSlice,
  riderBan: riderBanSlice,
};
