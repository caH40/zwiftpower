import { Types } from 'mongoose';
import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants';

// types
import { RiderProfileSchema, TTeam } from './model.interface';
import { TTeamMembersPublicDB } from './mongodb-response.types';
import { TZwiftCategory } from './types.interface';

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

export type TTeamMembersForDto = TTeamMembersPublicDB & {
  rider?: RiderProfileSchema;
  userId: Types.ObjectId;
};

export type TControlMemberAction = 'approve' | 'cancel' | 'ban' | 'cancelBan' | 'exclude';

export type TStatistics = {
  riderMetrics: {
    categories: { [K in TZwiftCategory]: number };
    averageRacingScore: number;
    medals: {
      gold: number;
      silver: number;
      bronze: number;
    };
  };
  events: { totalResults: number; resultsInActiveSeason: number };
};
