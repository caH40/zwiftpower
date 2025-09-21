import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';

import { navigateTo403 } from '../utils/routeUtils';
const TeamsPublic = lazy(() => import('../Pages/Teams/Teams'));
const TeamCreatePage = lazy(() => import('../Pages/TeamCreate/TeamCreate'));
const TeamPageLayout = lazy(() => import('../Pages/Team/TeamPageLayout'));
const TeamMembersPage = lazy(() => import('../Pages/Team/Members/TeamMembers'));
const TeamResultsPage = lazy(() => import('../Pages/Team/Results/TeamResults'));
const TeamControlLayout = lazy(() => import('../Pages/Team/Control/TeamControlLayout'));
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
export function TeamsRoute({ hasAuth, userInTeam }) {
  return (
    <>
      <Route path="/teams" element={<TeamsPublic />} />
      {hasAuth && !userInTeam?.id ? (
        <Route path="/moderation/teams/create" element={<TeamCreatePage />} />
      ) : (
        navigateTo403('/moderation/teams/create')
      )}
      <Route path="/teams/:urlSlug" element={<TeamPageLayout />}>
        <Route path="members" element={<TeamMembersPage />} />
        <Route path="results" element={<TeamResultsPage />} />

        {hasAuth && userInTeam?.isCreator ? (
          <Route path="control" element={<TeamControlLayout />}>
            <Route index element={<Navigate to="members" replace />} />
            <Route path="members" element={<TeamControlMembersPage />} />
            <Route path="edit" element={<TeamControlEditPage />} />
          </Route>
        ) : (
          navigateTo403('control/*')
        )}
      </Route>
    </>
  );
}
