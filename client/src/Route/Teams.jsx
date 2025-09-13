import { Route } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));
const TeamCreatePage = lazy(() => import('../Pages/TeamCreate/TeamCreate'));
const TeamPageLayout = lazy(() => import('../Pages/Team/TeamPageLayout'));
const TeamMembersPage = lazy(() => import('../Pages/Team/Members/TeamMembers'));
const TeamResultsPage = lazy(() => import('../Pages/Team/Results/TeamResults'));
const TeamEditPage = lazy(() => import('../Pages/Team/Edit/TeamEdit'));

/**
 * Маршруты для страниц команд.
 */
export function TeamsRoute() {
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);

  return (
    <>
      <Route path="/teams" element={<TeamsPublic />} />
      {status && !userInTeam?.id && (
        <Route path="/moderation/teams/create" element={<TeamCreatePage />} />
      )}
      <Route path="/teams/:urlSlug" element={<TeamPageLayout />}>
        <Route path="members" element={<TeamMembersPage />} />
        <Route path="results" element={<TeamResultsPage />} />

        {status && userInTeam?.isCreator && <Route path="edit" element={<TeamEditPage />} />}
      </Route>
    </>
  );
}
