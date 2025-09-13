import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));
const TeamCreatePage = lazy(() => import('../Pages/TeamCreate/TeamCreate'));
const TeamPageLayout = lazy(() => import('../Pages/Team/TeamPageLayout'));
const TeamMembersPage = lazy(() => import('../Pages/Team/Members/TeamMembers'));
const TeamResultsPage = lazy(() => import('../Pages/Team/Results/TeamResults'));
const TeamControlPage = lazy(() => import('../Pages/Team/Control/TeamControl'));
const TeamControlMembersPage = lazy(() =>
  import('../Pages/Team/ControlMembers/TeamControlMembers')
);
const TeamControlEditPage = lazy(() => import('../Pages/Team/ControlEdit/TeamControlEdit'));

/**
 * Маршруты для страниц команд.
 * team:{
 * id:string; id команды в которой состоит пользователь.
 * isCreator:boolean; Является ли пользователь создателем команды с team.id
 * }
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

        {status && userInTeam?.isCreator && (
          <Route path="control" element={<TeamControlPage />}>
            <Route index element={<Navigate to="members" replace />} />
            <Route path="members" element={<TeamControlMembersPage />} />
            <Route path="edit" element={<TeamControlEditPage />} />
          </Route>
        )}
      </Route>
    </>
  );
}
