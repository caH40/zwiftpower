import profileRefreshSlice from '../features/api/profileRefreshSlice';
import userSettingDeleteZwiftIdSlice from '../features/api/user/userSettingDeleteZwiftIdSlice';
import userSettingSlice from '../features/api/user/userSettingSlice';
import zwiftProfileSlice from '../features/api/zwiftProfiles/zwiftProfileSlice';
import zwiftProfilesSliceSlice from '../features/api/zwiftProfiles/zwiftProfilesSliceSlice';
import userSettingsSlice from '../features/api/user-settings/userSettingsSlice';
import externalAccountsSlice from '../features/api/external-accounts/externalAccountsSlice';

export const userReducers = {
  getZwiftProfile: zwiftProfileSlice,
  userSetting: userSettingSlice,
  zwiftProfiles: zwiftProfilesSliceSlice,
  userSettingDeleteZwiftId: userSettingDeleteZwiftIdSlice,
  profileRefresh: profileRefreshSlice,
  userSettings: userSettingsSlice,
  externalAccounts: externalAccountsSlice,
};
