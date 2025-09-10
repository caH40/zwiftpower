import { Route } from 'react-router-dom';
import { lazy } from 'react';

const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));

/**
 * Маршруты для страниц команд.
 */
export function TeamsRoute() {
  return (
    <>
      <Route path="teams" element={<TeamsPublic />} />
    </>
  );
}
