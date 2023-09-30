import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ScheduleList = lazy(() => import('../Pages/ScheduleList/ScheduleList'));
const ScheduleDescription = lazy(() =>
  import('../Pages/ScheduleDescription/ScheduleDescription')
);
import MySuspense from '../HOC/Se';

export function ScheduleRouteRoute() {
  return (
    <>
      <Route
        path="/race/schedule"
        element={
          <MySuspense>
            <ScheduleList />
          </MySuspense>
        }
      />
      <Route
        path="/race/schedule/:eventId"
        element={
          <MySuspense>
            <ScheduleDescription />
          </MySuspense>
        }
      />
    </>
  );
}
