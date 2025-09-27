import { Schema, Types } from 'mongoose';
import {
  CriticalPower,
  LogsAdminSchema,
  ProfileDataInResult,
  SignedRidersSchema,
  TClubZwift,
  TDeviceInfo,
  TFileMetadataForCloud,
  TGap,
  TLocationInfo,
  TMetrics,
  TOrganizer,
  TSeries,
  TSeriesClassification,
  TSeriesStage,
  TStageResult,
  TTeam,
  ZwiftEventSchema,
  ZwiftEventSubgroupSchema,
  ZwiftResultSchema,
} from './model.interface.js';
import { ResultEvent } from './zwiftAPI/resultsFromZwift.interface.js';
import { ProfileZwiftAPI } from './zwiftAPI/profileFromZwift.interface.js';
import { PutResult } from './http.interface.js';
import { EventSubgroupFromZwiftAPI } from './zwiftAPI/eventsDataFromZwift.interface.js';
import { TStagesPublicResponseDB } from './mongodb-response.types.js';
import { TStagesPublicDto } from './dto.interface.js';
import {
  TEntityNameForSlot,
  TSlotOrigin,
  TSubscriptionPeriodSlot,
} from './site-service.type.js';
import { TCurrency, TPurchaseMetadata, TPurchaseUnit } from './payment.types.js';

interface ZwiftEventWithSubgroup extends Omit<ZwiftEventSchema, 'eventSubgroups'> {
  eventSubgroups: ZwiftEventSubgroupSchema[];
}
/**
 * Результаты Эвента с параметрами Эвента в каждом результате
 */
export interface ResultWithEvent extends Omit<ZwiftResultSchema, 'zwiftEventId'> {
  zwiftEventId: ZwiftEventWithSubgroup;
}
/**
 * Результаты Эвента с параметрами Эвента в каждом результате и с подгруппой
 */
export interface ResultWithEventAndSubgroup extends Omit<ResultWithEvent, 'subgroupId'> {
  subgroupId: ZwiftEventSubgroupSchema;
  gaps?: { id: number; subgroupLabel: string; gap: number }[];
}
/**
 * Результаты Эвента с параметрами Эвента в каждом результате и с подгруппой только нужные свойства
 */
type PickedPropertyResultSeries =
  | 'eventId'
  | 'subgroupId'
  | 'subgroupLabel'
  | 'profileId'
  | 'profileData'
  | 'profileDataMain';

export interface ResultSeries
  extends Pick<ResultWithEventAndSubgroup, PickedPropertyResultSeries> {
  durationInMilliseconds: number;
  eventSubgroup: ZwiftEventSubgroupSchema;
  eventStart: number;
  totalFinishedCount?: number;
  gaps?: { id: number; subgroupLabel: string; gap: number }[];
  speed?: number;
}
/**
 * Изменение структуры ZwiftResult, изменение нескольких свойств с типа Number на Object
 */
interface Additional {
  value: number;
  addition: string;
}
export interface UserResult
  extends Omit<
    ZwiftResultSchema,
    'activityData' | 'profileData' | 'sensorData' | 'wattsPerKg' | 'cpBestEfforts'
  > {
  activityData: {
    activityId: string;
    sport: string;
    durationInMilliseconds: Additional;
  };
  profileData: {
    firstName: string;
    lastName: string;
    gender: string;
    weightInGrams: Additional;
    heightInCentimeters: Additional;
    imageSrc: string | null;
    countryAlpha3: string;
    age: number;
    racingScore?: number;
  };
  sensorData: {
    heartRateData: { avgHeartRate: Additional };
    avgWatts: Additional;
    powerType: string;
  };
  wattsPerKg: Additional;
  cpBestEfforts: CpBestEffortsAdditional[];

  eventName?: string;
  eventStart?: number;
  gap?: number;
  gapPrev?: number;
}

//
//
export interface Profile {
  zwiftId: number;
  ftp: number | null;
  imageSrc: string | null;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  countryAlpha3: string;
  male: boolean;
  zCategory?: string;
  zCategoryWomen?: string;
  category?: 'E' | 'APlus' | 'A' | 'B' | 'C' | 'D';
  bio?: string;
  racingScore: number;
  team?: { name: string; shortName: string; urlSlug: string };
}

