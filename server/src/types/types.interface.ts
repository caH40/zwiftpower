import { Types } from 'mongoose';
import {
  CriticalPower,
  LogsAdminSchema,
  ProfileDataInResult,
  SeriesSchema,
  SignedRidersSchema,
  TMetrics,
  ZwiftEventSchema,
  ZwiftEventSubgroupSchema,
  ZwiftResultSchema,
} from './model.interface.js';
import { ResultEvent } from './zwiftAPI/resultsFromZwift.interface.js';
import { ProfileZwiftAPI } from './zwiftAPI/profileFromZwift.interface.js';
import { PutResult } from './http.interface.js';
import { EventSubgroupFromZwiftAPI } from './zwiftAPI/eventsDataFromZwift.interface.js';

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
export interface EventWithSubgroupAndSeries extends Omit<EventWithSubgroup, 'seriesId'> {
  seriesId: SeriesSchema;
}
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
/**
 * Данные Event с зарегистрированными райдерами
 */
export interface EventWithSignedRiders extends EventWithSubgroup {
  signedRiders: SignedRidersPowerCurves[];
}
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
