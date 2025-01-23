import mongoose, { Document, Types } from 'mongoose';

import { PowerFitFiles, ProfileDataInResultWithId, TAuthService } from './types.interface.js';
import { ProfileZwiftAPI } from './zwiftAPI/profileFromZwift.interface.js';
import { bans } from '../assets/ban.js';

// типизация схемы и модели документов mongodb

export interface DescriptionSchema {
  name: string;
  description: string;
}
//
//

/**
 * Документ с массивом кратких описаний активностей и фитфайлами к ним.
 */
export type FitFileSchema = {
  zwiftId: number;
  dateLastedActivity: number;
  dateUpdate: number;
  activities: TActivitiesForFitFile[];
};
export type TActivitiesForFitFile = PowerFitFiles & {
  _id: mongoose.Types.ObjectId;
  isVirtualPower: boolean; // Данные используются для расчета кривой мощности, но не учитываются в таблицах лидеров.
  bannedForLeaderboard?: boolean; // Данные используются для расчета кривой мощности, но не учитываются в таблицах лидеров.
  banned?: boolean; // Данные активности (фитфайла) нигде не учитываются. Данные глючные или читерские.
};

//
//
export interface InfoDevelopmentSchema {
  _id?: Types.ObjectId;
  postDate: number;
  updateDate: number;
  releaseDate: number;
  version: string;
  userPost: Types.ObjectId;
  userEdit: Types.ObjectId;
  text: string;
  isFromGitHubActions: boolean;
}
//
//
export interface PasswordResetSchema {
  userId: string;
  date: number;
  tokenReset: string;
  email: string;
}

/**
 * Кривая мощности райдера.
 * Несколько точек измерения мощности и удельной мощности за последние 90 дней.
 * Фильтрация забанненных активностей осуществляется до момента создания кривой мощности.
 * bannedForLeaderboard мощность участвующая в кривой мощности, но не учитывается в лидерах мощности.
 * bannedForLeaderboard случай когда нет возможности определить isVirtualPower, но райдер точно использует isVirtualPower. Или несколько людей на одной учетной записи.
 */
export interface PowerCurveSchema {
  zwiftId: number;
  isMale: boolean;
  date: number;
  pointsWatts: CriticalPower[];
  pointsWattsPerKg: CriticalPower[];
}
/**
 * Данные по Critical power
 */
export type CriticalPower = {
  isVirtualPower: boolean;
  duration: number;
  value: number;
  date: number;
  name: string;
  bannedForLeaderboard: boolean; // Мощность участвующая в кривой мощности, но не учитывается в
};
//
//
export interface ResultSchema {
  stageId: Types.ObjectId;
  riderId: Types.ObjectId;
  zwiftEventId: Types.ObjectId;
  subgroupId: Types.ObjectId;
  zwiftRiderId: number;
  name: string;
  placeAbsolute: number;
  wattPerKg: number;
  watt: number;
  time: number;
  penalty: { powerUp: number };
  isDisqualification: boolean;
  isDidNotFinish: boolean;
  category: string;
  categoryCurrent: string;
  teamCurrent: Types.ObjectId;
  isNeedCount: boolean;
  pointsStage: number;
  pointsStageOldW: number;
  pointsSprint: {
    stageNumber: number;
    sprint: number;
    place: string;
    points: number;
    multiplier: number;
  }[];
  pointsMountain: {
    stageNumber: number;
    mountain: number;
    place: string;
    points: number;
    multiplier: number;
  }[];
  isUnderChecking: boolean;
  comment: string;
  weightInGrams: number;
  heightInCentimeters: number;
  avgHeartRate: number;
  gender: string;
  imageSrc: string;
  addedManually: boolean;
}

/**
 * Общие данные данные райдера
 * Дополнительные данные (таблицы) для более оптимальных запросов данных для других таблиц
 */
