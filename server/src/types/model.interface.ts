import { Types } from 'mongoose';
import { ProfileDataInResultWithId } from './types.interface.js';
// типизация схемы и модели документов mongodb
//
//
export interface DescriptionSchema {
  name: string;
  description: string;
}
//
//
export interface FitFileSchema {
  zwiftId: number;
  dateLastedActivity: number;
  dateUpdate: number;
  activities: {
    isVirtualPower: boolean;
    eventId: number | null;
    name: string;
    date: number;
    powerInWatts: string;
    weightInGrams: number;
  }[];
}
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
 * Несколько точек измерения мощности и удельной мощности за последние 90 дней
 */
export interface PowerCurveSchema {
  zwiftId: number;
  isMale: boolean;
  date: number;
  pointsWatts: {
    isVirtualPower: boolean;
    duration: number;
    value: number;
    date: number;
    name: string;
    eventId: number | null;
    isDisqualification: boolean; // при DSQ не учитывается в Лидерах мощности
  }[];
  pointsWattsPerKg: {
    isVirtualPower: boolean;
    duration: number;
    value: number;
    date: number;
    name: string;
    eventId: number | null;
    isDisqualification: boolean; // при DSQ не учитывается в Лидерах мощности
  }[];
}
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
//
//
export interface RiderSchema {
  teamId: Types.ObjectId;
  firstName: string;
  lastName: string;
  firstNameZwift: string;
  lastNameZwift: string;
  telegramUsername: string;
  telegramId: number;
  zwiftId: number;
  cycleTrainer: string;
  zwiftPower: string;
  yearBirth: string;
  category: string;
  categoryTour: string;
  gender: string;
  settings: {
    notice: {
      news: boolean;
      newRace: boolean;
      botInfo: boolean;
      training: boolean;
    };
  };
  password: string;
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
//
export interface TokenSchema {
  user: Types.ObjectId;
  refreshToken: string;
}
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
export interface UserSchema {
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
  zwiftData?: {
    firstName: string;
    lastName: string;
    category: string;
    categoryWomen: string;
    ftp: number;
    weight: number;
    height: number;
    age: number;
    countryAlpha3: string;
    imageSrc: string;
    male: boolean;
    publicId: string;
  };
  category?: 'E' | 'APlus' | 'A' | 'B' | 'C' | 'D';
  gender: string;
  birthday: number;
  city: string;
  team: string;
  role: string;
  moderator?: {
    clubs: Types.ObjectId[]; // список клубов в которых является модератором
  };
  photoFromZp: boolean;
  photoProfile?: string;
  bio: string;
}
//
//
export interface ZwiftEventSchema {
  _id?: Types.ObjectId;
  seriesId: Types.ObjectId | null;
  typeRaceCustom: string;
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
  organizer: string;
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
export interface ZwiftProfileSchema {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  male: boolean;
  eventCategory: string; // MALE ?
  imageSrc: string;
  imageSrcLarge: string;
  playerType: string; // NORMAL ?
  countryAlpha3: string;
  countryCode: number;
  age: number;
  height: number;
  weight: number;
  ftp: number;
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
export interface ClubSchema {
  id: string; // id клуба в Звифте
  images: {
    icon: string; // ссылка (url) на иконку клуба
    event: string; // ссылка (url) на постер к создаваемому Эвенту
    club_large: string; // ссылка (url) на постер клуба
  };
  name: string; // название клуба;
  tagline: string; // полное название клуба;
  description: string; // описание клуба;
  moderators?: Types.ObjectId[]; // модераторы клуба;
}
