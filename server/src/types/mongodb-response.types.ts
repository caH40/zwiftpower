/**
 *
 */

import { Types } from 'mongoose';
import {
  TFileMetadataForCloud,
  TFinishProtocolConfig,
  TSeries,
  TSeriesClassification,
  TSeriesStage,
  TStageResult,
  TTeam,
  ZwiftEventSubgroupSchema,
} from './model.interface';

export type NextWeekRacesResponseDB = {
  _id: Types.ObjectId;
  id: number;
  eventType: string;
  eventStart: string;
  microserviceExternalResourceId: string;
  microserviceEventVisibility: string;
  organizerId: { name: string };
  eventSubgroups: {
    mapId: number;
    routeId: number;
    distanceSummary: { distanceInKilometers: number; elevationGainInMeters: number };
    distanceInMeters: number;
    durationInSeconds: number;
    laps: number;
  }[];
};

/**
 * Данные по Эвентам организатора для добавления/удаления в Серию.
 */
export type TEventsForSeriesResponseDB = {
  _id: Types.ObjectId;
  name: string;
  eventStart: string;
};

/**
 * Данные по Сериям для организатора.
 */
export type TOrganizerSeriesAllResponseDB = Pick<
  TSeries,
  | '_id'
  | 'dateEnd'
  | 'dateStart'
  | 'isFinished'
  | 'logoFileInfo'
  | 'name'
  | 'posterFileInfo'
  | 'urlSlug'
  | 'type'
> & { stages: TStage[] };

// Этап полученный при использовании populate.
type TStage = {
  event: {
    _id: Types.ObjectId;
    eventStart: string;
    name: string;
  };
  order: number;
  label?: string; // Название этапа, если нет номера или равен 0.
  includeResults: boolean; // Учитывать результаты этапа в серии.
};

/**
 * Данные Серии заездов для Организатора для редактирования.
 */
export type TOrganizerSeriesOneResponseDB = Omit<TSeries, 'stages'> & {
  stages: TStage[];
};

/**
 * Данные по Сериям для пользователей.
 */
export type TSeriesAllPublicResponseDB = Omit<TSeries, 'stages' | 'organizer'> & {
  organizer: { _id: Types.ObjectId; name: string; shortName: string };
  stages: {
    event: {
      _id: Types.ObjectId;
      id: number;
      eventStart: string;
      name: string;
    };
    order: number;
  }[];
};

/**
 * Данные по Серии для пользователей.
 */
export type TSeriesOnePublicResponseDB = Omit<TSeries, 'stages' | 'organizer'> & {
  organizer: {
    _id: Types.ObjectId;
    name: string;
    shortName: string;
    logoFileInfo: TFileMetadataForCloud;
  };
  stages: (Omit<TSeriesStage, 'event'> & {
    event: {
      _id: Types.ObjectId;
      id: number;
      eventStart: string;
    };
  })[];
};

/**
 * Данные по Серии для пользователей.
 */
export type TStagesPublicResponseDB = {
  stages: {
    event: {
      _id: Types.ObjectId;
      id: number;
      eventStart: string;
      name: string;
      imageUrl: string;
      typeRaceCustom: string;
      eventType: string;
      rulesSet: string[];
      tags: string[];
      started: boolean;
      eventSubgroups: ZwiftEventSubgroupSchema[];
    };
    order: number;
  }[];
  organizer: {
    logoFileInfo?: TFileMetadataForCloud; // Объект с URL логотипа (разные размеры).
  };
};

/**
 * Данные по Серии для формирования мета-тэгов.
 */
export type TSeriesForMetaTagsResponseDB = Pick<
  TSeries,
  'name' | 'dateStart' | 'dateEnd' | 'mission' | 'posterFileInfo'
> & { organizer: { name: string } };

/**
 * Данные по Конфигурации финишных протоколов для формирования списка.
 */
export type TFinishProtocolConfigResponseDB = Omit<TFinishProtocolConfig, 'organizer'> & {
  organizer: { name: string; _id: Types.ObjectId };
};

/**
 * Все результаты серии для создания генеральной классификации.
 */
export type TStagesResultsForGC = Pick<
  TStageResult,
  | 'order'
  | 'profileId'
  | 'profileData'
  | 'activityData'
  | 'category'
  | 'rank'
  | 'points'
  | 'disqualification'
  | 'teamSquadAtRace'
>;

/**
 * Генеральная классификация серии заездов.
 */
export type TGeneralClassificationDB = TSeriesClassification;

export type TTeamForListDB = Pick<
  TTeam,
  '_id' | 'name' | 'shortName' | 'urlSlug' | 'logoFileInfo' | 'posterFileInfo'
>;

export type TTeamPublicDB = Omit<
  TTeam,
  'creator' | 'pendingRiders' | 'bannedRiders' | 'createdAt' | 'updatedAt'
>;
