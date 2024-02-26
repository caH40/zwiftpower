import { Types } from 'mongoose';
import {
  LogsAdminSchema,
  ProfileDataInResult,
  SeriesSchema,
  SignedRidersSchema,
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
  activityId?: string;
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
 * Данные по Critical power
 */
export interface CriticalPower {
  isVirtualPower: boolean;
  duration: number;
  value: number;
  date: number;
  name: string;
  isDisqualification: boolean;
}
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
  name: string;
  eventId: number | null; // id Эвента, если заезд был в организованном Эвенте, а не на тренеровке
  date: number;
  powerInWatts: string;
  weightInGrams: number;
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
  id: number;
  zwiftId: number;
  interval: number;
  watts: number;
  eventStart: number;
  eventName: string;
  profileData?: {
    firstName: string;
    gender: string;
    heightInCentimeters: number;
    imageSrc: string;
    lastName: string;
    playerType: string;
    weightInGrams: number;
  };
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
  pointsWatts: {
    isVirtualPower: boolean;
    duration: number;
    value: number;
    date: number;
    name: string;
    isDisqualification: boolean; // при DSQ не учитывается в Лидерах мощности
  };
}

/**
 * Данные PowerCurve определенного интервала для нахождения Лидеров мощности WattsPerKg
 */
export interface PowerPerKgCurvesCurrentInterval {
  zwiftId: number;
  pointsWattsPerKg: {
    isVirtualPower: boolean;
    duration: number;
    value: number;
    date: number;
    name: string;
    isDisqualification: boolean; // при DSQ не учитывается в Лидерах мощности
  };
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
  userId: string;
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
  image: string;
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
