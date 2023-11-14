import { Route } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const Profile = lazy(() => import('../Pages/Profile/Profile'));
const ProfileResults = lazy(() => import('../Pages/Profile/ProfileResults'));
const ProfileSetting = lazy(() => import('../Pages/Profile/ProfileSetting'));
const ProfilePower = lazy(() => import('../Pages/Profile/ProfilePower'));
const ProfileWeight = lazy(() => import('../Pages/Profile/ProfileWeight'));

export function ProfileRoute() {
  const { status } = useSelector((state) => state.checkAuth.value);

  return (
    <>
      <Route path="/profile/:zwiftId" element={<Profile />}>
        <Route path="results" element={<ProfileResults />} />
        <Route path="power" element={<ProfilePower />} />
        <Route path="weight" element={<ProfileWeight />} />
        {status && <Route path="settings" element={<ProfileSetting />} />}
      </Route>
    </>
  );
}
