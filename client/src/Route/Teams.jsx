import { Route } from 'react-router-dom';
import { lazy } from 'react';

const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));
const TeamCreatePage = lazy(() => import('../Pages/TeamCreate/TeamCreate'));
const TeamPage = lazy(() => import('../Pages/Team/Team'));

/**
 * Маршруты для страниц команд.
 */
export function TeamsRoute() {
  return (
    <>
      <Route path="teams" element={<TeamsPublic />} />
      <Route path="teams/create" element={<TeamCreatePage />} />
      <Route path="teams/:urlSlug" element={<TeamPage />} />
    </>
  );
}