export interface LoggingAdminArg {
  eventId: number;
  eventName: string;
  eventStart: string;
  userId: string;
  description: string;
}
/**
 * Замена в свойстве eventSubgroups ссылки ObjectId на параметры подгрупп
 */
export interface EventWithSubgroup extends Omit<ZwiftEventSchema, 'eventSubgroups'> {
  eventSubgroups: ZwiftEventSubgroupSchema[];
  results?: UserResult[];
}
/**
 * Данные Event с подгруппами и параметрами Series
 */
export type EventWithSubgroupAndSeries = Omit<EventWithSubgroup, 'seriesId'> & {
  seriesId: Pick<TSeries, '_id' | 'logoFileInfo' | 'name' | 'urlSlug'>;
  organizerId: {
    logoFileInfo?: TFileMetadataForCloud;
    _id: Types.ObjectId;
    name: string;
    shortName: string;
  };
};
/**
 * Логи по запросам админов(модераторов)
 */
export interface LogsAdminUsername extends Omit<LogsAdminSchema, 'userId'> {
  userId: { username: string };
}

/**
 * Кривая мощности (за последние 90 дней с дополнительными свойствами
 */
export interface CpBestEffortsAdditional {
  watts: Additional;
  wattsKg: Additional;
  cpLabel: string;
  duration: number;
}
/**
 * Зарегистрированные райдеры с мощностью (cpBestEfforts) за последние 90 дней
 */
export interface SignedRidersPowerCurves extends SignedRidersSchema {
  cpBestEfforts?: CpBestEffortsAdditional[];
  racingScore?: number;
}
export type TSignedRidersWithTeam = Omit<SignedRidersSchema, 'team'> & {
  team: TTeamForProfile;
};
/**
 * Данные Event с зарегистрированными райдерами
 */
export type EventWithSignedRiders = Omit<EventWithSubgroup, 'seriesId'> & {
  seriesId: { _id: Types.ObjectId; name: string; urlSlug: string };
  signedRiders: (SignedRidersPowerCurves & {
    team?: TTeamForProfile;
  })[];
};
/**
 * Параметры для функции eventsListDto
 */
export interface EventsListDtoArg {
  events: EventWithSubgroupAndSeries[];
  quantityPages?: number;
  message: string;
}
/**
 * Дополнительные параметры Event к стандартным из API Zwift
 */
export interface AdditionalParamsEvent {
  seriesId: Types.ObjectId | null;
  organizer: string;
  typeRaceCustom: string;
  creator: string | Types.ObjectId;
  hasResults: boolean;
  needCount: boolean;
  started: boolean;
  clubName: string;
}
/**
 * Аргументы функции получение результатов заезда из Звифта
 */
export interface GetResultsArg {
  subgroupObj: {
    subgroup_id?: Types.ObjectId;
    subgroupId: number;
  };
  subgroupLabel: string;
  token: string | null;
}
/**
 * Результат райдера в Event с дополнительными параметрами
 */
export interface ResultEventAdditional extends Omit<ResultEvent, 'profileData'> {
  subgroupLabel?: string;
  subgroupId?: Types.ObjectId;
  cpBestEfforts?: CpBestEfforts[];
  profileData: {
    firstName: string;
    gender: string;
    heightInCentimeters: number;
    imageSrc: string;
    lastName: string;
    playerType?: string;
    weightInGrams: number;
    age?: number;
    countryAlpha3?: string;
    team?: TTeamForProfile;
  };
  speed?: number;
  wattsPerKg?: number;
  isDisqualification: boolean;
  disqualification: string | null;
  disqualificationDescription: string | null;
  rankEvent?: number;
  profileDataMain?: ProfileDataInResultWithId;
  errorAccess?: boolean; // 403 ошибка при запросе с ZwiftAPI
  normalizedPower?: number;
  variabilityIndex?: number;
}

/**
 * Данные о команде для профиля райдера.
 */
