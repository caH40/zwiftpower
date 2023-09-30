import { Route } from 'react-router-dom';
import { lazy } from 'react';

const RaceStatistics = lazy(() => import('../Pages/RaceStatistics/RaceStatistics'));
const RidersInEvents = lazy(() => import('../Pages/RaceStatistics/RidersInEvents'));

import MySuspense from '../HOC/Se';

export function StatisticsRoute() {
  return (
    <>
      <Route
        path="/race/statistics"
        element={
          <MySuspense>
            <RaceStatistics />
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
