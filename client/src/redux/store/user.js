import userSettingDeleteZwiftIdSlice from '../features/api/user/userSettingDeleteZwiftIdSlice';
import userSettingSlice from '../features/api/user/userSettingSlice';
import zwiftIdSlice from '../features/api/zwift_id/zwiftIdSlice';
import zwiftProfilesSliceSlice from '../features/api/zwift_id/zwiftProfilesSliceSlice';

export const userReducers = {
  getZwiftId: zwiftIdSlice,
  userSetting: userSettingSlice,
  zwiftProfiles: zwiftProfilesSliceSlice,
  userSettingDeleteZwiftId: userSettingDeleteZwiftIdSlice,
};
