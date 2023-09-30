import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Statistics = lazy(() => import('../Pages/Statistics/Statistics'));
const RidersInEvents = lazy(() => import('../Pages/Statistics/RidersInEvents'));

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
          index
          element={
            <MySuspense>
              <RidersInEvents />
            </MySuspense>
          }
        />
      </Route>
    </>
  );
}
