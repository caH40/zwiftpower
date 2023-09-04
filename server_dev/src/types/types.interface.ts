import {
  LogsAdminSchema,
  PowerCurveSchema,
  SignedRidersSchema,
  ZwiftEventSchema,
  ZwiftEventSubgroupSchema,
  ZwiftResultSchema,
} from './model.interface.js';

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
 * Логи по запросам админов(модераторов)
 */
export interface LogsAdminUsername extends Omit<LogsAdminSchema, 'userId'> {
  userId: { username: string };
}
/**
 * Логи по запросам админов(модераторов)
 */
export interface SignedRidersPowerCurves extends SignedRidersSchema {
  powerCurve?: PowerCurveSchema;
}
/**
 * Логи по запросам админов(модераторов)
 */
export interface EventWithSignedRiders extends EventWithSubgroup {
  signedRiders: SignedRidersPowerCurves[];
}
