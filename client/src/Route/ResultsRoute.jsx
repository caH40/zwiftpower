import { Route } from 'react-router-dom';
import { lazy } from 'react';

const ResultsListPage = lazy(() => import('../Pages/ResultsList/ResultsListPage'));
const ResultsDescription = lazy(() => import('../Pages/RaceResults/RaceResults'));

export function ResultsRoute() {
  return (
    <>
      <Route path="/race/results" element={<ResultsListPage />} />
      <Route path="/race/results/:eventId" element={<ResultsDescription />} />
    </>
  );
}