export type TTeamForProfile = Pick<TTeam, 'name' | 'shortName' | 'urlSlug'>;

export interface CpBestEfforts {
  watts: null | number;
  wattsKg: null | number;
  cpLabel: string;
  duration: number;
}

export type TRiderData = Pick<
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
>;

export type TRiderDataForStatistics = Pick<
  TRiderData,
  'firstName' | 'lastName' | 'countryAlpha3' | 'imageSrc'
> & { gender: string };

/**
 * Результат райдера который не финишировал в Event-е
 */
export interface ResultEventDNF {
  activityData: {
    activityId: string;
    calories: number;
    durationInMilliseconds: number;
    elevationInMeters: number;
    segmentDistanceInMeters: number;
  };
  eventId: number;
  eventSubgroupId: number;
  profileData: {
    firstName: string;
    gender: string;
    heightInCentimeters: number;
    lastName: string;
    weightInGrams: number;
  };
  profileId: number;
  sensorData: {
    avgWatts: number;
    heartRateData: {
      avgHeartRate: number;
      heartRateMonitor: boolean;
    };
  };
  subgroupLabel: string;
  speed: number;
  isDisqualification: boolean;
  disqualification: string | null;
  disqualificationDescription: string | null;
  rank: number;
}

/**
 * Результаты райдеров в Event с дополнительными параметрами
 */
export interface ResultsEventAdditional {
  entries: ResultEventAdditional[];
}
/**
 * Параметры для функции eventResultsDto
 */
export interface EventResultsDtoArg {
  event: EventWithSubgroup;
  message: string;
}
/**
 * Параметры для функции ResultsSeriesDto
 */
export interface ResultsSeriesDtoArg {
  results: ResultSeries[];
  resultsSummary?: {
    id: number;
    groupCategory: string;
    winsTotal: number;
  }[];
  leaderboardCatchup: TLeaderboardsCatchupDto[] | null;
}
/**
 * Сокращенные данные активности с ленты активности райдера
 */
export interface ActivityFeedShort {
  id: string;
  date: number;
  name: string;
  eventId: number | null;
  activityId: string;
}
/**
 * Параметры для функции getIntervals
 */
export interface GetIntervalsArg {
  powerInWatts: number[];
  weightInKilogram: number;
  interval: number;
}
/**
 * Параметры для функции handlerProtocol
 */
export interface HandlerProtocolArg {
  eventId: Types.ObjectId;
  results: ResultEventAdditional[];
  typeRaceCustom: string;
}
/**
 * Параметры для функции saveDocument
 */
export interface SaveDocumentArg {
  eventId: Types.ObjectId;
  result: ResultEventAdditional;
  rankEvent?: number;
}
/**
 * Параметры для функции handlerProtocolCurrent
 */
export interface HandlerProtocolCurrentArg extends Omit<HandlerProtocolArg, 'typeRaceCustom'> {}
/**
 * Получение данных по Эвентам Серии за выбранный сезон с ДБ
 */
export interface GetCurrentEventsSeries {
  _id: Types.ObjectId;
}
/**
 * Данные по Эвентам Серии за выбранный сезон с ДБ с гэпами
 */
export interface CurrentEventsSeriesGap extends Omit<GetCurrentEventsSeries, 'eventSubgroups'> {
  eventSubgroupsWithGaps: {
    id: number;
    subgroupLabel: string;
    gap: number;
  }[];
}
/**
 * Power из fitfiles
 */
export interface PowerFitFiles {
  name: string; // Название активности.
  eventId: number | null; // id Эвента, если заезд был в организованном Эвенте, а не на тренеровке
  date: number;
  powerInWatts: string; // Массив мощностей, записанных с интервалом 1 секунда. Сохранен в строчном формате.
  weightInGrams: number; // Вес райдера.
}
/**
 * Аргументы для функции updatePowerCurveRider
 */
export interface UpdatePowerCurveRiderArg {
  zwiftId: number;
  cpWattsUpdated: CriticalPower[];
  cpWattsPerKgUpdated: CriticalPower[];
}

/**
 * Данные для графика количества участвующих райдеров в заездах
 */