export interface RiderProfileSchema
  extends Exclude<
    ProfileZwiftAPI,
    | 'firstName'
    | 'lastName'
    | 'male'
    | 'eventCategory'
    | 'imageSrc'
    | 'countryAlpha3'
    | 'age'
    | 'height'
    | 'weight'
    | 'competitionMetrics'
  > {
  zwiftId: number;
  totalEvents: number; // общее количество заездов
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}
//
//
export interface RiderSchema {
  unique: string;
  root: number;
  admin: number;
  moderator: number;
}
//
//
export interface SeriesSchema {
  _id: Types.ObjectId;
  name: string;
  dateStart: number;
  description: string;
  descriptionShort: string;
  type: string;
  organizer: string;
  hasGeneral: boolean;
  hasTeams: boolean;
  isFinished: boolean;
}
//
//
export interface TeamSchema {
  name: string;
  riders: {
    rider: Types.ObjectId;
    dateJoin: number;
    dateLeave: number;
  }[];
  description: string;
  logoUrl: string;
  logoBase64: string;
  groupName: string;
  link: string;
  isAllowed: boolean;
  requestRiders: [];
  deleted: boolean;
}
//
//
export interface LogsAdminSchema {
  userId: Types.ObjectId;
  date: number;
  description: string;
  event: {
    id: number;
    name: string;
    start: number;
  };
}

/**
 * Токен аутентификации.
 */
export type TAuthToken = {
  userId: Types.ObjectId; // Идентификатор пользователя.
  authService: TAuthService; // Сервис, через который произошла авторизация.
  device: TDeviceInfo;
  tokens: {
    accessToken: string; // JWT access-токен.
    refreshToken: string; // JWT refresh-токен.
  };
  location?: TLocationInfo;
  createdAt: Date; // Дата создания записи.
  updatedAt: Date; // Дата последнего обновления записи.
  expiresAt: Date;
};
/**
 * Данные об оборудовании и ПО с которого происходила авторизация пользователя.
 */
export type TDeviceInfo = {
  deviceId: string; // Уникальный идентификатор устройства.
  userAgent?: string; // User-Agent устройства.
  platform?: string; // Платформа устройства.
  language?: string; // Язык браузера.
  screenResolution?: string; // Разрешение экрана.
};
/**
 * Данные об локации из которой происходила авторизация пользователя.
 */
export type TLocationInfo = {
  ip?: string; // IP-адрес.
  city?: string; // Город.
  region?: string; // Регион.
  country?: string; // Страна.
  timezone?: string; // Часовой пояс.
};

/**
 * Схема для Zwift token бота-модератора клуба в Звифт.
 */
export type TZwiftToken = {
  organizer: mongoose.Types.ObjectId;
  token: string;
  username: string; // e-mail бота-модератора используется вместо username.
  iv: string; // IV для дешифровки
  importance: 'main' | 'secondary';
  createdAt: Date;
  updatedAt: Date;
};

//
//
export interface TotalCatchupSchema {
  type: string;
  season: string;
  start: number;
  end: number;
  update: {
    user: Types.ObjectId;
    data: number;
  };
  manual: {
    dateStart: number;
    winnerCategory: string;
    create: {
      user: Types.ObjectId;
      data: number;
    };
  }[];
}
//
//
export interface UserConfirmSchema {
  userId: string;
  date: number;
  activationToken: string;
  email: string;
}
//
//

export type UserSchema = {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  riderId: Types.ObjectId;
  zwiftId: number;
  zwiftIdAdditional: number[];
  telegramId: number;
  date: number;
  email: string;
  emailConfirm: boolean;
  phone: string;
  firstName: string;
  patronymic: string;
  lastName: string;
  category?: 'E' | 'APlus' | 'A' | 'B' | 'C' | 'D';
  gender: string;
  birthday: number;
  city: string;
  team: string;
  role: string;
  moderator?: {
    clubs: string[]; // список клубов в которых является модератором
  };
  bio: string;
  notifications: TNotifications;
  streams: TUserStreams;

  // Внешние аккаунты: VK, Yandex и т.д.
  externalAccounts?: { vk?: TExternalAccountVk };
};

export type TExternalAccountVk = {
  id: number;
  firstName: string; // Имя пользователя.
  lastName: string; // Фамилия пользователя.
  avatarSrc: string;
  verified: boolean;
  gender: 'male' | 'female';
  birthday?: string; // 'DD.MM.YYYY'
  email?: string;
};

export type TNotifications = {
  development: boolean; // Оповещение на email об изменениях на сайте.
  events: boolean; // Оповещение на email об новых Эвентах.
  news: boolean; // Оповещение на email о новостях.
};
export type TUserStreams = {
  twitch?: {
    channelName: string; // Название канала на Твиче.
    isEnabled: boolean; // Включение/отключение пользователем отображения стрима twitch на сайте.
  };
  youtube?: {
    channelHandle: string; // Ручка канала youtube, это название в url после знака @.
    isEnabled: boolean; // Включение/отключение пользователем отображения стрима youtube на сайте.
  };
  streamingRestricted: boolean; // Флаг, ограничивающий добавление стримов пользователем. (устанавливается админом)
};

