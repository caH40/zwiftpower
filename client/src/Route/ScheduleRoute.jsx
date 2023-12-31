import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ScheduleList = lazy(() => import('../Pages/ScheduleList/ScheduleList'));
const SignedRiders = lazy(() => import('../Pages/SignedRiders/SignedRiders'));

export function ScheduleRouteRoute() {
  return (
    <>
      <Route path="/race/schedule" element={<ScheduleList />} />
      <Route path="/race/schedule/:eventId" element={<SignedRiders />} />
    </>
  );
}
