import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ResultsList = lazy(() => import('../Pages/ResultsList/ResultsList'));
const ResultsDescription = lazy(() =>
  import('../Pages/ResultsDescription/RaceResultsDescription')
);
import MySuspense from '../HOC/Se';

export function ResultsRoute() {
  return (
    <>
      <Route
        path="/race/results"
        element={
          <MySuspense>
            <ResultsList />
          </MySuspense>
        }
      />
      <Route
        path="/race/results/:eventId"
        element={
          <MySuspense>
            <ResultsDescription />
          </MySuspense>
        }
      />
    </>
  );
}
