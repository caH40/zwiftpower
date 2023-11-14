import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ScheduleList = lazy(() => import('../Pages/ScheduleList/ScheduleList'));
const ScheduleDescription = lazy(() =>
  import('../Pages/ScheduleDescription/ScheduleDescription')
);

export function ScheduleRouteRoute() {
  return (
    <>
      <Route path="/race/schedule" element={<ScheduleList />} />
      <Route path="/race/schedule/:eventId" element={<ScheduleDescription />} />
    </>
  );
}
