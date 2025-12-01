import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';

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
const UnsubscribeNotifications = lazy(() =>
  import('../Pages/UnsubscribeNotifications/UnsubscribeNotifications')
);
const SettingsStream = lazy(() => import('../Pages/Profile/SettingsStream/SettingsStream'));
const SettingsServicesAndFinances = lazy(() =>
  import('../Pages/Profile/SettingsServicesAndFinances/SettingsServicesAndFinances')
);

export function ProfileRoute({ hasAuth, user }) {
  return (
    <>
      <Route
        path="/profile/"
        element={<Navigate to={getRedirectPath(hasAuth, user)} replace />}
      />

      <Route
        path="/profile/"
        element={<Navigate to={getRedirectPath(hasAuth, user)} replace />}
      />

      <Route path="/profile/:zwiftId" element={<Profile />}>
        <Route path="results" element={<ProfileResults />} />
        <Route path="power" element={<ProfilePower />} />
        <Route path="weight-and-height" element={<ProfileWeightAndHeight />} />
        <Route path="racing-score" element={<ProfileRacingScore />} />

        {hasAuth && (
          <Route path="settings" element={<ProfileSetting />}>
            <Route path="account" element={<SettingsAccount />} />
            <Route path="notifications" element={<SettingsNotifications />} />
            <Route path="zwift" element={<SettingsZwift />} />
            <Route path="stream" element={<SettingsStream />} />
            <Route path="services-and-finances" element={<SettingsServicesAndFinances />} />
          </Route>
        )}
      </Route>

      <Route
        path={'/notifications/unsubscribe/:userId'}
        element={<UnsubscribeNotifications />}
      />
    </>
  );
}

// Функция для определения пути перенаправления.
function getRedirectPath(status, user) {
  // -без авторизации редирект на домашнюю страницу.
  if (!status) {
    return '/';
  }

  // -с zwiftId редирект на профиль с результатами.
  // -с авторизацией и без привязки zwiftId редирект на настройки в профиле.
  return user?.zwiftId ? `/profile/${user.zwiftId}/results` : '/profile/0/settings/zwift';
}
