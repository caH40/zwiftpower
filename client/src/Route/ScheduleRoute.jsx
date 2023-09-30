import { Route } from 'react-router-dom';
import { lazy } from 'react';

const RaceScheduleList = lazy(() => import('../Pages/RaceScheduleList/RaceScheduleList'));
const RaceScheduleDescription = lazy(() =>
  import('../Pages/RaceScheduleDescription/RaceScheduleDescription')
);
import MySuspense from '../HOC/Se';

export function ScheduleRouteRoute() {
  return (
    <>
      <Route
        path="/race/schedule"
        element={
          <MySuspense>
            <RaceScheduleList />
          </MySuspense>
        }
      />
      <Route
        path="/race/schedule/:eventId"
        element={
          <MySuspense>
            <RaceScheduleDescription />
          </MySuspense>
        }
      />
    </>
  );
}
