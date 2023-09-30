import { Route } from 'react-router-dom';
import { lazy } from 'react';

const RaceResultsList = lazy(() => import('../Pages/RaceResultsList/RaceResultsList'));
const RaceResultsDescription = lazy(() =>
  import('../Pages/RaceResultsDescription/RaceResultsDescription')
);
import MySuspense from '../HOC/Se';

export function ResultsRoute() {
  return (
    <>
      <Route
        path="/race/results"
        element={
          <MySuspense>
            <RaceResultsList />
          </MySuspense>
        }
      />
      <Route
        path="/race/results/:eventId"
        element={
          <MySuspense>
            <RaceResultsDescription />
          </MySuspense>
        }
      />
    </>
  );
}
