import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants';

/**
 * Специализация райдера.
 */
export type TTeamSpecialization = (typeof TEAM_SPECIALIZATIONS)[number];

/**
 * Роль райдера в команде.
 */
export type TTeamRole = (typeof TEAM_ROLES)[number];