export interface StatisticsRidersInEvent {
  id: number;
  eventStart: number;
  organizer: string;
  typeRaceCustom: string; // тип заезда. Влияет на распределение мест и подсчет очков в итоговом протоколе
  riders: {
    male: number; // количество финишировавших мужчин
    female: number; // количество финишировавших женщин
  };
}

/**
 * райдер (zwiftId) с максимальными ваттами (watts) на интервале (interval)
 */
export interface RiderMaxWatt {
  zwiftId: number;
  interval: number;
  watts: number;
  eventStart: number;
  eventName: string;
  profileData: TRiderDataForStatistics | null;
}

/**
 * райдер (zwiftId) с максимальными удельными ваттами (watts) на интервале (interval)
 */
export interface RiderMaxWattsPerKg extends Omit<RiderMaxWatt, 'watts'> {
  wattsPerKg: number;
}

/**
 * Данные райдера с сервера ZwiftAPI, только необходимые параметры
 */
export interface ZwiftProfileShort
  extends Pick<
    ProfileZwiftAPI,
    'id' | 'firstName' | 'lastName' | 'male' | 'imageSrc' | 'countryAlpha3'
  > {}

/**
 * Данные райдера с сервера ZwiftAPI, которые добавлены в профиль пользователя User
 */
export interface ZwiftRidersShort {
  zwiftProfileMain: ZwiftProfileShort;
  zwiftProfilesAdditional: ZwiftProfileShort[];
}

/**
 * Данные Основного профиля райдера с сервера ZwiftAPI,
 * которые добавляются в результат Дополнительного профиля райдера
 */
export interface ProfileDataInResultWithId extends ProfileDataInResult {
  profileIdMain: number;
}

/**
 * Данные Основного профиля райдера с сервера ZwiftAPI,
 
 */
export interface UsersWithAdditionalProfiles {
  zwiftId: number;
  zwiftIdAdditional: number[];
}

/**
 * Данные PowerCurve определенного интервала для нахождения Лидеров мощности
 */
export interface PowerCurvesCurrentInterval {
  zwiftId: number;
  pointsWatts: CriticalPower;
}

/**
 * Данные PowerCurve определенного интервала для нахождения Лидеров мощности WattsPerKg
 */
export interface PowerPerKgCurvesCurrentInterval {
  zwiftId: number;
  pointsWattsPerKg: CriticalPower;
}

/**
 * Распределение райдеров по ФТП
 */
export interface TotalRidersFTP {
  ftp: number;
  quantityMale: number;
  quantityFemale: number;
}

/**
 * Параметры сервиса для изменения результата Райдера в Эвенте
 */
export interface PutResultParams extends PutResult {
  moderatorId: string;
}

/**
 * Сохранение данных мощности из заезда в FitFile в БД
 */
export interface FitFileToDBParams {
  powerInWatts: number[];
  result: ResultEventAdditional;
  nameAndDate: {
    name: string;
    eventId: number;
    eventStart: number;
  };
}
/**
 * Распределение райдеров по возрастным категориям
 */
export interface AgeCategories {
  label: string;
  value: number;
}
/**
 * Добавление в subgroupFromZwiftAPI дополнительного свойства distanceSummary
 */
export interface EventSubgroupFromZwiftAPIAdditional extends EventSubgroupFromZwiftAPI {
  distanceSummary?: {
    distanceInKilometers: number | null;
    elevationGainInMeters: number | null;
  };
}
/**
 * Преобразование названий сезонов
 */
export interface SeasonsSeries {
  [key: string]: string;
}
/**
 * Сводные данные результатов Догонялок за сезон
 */
export interface ResultSummaryCatchup {
  id: number;
  groupCategory: string;
  winsTotal: number;
}
/**
 * Формирование метатегов для index.html
 */
export interface MetaTags {
  title: string;
  canonical: string;
  description: string;
  image: string | null;
  recommendationsTag: string;
}

/**
 * Данные получаемые из фитфайла активности райдера с последующей выборкой только значений
 * powerInWatts и distanceInCm
 */
