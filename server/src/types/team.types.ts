import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants';

// types
import { TTeam } from './model.interface';

/**
 * Специализация райдера.
 */
export type TTeamSpecialization = (typeof TEAM_SPECIALIZATIONS)[number];

/**
 * Роль райдера в команде.
 */
export type TTeamRole = (typeof TEAM_ROLES)[number];

export type TCreateTeamParams = Pick<
  TTeam,
  | 'contact'
  | 'country'
  | 'description'
  | 'logoFileInfo'
  | 'mission'
  | 'name'
  | 'posterFileInfo'
  | 'shortName'
  | 'telegram'
  | 'socialLinks'
  | 'website'
> & { creator: string };
