import { Types } from 'mongoose';
import {
  LogsAdminSchema,
  PowerCurveSchema,
  SeriesSchema,
  SignedRidersSchema,
  ZwiftEventSchema,
  ZwiftEventSubgroupSchema,
  ZwiftResultSchema,
} from './model.interface.js';
import { ResultEvent } from './zwiftAPI/resultsFromZwift.interface.js';

/**
 * Результаты Эвента с параметрами Эвента в каждом результате
 */
export interface ResultWithEvent extends Omit<ZwiftResultSchema, 'zwiftEventId'> {
  zwiftEventId: ZwiftEventSchema;
}
/**
 * Результаты Эвента с параметрами Эвента в каждом результате и с подгруппой
 */
export interface ResultWithEventAndSubgroup extends Omit<ResultWithEvent, 'subgroupId'> {
  subgroupId: ZwiftEventSubgroupSchema;
}
/**
 * Результаты Эвента с параметрами Эвента в каждом результате и с подгруппой только нужные свойства
 */
type PickedPropertyResultSeries =
  | 'eventId'
  | 'subgroupId'
  | 'subgroupLabel'
  | 'profileId'
  | 'profileData';

export interface ResultSeries
  extends Pick<ResultWithEventAndSubgroup, PickedPropertyResultSeries> {
  durationInMilliseconds: number;
  eventSubgroup: ZwiftEventSubgroupSchema;
  eventStart: number;
  totalFinishedCount?: number;
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
    imageSrc: string;
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
}
//
//
export interface GetProfileArg {
  zwiftId: string;
  powerCurve: PowerCurveSchema | null;
  resultLast: UserResult;
}
//
//
export interface Profile {
  ftp: number | null;
  imageSrc: string | null;
  firstName: string;
  lastName: string;
  age: number;
  weightInGrams: number;
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
  cpBestEfforts?: {
    watts: null | number;
    wattsKg: null | number;
    cpLabel: string;
    duration: number;
  }[];
  profileData: {
    firstName: string;
    gender: string;
    heightInCentimeters: number;
    imageSrc: string;
    lastName: string;
    playerType: string;
    weightInGrams: number;
    age?: number;
    countryAlpha3?: string;
  };
  wattsPerKg?: number;
  disqualification?: string;
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
  resultsSummary: {
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
  rankEvent: number;
}
/**
 * Параметры для функции handlerProtocolCurrent
 */
export interface HandlerProtocolCurrentArg extends Omit<HandlerProtocolArg, 'typeRaceCustom'> {}
/**
 * Данные по Critical power
 */
export interface CriticalPower {
  duration: number;
  value: number;
  date: number;
  name: string;
}
/**
 * Получение данных по Эвентам Серии за выбранный сезон с ДБ
 */
export interface getCurrentEventsSeries {
  _id: Types.ObjectId;
  totalFinishedCount: number;
  eventStart: string;
}
/**
 * Power из fitfiles
 */
export interface PowerFitFiles {
  name: string;
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
 * Аргументы для функции getRidersInEventsServiceArg
 */
export interface GetRidersInEventsServiceArg {
  period: number; // количество дней для запроса данных от текущей даты
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
