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

export interface ResultWithEvent extends Omit<ZwiftResultSchema, 'zwiftEventId'> {
  zwiftEventId: ZwiftEventSchema;
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
  cpBestEfforts: {
    watts: Additional;
    wattsKg: Additional;
    cpLabel: string;
    duration: number;
  }[];

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
 * Зарегистрированные райдеры с мощностью (powerCurve) за последние 90 дней
 */
export interface SignedRidersPowerCurves extends SignedRidersSchema {
  powerCurve?: PowerCurveSchema;
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
export interface ResultEventAdditional extends ResultEvent {
  subgroupLabel?: string;
  subgroupId?: Types.ObjectId;
}
/**
 * Результаты райдеров в Event с дополнительными параметрами
 */
export interface ResultsEventAdditional {
  entries: ResultEventAdditional[];
}
