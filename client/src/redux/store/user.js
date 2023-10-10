import userSettingSlice from '../features/api/user/userSettingSlice';
import zwiftIdSlice from '../features/api/zwift_id/zwiftIdSlice';

export const userReducers = {
  getZwiftId: zwiftIdSlice,
  userSetting: userSettingSlice,
};
