// types
import {
  RiderProfileSchema,
  TFinishProtocolConfig,
  TOrganizer,
  TSeries,
  TSiteServicePrice,
  TStageResult,
  TTeam,
  TTeamMember,
  ZwiftEventSubgroupSchema,
} from './model.interface';
import {
  TEventForMailingPreviewDB,
  TEventsForSeriesResponseDB,
  TGeneralClassificationDB,
  TOrganizerSeriesAllResponseDB,
  TSeriesAllPublicResponseDB,
  TSeriesOnePublicResponseDB,
} from './mongodb-response.types';
import { TPaymentNotification } from './payment.types';
import { TTeamLeaderboard } from './team.types';
import { EventWithSubgroup, TRaceSeriesCategories } from './types.interface';

/**
 * Данные Организатора основные и модерируемые клубы для клиента.
 */
export type TOrganizerMainDto = {
  organizer: Omit<
    TOrganizer,
    | '_id'
    | 'createdAt'
    | 'updatedAt'
    | 'botZwift'
    | 'creator'
    | 'logoFileInfo '
    | 'posterFileInfo'
  > & {
    organizerId: string;
    logoUrls: Record<string, string> | undefined;
    posterUrls: Record<string, string> | undefined;
  };
  clubs: { name: string; id: string }[];
};

/**
 * Данные Эвента с подгруппами для расписания для клиента.
 */
export type TEventWithSubgroupDto = Omit<EventWithSubgroup, 'organizerId' | 'seriesId'> & {
  seriesId: Pick<TSeries, '_id' | 'name' | 'urlSlug'> & {
    logoFileInfo?: Record<string, string>;
  };
  organizerId: string;
  logoFileInfo?: Record<string, string>;
  // [key: string]: unknown;
};

/**
 * DTO данных по Эвентам организатора для добавления/удаления в Серию.
 */
export type TEventsForSeriesDto = Omit<TEventsForSeriesResponseDB, '_id'> & { _id: string };

/**
 * DTO данных по Сериям для организатора.
 */
export type TOrganizerSeriesAllDto = Omit<
  TOrganizerSeriesAllResponseDB,
  '_id' | 'dateStart' | 'dateEnd' | 'logoUrls' | 'posterUrls' | 'stages' | 'riderCategoryRule'
