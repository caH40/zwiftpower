import { Types } from 'mongoose';
import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants';

// types
import { RiderProfileSchema, TFileMetadataForCloud, TTeam } from './model.interface';
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
  | 'zwiftClubId'
  | 'appearance'
> & { creator: string };

export type TTeamMembersForDto = TTeamMembersPublicDB & {
  rider?: RiderProfileSchema;
  userId: Types.ObjectId;
};

export type TControlMemberAction = 'approve' | 'cancel' | 'ban' | 'cancelBan' | 'exclude';

export type TStatistics = {
  riderMetrics: {
    totalMembers: number;
    categories: { [K in TZwiftCategory]: number };
    averageRacingScore: number;
    medals: {
      gold: number;
      silver: number;
      bronze: number;
    };
  };
  events: { totalResults: number; resultsInActiveSeason: number };
  registeredEventsCount: number;
  seasonRating: { rank: number; points: number } | null;
};

export type TTeamAppearance = {
  badgeBackground?: string; // фон плашки с названием (например, "#1E1E1E")
  badgeTextColor?: string; // цвет текста на плашке
  pageBackground?: string; // фон страницы команды
  accentColor?: string; // акцентный цвет (кнопки, ссылки и т.д.)
};

export type TTeamLeaderboard = {
  _id: string;
  urlSlug: string;
  name: string;
  shortName: string;
  logoFileInfo?: TFileMetadataForCloud | undefined;
  posterFileInfo?: TFileMetadataForCloud | undefined;
  rank: number;
  rankPoints: number;
  totalMembers: number;
  averageRacingScore: number;
  totalResults: number;
  eventMedals: {
    gold: number;
    silver: number;
    bronze: number;
  };
};