//
//
export interface ZwiftEventSchema {
  _id?: Types.ObjectId;
  seriesId: Types.ObjectId | null;
  typeRaceCustom: string;
  accessExpressionObj: TAccessExpressionObj | null; // Описание диапазонов доступа в категории при включенной Строгой категоризации.
  id: number;
  mapId: number;
  categoryEnforcement: boolean;
  accessExpression: string;
  cullingType: string;
  description: string;
  eventStart: string;
  eventType: string;
  type: string;
  imageUrl: string;
  microserviceEventVisibility: string;
  microserviceExternalResourceId: string;
  name: string;
  rulesSet: string[];
  organizer: string; // label Организатора
  organizerId?: Types.ObjectId; // _id Организатора в БД.
  tags: string[];
  visible: boolean;
  totalEntrantCount: number;
  totalJoinedCount: number;
  totalSignedUpCount: number;
  eventSubgroups: Types.ObjectId[];
  clubName: string;
  hasResults: boolean;
  needCount: boolean;
  updated?: number;
  creator: Types.ObjectId | string;
  started: boolean;
  totalFinishedCount?: number;
  modifiedResults?: {
    hasModified: boolean;
    moderators: {
      moderatorId: Types.ObjectId;
      date: number;
      action: { property: string; value: string; rider: string; message?: string };
    }[];
  };
}
export type TAccessExpressionObj = {
  name: string;
  label: string;
  description: string;
} | null;
//
//
export interface ZwiftEventSubgroupSchema {
  _id?: Types.ObjectId;
  bikeHash: number | null;
  description: string;
  eventSubgroupStart: string;
  id: number;
  jerseyHash: number;
  label: number;
  laps: number;
  distanceInMeters: number;
  durationInSeconds: number;
  distanceSummary?: {
    distanceInKilometers: number | null;
    elevationGainInMeters: number | null;
  };
  zwiftInsiderUrl?: string;
  mapId: number;
  name: string;
  routeId: number;
  rulesSet: string[];
  subgroupLabel: string;
  startLocation?: number;
  tags: string[];
  timeTrialOptions: null;
  totalEntrantCount: number;
  totalJoinedCount: number;
  totalSignedUpCount: number;
  invitedLeaders: number[];
  invitedSweepers: number[];
}
//
//
export interface ProfileDataInResult {
  firstName: string;
  lastName: string;
  gender: string;
  weightInGrams: number;
  heightInCentimeters: number;
  imageSrc: string | null;
  countryAlpha3: string;
  age: number;
}
//
//
export interface ZwiftResultSchema {
  _id: Types.ObjectId;
  zwiftEventId: Types.ObjectId;
  subgroupId: Types.ObjectId; // зачем?
  profileId: number;

  profileData: ProfileDataInResult;

  eventSubgroupId: number;
  subgroupLabel: string;
  rank: number;
  rankEvent: number;
  eventId: number;

  activityData: {
    activityId: string;
    sport: string;
    durationInMilliseconds: number;
    segmentDistanceInMeters: number;
  };

  sensorData: {
    heartRateData: { avgHeartRate: number };
    avgWatts: number;
    powerType: string;
    pairedSteeringDevice: boolean;
  };
  wattsPerKg: number;
  speed?: number;
  normalizedPower?: number;
  variabilityIndex?: number;
  flaggedCheating: boolean;
  flaggedSandbagging: boolean;
  // свойства из предыдущей модели
  penalty: { fairPlay: number };
  isDisqualification: boolean;
  disqualification: string | null;
  disqualificationDescription: string | null;
  isDidNotFinish: boolean;
  category: string;
  categoryCurrent: string;
  teamCurrent: string;
  pointsStage: number;
  isUnderChecking: boolean;
  addedManually: boolean;
  cpBestEfforts: {
    watts: number;
    wattsKg: number;
    cpLabel: string;
    duration: number;
  }[];

  profileDataMain?: ProfileDataInResultWithId;
}
//
//
export interface SignedRidersSchema {
  subgroup: Types.ObjectId;
  id: number;
  firstName: string;
  lastName: string;
  male: boolean;
  countryAlpha3: string;
  countryCode: number;
  imageSrc: string;
  age: number;
  height: number;
  weight: number;
  subgroupLabel: string;
}
//
//
export interface TokenSchema {
  token: string;
  username: string;
  importance: string;
}

