import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ResultsList = lazy(() => import('../Pages/ResultsList/ResultsList'));
const ResultsDescription = lazy(() =>
  import('../Pages/ResultsDescription/RaceResultsDescription')
);

export function ResultsRoute() {
  return (
    <>
      <Route path="/race/results" element={<ResultsList />} />
      <Route path="/race/results/:eventId" element={<ResultsDescription />} />
    </>
  );
}
