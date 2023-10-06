import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Statistics = lazy(() => import('../Pages/Statistics/Statistics'));
const RidersInEvents = lazy(() => import('../Pages/Statistics/RidersInEvents'));
const LeadersInIntervals = lazy(() => import('../Pages/Statistics/LeadersInIntervals'));

import MySuspense from '../HOC/Se';

export function StatisticsRoute() {
  return (
    <>
      <Route
        path="/race/statistics"
        element={
          <MySuspense>
            <Statistics />
          </MySuspense>
        }
      >
        <Route
          path="main"
          element={
            <MySuspense>
              <RidersInEvents />
            </MySuspense>
          }
        />

        <Route
          path="leaders/male"
          element={
            <MySuspense>
              <LeadersInIntervals />
            </MySuspense>
          }
        />

        <Route
          path="leaders/female"
          element={
            <MySuspense>
              <LeadersInIntervals />
            </MySuspense>
          }
        />
      </Route>
    </>
  );
}