//
//
export interface LogsErrorSchema {
  timestamp: number; // время создания ошибки
  type?: string; // тип ошибки
  responseData?: string; // ответ при ошибки Axios
  message: string; // краткое описание
  stack?: string; // стэк ошибки
  config?: unknown; // конфигурация при Axios ошибке
}

/**
 * Схема клуба в котором создается Эвент
 */
export type ClubSchema = TClubZwift;

export type TClubZwift = {
  id: string; // id клуба в Звифте
  images: {
    icon: string; // ссылка (url) на иконку клуба
    event: string; // ссылка (url) на постер к создаваемому Эвенту
    club_large: string; // ссылка (url) на постер клуба
  };
  organizer: Types.ObjectId; // id организатора заездов
  name: string; // название клуба;
  tagline: string; // полное название клуба;
  description: string; // описание клуба;
  moderators?: Types.ObjectId[]; // модераторы клуба;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Организатора заезда, у организатора может быть несколько клубов
 */
export type TOrganizer = {
  isPublished: boolean; // Флаг активности организатора, отображать или нет его в списке.
  creator: Types.ObjectId; // модераторы клуба;
  botZwift: TOrganizerBotZwift; // Бот, модерирующий в клубе Звифта.
  name: string; // название организатора;
  label: string; // Лейбл короткое название;
  shortName: string; // Короткое название;
  urlSlug: string;
  logoSrc?: string; // Логотип (url);
  posterSrc?: string; // URL фоновой картинки
  logoFileInfo?: TFileMetadataForCloud;
  posterFileInfo?: TFileMetadataForCloud;
  description?: string; // описание Организатора;
  clubMain?: string; // id клуба организатора в Zwift.
  telegram?: TTelegram;
  website?: string; // Ссылка на сайт организатора.
  contact?: {
    email?: string;
    phone?: string;
  };
  country?: string; // Страна организатора. RU, BY, KZ и т.д.
  socialLinks?: TSocialLinks;
  createdAt: string;
  updatedAt: string;
};
export type TTelegram = {
  group?: string; // Только id.
  channel?: string; // Только id.
};
export type TSocialLinks = {
  vk?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
};
export type TFileMetadataForCloud = {
  baseName: string; // Базовое имя файла без .
  originalExtension: string; // Исходное расширение файла (например, jpg, png).
  optimizedExtension: string; // Расширение для оптимизированных файлов (например, webp).
  availableSizes: ('original' | 'large' | 'medium' | 'small')[];
};

// !!! Оптимизировать, использовать везде TOrganizer
export type OrganizerSchema = TOrganizer & Document;
/**
 * Данные бота-модератора из звифта. Бот будет вносить изменения в Эвенты клуба.
 * Хранить email/password или token.
 */
export type TOrganizerBotZwift =
  | { token: string; email?: never; password?: never } // token обязателен, email и password не должны быть заданы
  | { token?: never; email: string; password: string }; // email и password обязаны быть заданы, token не может быть

/**
 * Описание типа для метрик спортсмена.
 */
export type TMetrics = {
  racingScore: number; // Очки в гонках.
  weightInGrams: number; // Вес в кг.
  heightInCentimeters: number; // Рост в см.
};

/**
 * Описание типа для документа MongoDB, представляющего метрики на определенную дату.
 */
export type TRiderDailyMetric = {
  _id: mongoose.Types.ObjectId;
  zwiftId: number; // Идентификатор райдера в Zwift.
  date: Date; // Дата записи метрик
  metrics: TMetrics;
};

/**
 * Описание типа для документа MongoDB, представляющего метрики на определенную дату.
 */

export type TRiderBannedSchema = Document & TRiderBanned;
export type TRiderBanned = {
  zwiftId: number; // Идентификатор райдера в Zwift.
  bannedReason: {
    code: TBanCode;
    description: string;
  };
  adminId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
// Извлечение всех значений `code`:
const banCodes = bans.map((ban) => ban.code);
// Создание типа для `code`:
export type TBanCode = (typeof banCodes)[number];

/**
 * Данные Организатора основные и модерируемые клубы для клиента.
 */
export type TOrganizerMainDto = {
  organizer: Omit<TOrganizer, '_id' | 'createdAt' | 'updatedAt' | 'botZwift' | 'creator'> & {
    organizerId: string;
  };
  clubs: { name: string; id: string }[];
};
