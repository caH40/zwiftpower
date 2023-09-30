import { Route } from 'react-router-dom';
import { lazy } from 'react';

import MySuspense from '../HOC/Se';

const Profile = lazy(() => import('../Pages/Profile/Profile'));
const ProfileResults = lazy(() => import('../Pages/Profile/ProfileResults'));
const ProfileSetting = lazy(() => import('../Pages/Profile/ProfileSetting'));
const ProfilePower = lazy(() => import('../Pages/Profile/ProfilePower'));
const ProfileWeight = lazy(() => import('../Pages/Profile/ProfileWeight'));

export function ProfileRoute() {
  return (
    <>
      <Route
        path="/profile/:zwiftId"
        element={
          <MySuspense>
            <Profile />
          </MySuspense>
        }
      >
        <Route
          path="results"
          element={
            <MySuspense>
              <ProfileResults />
            </MySuspense>
          }
        />
        <Route
          path="power"
          element={
            <MySuspense>
              <ProfilePower />
            </MySuspense>
          }
        />
        <Route
          path="weight"
          element={
            <MySuspense>
              <ProfileWeight />
            </MySuspense>
          }
        />
        <Route
          path="settings"
          element={
            <MySuspense>
              <ProfileSetting />
            </MySuspense>
          }
        />
      </Route>
    </>
  );
}