export interface FitDataFromZwift {
  zwiftId: number;
  powerInWatts: number[];
  distanceInCm: number[];
}

/**
 * Добавление (обновление) данных Звифт-профайла райдеров
 */
export interface RiderProfileRanks {
  totalEvents: number;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

/**
 * Возвращение документов для текущей страницы пагинации
 */
export interface DocsAfterPagination<T> {
  currentDocs: Array<T>;
  currentPage: number;
  quantityPages: number;
}

/**
 * Данные из query параметров url
 */
export interface IRidersQuery {
  page?: number;
  docsOnPage?: number;
  search?: string;
  columnName?: string;
  isRasing?: boolean;
  category?: 'All' | 'A' | 'B' | 'C' | 'D' | 'E';
  male?: 'true' | 'false';
}

/**
 * Данные распределения количества райдера по диапазонам рейтинговых очков.
 */
export type TRidersRacingScore = {
  scoreRange: number;
  value: number;
};

/**
 * Данные распределения количества райдера по диапазонам рейтинговых очков для женщин и мужчин на всём диапазоне.
 */
export type TRidersRacingScores = {
  maleRacingScore: TRidersRacingScore[];
  femaleRacingScore: TRidersRacingScore[];
};

/**
 * Метрики райдера.
 */
export type TMetricsMap = Map<number, TMetrics>;

/**
 * Ответ с сервиса получения включенных трансляций пользователей.
 */
export type TResponseEnabledUserStream = {
  _id: string;
  zwiftData:
    | {
        id: number;
        firstName: string;
        lastName: string;
        category: string;
        racingScore: string;
        imageSrc: string;
        countryAlpha3: string;
        male: boolean;
      }
    | undefined;
  twitch: TResponseStreamDto | null;
  youtube: TResponseStreamDto | null;
};

/**
 * Параметры для отправки email.
 */
export type TMailServiceParams = {
  letter: string; // Текст письма (html).
  subject: string; // Тема письма.
  email: string; // Email куда отправляется письмо.
  auth: {
    user: string; // email отправителя.
    pass: string; // Пароль от email отправителя.
  };
};

/**
 * Twitch stream после Dto.
 */
export type TTwitchStreamDto = {
  id: string;
  userId: string;
  userLogin: string;
  userName: string;
  gameId: string;
  gameName: string;
  type: string;
  title: string;
  tags: string[];
  viewerCount: number;
  startedAt: Date;
  language: string;
  thumbnailUrl: string;
  tagIds: unknown[];
  isMature: boolean;
};

/**
 * Twitch user после Dto.
 */
export type TTwitchUserDto = {
  id: string;
  login: string;
  displayName: string;
  type: string;
  broadcasterType: string;
  description: string;
  profileImageUrl: string;
  offlineImageUrl: string;
  viewCount: number;
  createdAt: Date;
};

/**
 * Ответ с Youtube с данными о трансляции и канале после Dto.
 */
export type TResponseStreamDto = {
  online: boolean;
  title: string | null; // Название трансляции.
  thumbnailUrl: string | null; // Эскиз трансляции (стоп кадр).
  viewerCount: number | null; // Количество зрителей.
  startedAt: string | null; // Дата старта трансляции.
  videoIdYoutube?: string; // Id трансляции (видео) в youtube.
  channel: {
    title: string; // Имя канала (Ручка).
    bannerUrl?: string; // Баннер канала.
    description?: string; // Описание канала.
    handleYoutube?: string; // Название ручки в youtube.
    nameTwitch?: string; // Название канала в twitch.
  };
};

export type TCategory = 'A' | 'B' | 'C' | 'D' | 'E';
export type TCategorySeries =
  | 'APlus'
  | 'A'
  | 'BPlus'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'WA'
  | 'WB'
  | 'WC'
  | 'WD';
/**
 * Лидеры по победам в каждой группе в Догонялках.
 */
export type TLeaderboardsCatchupDto = {
  category: TCategory;
  leaders: TCatchupLeader[]; // Три лидера в каждой категории.
};
export type TCatchupLeader = {
  zwiftId: number;
  profileData: ProfileDataInResult; // Данные райдера.
  wins: number; // Количество побед.
};

export type TCatchupLeaderMap = Map<number, { profileData: ProfileDataInResult; wins: number }>;

/**
 * Информация об звифт токене бота-модератора для клиента.
 */
export type TZwiftTokenDto = {
  _id: string; // _id токена в БД.
  organizerId: string; // ID организатора в виде строки.
  tokenDecoded: {
    expiresAt: string; // Время истечения токена в формате ISO.
    issuedAt: string; // Время выпуска токена в формате ISO.
    audience: string[]; // Целевые сервисы токена.
    userId: string; // Уникальный ID пользователя.
    name: string; // Имя пользователя.
    email: string; // Электронная почта пользователя.
  } | null; // Может быть null, если декодирование не удалось.
  username: string; // Имя пользователя (email бота).
  importance: 'main' | 'secondary'; // Важность токена.
};

/**
 * Ответ с БД при запросе клубов Звифта для организатора.
 */
export type TResponseClubsFromDB = Omit<TClubZwift, 'organizer' | 'moderators'> & {
  moderators: {
    _id: Types.ObjectId;
    username: string;
    zwiftId: number;
  }[];
  organizer: { name: string };
};

/**
 * Клубы звифта для организатора после ДТО.
 */
export type TClubsZwiftDto = Omit<TClubZwift, '_id' | 'organizer' | 'moderators'> & {
  _id: string;
  organizer: { name: string };
  moderators: { _id: string; username: string; zwiftId: number }[];
};

/**
 * Параметры для конфигурации get запросов на ZwiftAPI.
 */
export type ParamsGetRequestToZwift = Omit<ParamsRequestToZwift<unknown>, 'data'>;

/**
 * Параметры для конфигурации запросов на ZwiftAPI.
 */
export type ParamsRequestToZwift<T> = {
  url: string;
  isMainToken?: boolean;
  tokenOrganizer?: string | null; // Если нет токена Организатора, то выполняются запросы через тонен бота Race-Info.
  data: T; // данные для post,put,delete запросов.
};

/**
 * Тип возвращаемых данных сервиса ответа получение Организаторов у которых пользователь userId является модератором.
 */
export type ResponseOrganizerForModerator = { _id: string; name: string };

/**
 * Тип сервиса для авторизации
 */
export type TAuthService = 'vk' | 'credential' | 'yandex';

/**
 * Входные параметры функции сохранения токенов доступа, создания токена авторизации.
 */
export type TParamsSaveAuthToken = {
  userId: Types.ObjectId;
  authService: TAuthService;
  tokens: { accessToken: string; refreshToken: string };
  device: TDeviceInfo;
  location?: TLocationInfo;
};

/**
 * Данные по включенным платформам трансляций у Пользователя.
 */
export type StreamEnabled = { platform: string; url: string };

/**
 * Данные организатора
 */
export type TOrganizerPublicDto = Omit<
  TOrganizer,
  'isPublished' | 'creator' | 'botZwift' | 'contact' | 'createdAt' | 'updatedAt' | 'clubMain'
> & { id: string; clubMain?: string };

/**
 * Сохранение файла в облаке.
 */
export type TSaveFileToCloud = {
  file: File;
  type: 'image' | 'GPX' | 'pdf';
  suffix: string;
  needOptimizedImages?: boolean;
};

export type entityForFileSuffix = 'team' | 'organizer' | 'series';

/**
 * Url файлов изображений logo, poster для сущности Организатор.
 */
export type TOrganizerImageUrls = { logoSrc: string[] | null; posterSrc: string[] | null };

/**
 * Данные по всем маршрутом в Звифте.
 */
export type TRoute = {
  id: number;
  name: string;
  world: string;
  [key: string]: unknown; // Разрешает любые другие свойства
};

/**
 * Описание структуры данных, возвращаемых сервисом.
 */
export type TNextWeekRace = {
  distanceInMeters: number;
  distanceSummary: { distanceInKilometers: number; elevationGainInMeters: number };
  durationInSeconds: number;
  eventStart: string;
  eventType?: string;
  eventVisibility?: string;
  joinClubUrl: string;
  laps: number;
  organizerName: string;
  registrationUrl: string;
  routeName?: string;
  worldName?: string;
};

/**
 * Входные параметры для метода post класса FinishProtocol.
 */
export type TFinishProtocolParamsPost = {
  organizer: string;
  name: string;
  displayName: string;
  description: string;
  isDefault: boolean;
};
export type TFinishProtocolParamsPut = TFinishProtocolParamsPost & { configFPId: string };

/**
 * Тип данных параметров приватного метода SeriesService.addStage.
 */
export type TParamsSeriesServiceAddStage = {
  seriesId: string;
  stages: TSeriesStage[];
  stage: Omit<TSeriesStage, 'event'> & {
    event: string;
  };
};

/**
 * Тип данных параметров метода HandlerSeries.getProtocolsStageFromZwift.
 */
export type TGetProtocolsStageFromZwiftParams = {
  stageOrder: number;
  stages: Schema.Types.ObjectId[];
};

/**
 * Тип данных параметров метода HandlerSeries.setCategories.
 */
export type TSetCategoriesStageParams = {
  stageOrder: number;
  stageResults: TStageResult[];
};

/**
 * Тип данных параметров метода PublicSeriesService.getStages
 */
export type TPublicSeriesServiceGetStagesParams = {
  urlSlug: string;
  status: TEventStatus;
};

export type TEventStatus = 'all' | 'upcoming' | 'finished' | 'ongoing';

/**
 * Тип данных параметров метода PublicSeriesService.filterStages
 */
export type TPublicSeriesServiceFilterStagesParams = {
  stages: TStagesPublicResponseDB['stages'];
  status: TEventStatus;
};
/**
 * Тип данных параметров метода PublicSeriesService.sortStages
 */
export type TPublicSeriesServiceSortStagesParams = {
  stages: TStagesPublicDto[];
  status: TEventStatus;
};

/**
 * Тип генеральной классификации серии при её создании.
 */
export type TGCForSave = Omit<TSeriesClassification, 'seriesId' | 'createdAt' | 'updatedAt'> & {
  seriesId: string;
};

/**
 * Тип адаптера для универсальной работы с разными типами результатов.
 * Позволяет абстрагироваться от конкретной структуры данных.
 */
export type TFinishGapsGetters<T> = {
  getDuration: (result: T) => number; // Функция получения продолжительности (в мс) из результата.
  getCategory: (result: T) => TCategorySeries | null; // Функция получения категории результата.
  setGaps: (result: T, gaps: { category: TGap | null; absolute: TGap | null }) => void; // Функция записи рассчитанных гэпов обратно в результат.
};

/**
 * Тип для списока всех и обязательных этапов для расчета генеральной классификации.
 */
export type TAllStageOrders = {
  requiredStageOrders: number[]; // Номера обязательных этапов для ГС.
  allStageOrders: number[]; // Все номера этапов в Серии заездов.
};

export type TManageServiceSlotsParams = {
  origin: TSlotOrigin;
  user: Types.ObjectId | string;
  metadata: TPurchaseMetadata;
  amount: {
    value: number;
    currency: TCurrency;
  };
  description: string;
};
export type THandlePeriodUnitParams = Omit<TManageServiceSlotsParams, 'metadata'> & {
  metadata: {
    quantity: number;
    entityName: TEntityNameForSlot;
    unit: Exclude<TPurchaseUnit, 'piece'>;
  };
};

export type TSubscriptionPeriodSlotWithEntity = TSubscriptionPeriodSlot & {
  expired: boolean;
  entityName: TEntityNameForSlot;
  id: number;
};

/**
 * Тарифный план на сервис сайта.
 */
export type TPricingPlan = {
  id: string; // id тарифного плана.
  amount: {
    value: number; // Числовое значение цены.
    currency: TCurrency; // Валюта (например, "RUB", "USD").
  };
  item: {
    quantity: number;
    unit: TPurchaseUnit;
  };
};

export type TAudioType = 'notification' | 'warning' | 'chat';
