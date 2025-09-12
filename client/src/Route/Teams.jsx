import { Route } from 'react-router-dom';
import { lazy } from 'react';

const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));
const TeamCreatePage = lazy(() => import('../Pages/TeamCreate/TeamCreate'));
const TeamPageLayout = lazy(() => import('../Pages/Team/TeamPageLayout'));
const TeamMembersPage = lazy(() => import('../Pages/Team/Members/TeamMembers'));
const TeamResultsPage = lazy(() => import('../Pages/Team/Results/TeamResults'));

/**
 * Маршруты для страниц команд.
 */
export function TeamsRoute() {
  return (
    <>
      <Route path="/teams" element={<TeamsPublic />} />
      <Route path="/teams/create" element={<TeamCreatePage />} />
      <Route path="/teams/:urlSlug" element={<TeamPageLayout />}>
        <Route path="/teams/:urlSlug/members" element={<TeamMembersPage />} />
        <Route path="/teams/:urlSlug/results" element={<TeamResultsPage />} />
      </Route>
    </>
  );
}
