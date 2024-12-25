import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const Profile = lazy(() => import('../Pages/Profile/Profile'));
const ProfileResults = lazy(() => import('../Pages/Profile/ProfileResults'));
const ProfileSetting = lazy(() => import('../Pages/Profile/ProfileSetting'));
const ProfilePower = lazy(() => import('../Pages/Profile/Power/ProfilePower'));
const ProfileRacingScore = lazy(() =>
  import('../Pages/Profile/ProfileRacingScore/ProfileRacingScore')
);
const ProfileWeightAndHeight = lazy(() =>
  import('../Pages/Profile/ProfileWeightAndHeight/ProfileWeightAndHeight')
);
const SettingsAccount = lazy(() => import('../Pages/Profile/SettingsAccount/SettingsAccount'));
const SettingsNotifications = lazy(() =>
  import('../Pages/Profile/SettingsNotifications/SettingsNotifications')
);
const SettingsZwift = lazy(() => import('../Pages/Profile/SettingsZwift/SettingsZwift'));
const SettingsStream = lazy(() => import('../Pages/Profile/SettingsStream/SettingsStream'));

export function ProfileRoute() {
  const { status, user } = useSelector((state) => state.checkAuth.value);

  return (
    <>
      <Route
        path="/profile/"
        element={
          status ? (
            user?.zwiftId ? (
              // с zwiftId редирект на профиль с результатами
              <Navigate to={`/profile/${user?.zwiftId}/results`} replace />
            ) : (
              // с авторизацией и без привязки zwiftId редирект на настройки в профиле
              <Navigate to={'/profile/0/settings/zwift'} replace />
            )
          ) : (
            // без авторизации редирект на домашнюю страницу
            <Navigate to={'/'} replace />
          )
        }
      />

      <Route path="/profile/:zwiftId" element={<Profile />}>
        <Route path="results" element={<ProfileResults />} />
        <Route path="power" element={<ProfilePower />} />
        <Route path="weight-and-height" element={<ProfileWeightAndHeight />} />
        <Route path="racing-score" element={<ProfileRacingScore />} />

        {status && (
          <Route path="settings" element={<ProfileSetting />}>
            <Route path="account" element={<SettingsAccount />} />
            <Route path="notifications" element={<SettingsNotifications />} />
            <Route path="zwift" element={<SettingsZwift />} />
            <Route path="stream" element={<SettingsStream />} />
          </Route>
        )}
      </Route>
    </>
  );
}