> & {
  _id: string;
  stages: TStageClient[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
};

// Данные Этапа для клиента.
type TStageClient = {
  _id: string;
  eventStart: string;
  name: string;
  order: number;
};

/**
 * DTO данных по Сериям для организатора.
 */
export type TOrganizerSeriesOneDto = Omit<
  TSeries,
  '_id' | 'dateStart' | 'dateEnd' | 'logoUrls' | 'posterUrls' | 'stages'
> & {
  _id: string;
  stages: TStageClient[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
};

/**
 * DTO данных по Сериям для организатора.
 */
export type TSeriesAllPublicDto = Omit<
  TSeriesAllPublicResponseDB,
  | '_id'
  | 'dateStart'
  | 'dateEnd'
  | 'logoUrls'
  | 'posterUrls'
  | 'stages'
  | 'scoringTable'
  | 'scoringAlgorithms'
> & {
  _id: string;
  stages: {
    _id: string;
    id: number;
    eventStart: string;
    name: string;
    order: number;
  }[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
};

// Объявляем тип для группы
export type TGroupedSeriesForClient = {
  upcoming: TSeriesAllPublicDto[];
  ongoing: TSeriesAllPublicDto[];
  completed: TSeriesAllPublicDto[];
};

/**
 * DTO данных запрашиваемой Серии заездов для публичного доступа.
 */
export type TSeriesOnePublicDto = Omit<
  TSeriesOnePublicResponseDB,
  '_id' | 'organizer' | 'stages' | 'dateStart' | 'dateEnd' | 'logoUrls' | 'posterUrls'
> & {
  _id: string;
  organizer: {
    _id: string;
    name: string;
    shortName: string;
    logoFileInfo: Record<string, string> | undefined;
  };
  stages: {
    _id: string;
    id: number;
    order: number;
    name?: string;
    eventStart: string;
  }[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
  seriesResults: unknown;
  orderedStages: number[]; // Отсортированный список номеров этапов.
};

/**
 * DTO данных этапов запрашиваемой Серии заездов для публичного доступа.
 */
export type TStagesPublicDto = {
  _id: string;
  id: number;
  eventStart: string;
  name: string;
  imageUrl: string;
  typeRaceCustom: string;
  eventType: string;
  rulesSet: string[];
  tags: string[];
  started: boolean;
  cullingType: string;
  categoryEnforcement: boolean;
  logoFileInfo: Record<string, string> | undefined;
  order: number;
  eventSubgroups: Pick<
    ZwiftEventSubgroupSchema,
    | 'id'
    | 'mapId'
    | 'routeId'
    | 'durationInSeconds'
    | 'distanceInMeters'
    | 'laps'
    | 'distanceSummary'
    | 'eventSubgroupStart'
    | 'subgroupLabel'
    | 'tags'
    | 'totalEntrantCount'
  >[];
};

/**
 * DTO данных конфигурации финишного протокола.
 */
export type TFinishProtocolConfigDto = Omit<
  TFinishProtocolConfig,
  '_id' | 'organizer' | 'createdAt' | 'updatedAt'
> & {
  _id: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  organizerName: string;
};

/**
 * DTO получения результатов этапа серии.
 */
export type StageResultDto = Omit<
  TStageResult,
  '_id' | 'series' | 'teamSquadAtRace' | 'createdAt' | 'updatedAt' | 'modifiedCategory'
> & {
  _id: string;
  series: string;
  teamSquadAtRace: string | null;
  wattsPerKg: number;
  modifiedCategory: {
    value: TRaceSeriesCategories | null;
    moderator?: { username: string };
    modifiedAt: Date;
    reason?: string;
  };
};
export type StageResultsDto = {
  results: StageResultDto[];
  resultsUpdatedAt?: string;
};

/**
 * DTO получения результатов этапа серии.
 */
export type TGeneralClassificationDto = {
  results: (Omit<TGeneralClassificationDB, '_id' | 'createdAt' | 'updatedAt'> & {
    _id: string;
  })[];
  gcResultsUpdatedAt?: string;
};

export type TPaymentNotificationDto = Omit<
  TPaymentNotification,
  '_id' | 'user' | 'capturedAt' | 'expiresAt' | 'createdAt'
> & {
  _id: string;
  user: string;
  capturedAt?: string;
  expiresAt?: string;
  createdAt: string;
};

/**
 * DTO получения результатов этапа серии.
 */
export type TSiteServicePriceDto = Omit<
  TSiteServicePrice,
  '_id' | 'createdAt' | 'updatedAt'
> & { _id: string; createdAt: string; updatedAt: string };

export type TTeamForListDto = Pick<TTeam, 'name' | 'shortName' | 'urlSlug'> & {
  _id: string;
  logoUrls?: Record<string, string>;
  posterUrls?: Record<string, string>;
};

export type TTeamPublicDto = Omit<
  TTeam,
  | 'creator'
  | 'pendingRiders'
  | 'bannedRiders'
  | 'createdAt'
  | 'updatedAt'
  | 'logoFileInfo'
  | 'posterFileInfo'
  | '_id'
> & {
  _id: string;
  logoUrls?: Record<string, string>;
  posterUrls?: Record<string, string>;
};

export type TTeamMemberPublicDto = {
  rider?: RiderProfileSchema;
} & Pick<TTeamMember, 'role' | 'specialization' | 'createdAt'> & {
    _id: string;
    userId: string;
  };

export type TPendingRiderDto = RiderProfileSchema & {
  _id: string;
  userId: string;
  requestedAt: string;
};
export type TBannedRiderDto = RiderProfileSchema & {
  _id: string;
  bannedAt: string;
  userId: string;
  bannedReason?: string;
};

export type TEventForMailingPreviewDto = Omit<
  TEventForMailingPreviewDB,
  '_id' | 'eventSubgroups' | 'seriesId' | 'organizerId'
> & { _id: string } & {
  eventSubgroups: Pick<
    ZwiftEventSubgroupSchema,
    'mapId' | 'routeId' | 'subgroupLabel' | 'laps' | 'distanceSummary'
  >[];
} & {
  seriesId?: Pick<TSeries, 'name' | 'urlSlug'> & {
    posterUrls?: Record<string, string>;
    _id: string;
  };
} & {
  organizerId?: Pick<TOrganizer, 'name' | 'urlSlug'> & {
    logoUrls?: Record<string, string>;
    _id: string;
  };
};

export type TGetAllServiceMessagesForUserDto = {
  _id: string;
  title: string;
  text: string;
  entityUrl?: string;
  externalEntityUrl?: string;
  entityLogo?: string;
  isRead: boolean;
  createdAt: string;
};

export type TTeamLeaderboardDto = Omit<TTeamLeaderboard, 'logoFileInfo' | 'posterFileInfo'> & {
  logoUrls?: Record<string, string> | undefined;
  posterUrls?: Record<string, string> | undefined;
};
