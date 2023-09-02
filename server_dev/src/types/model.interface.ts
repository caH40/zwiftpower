import { Types } from 'mongoose';
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
//
//
export interface PowerCurveSchema {
  zwiftId: number;
  date: number;
  pointsWatts: {
    duration: number;
    value: number;
    date: number;
    name: string;
  }[];
  pointsWattsPerKg: {
    duration: number;
    value: number;
    date: number;
    name: string;
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
export interface TokenSchema {
  user: Types.ObjectId;
  refreshToken: string;
}
//
//
export interface TotalCatchupSchema {
  type: string;
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
  username: string;
  password: string;
  riderId: Types.ObjectId;
  zwiftId: number;
  telegramId: number;
  date: number;
  email: string;
  emailConfirm: boolean;
  phone: string;
  firstName: string;
  patronymic: string;
  lastName: string;
  gender: string;
  birthday: number;
  city: string;
  team: string;
  role: string;
  photoFromZp: boolean;
  photoProfile: string;
  bio: string;
}
//
//
export interface ZwiftEventSchema {
  seriesId: Types.ObjectId;
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
  updated: number;
  creator: Types.ObjectId;
  started: boolean;
  totalFinishedCount: number;
}
//
//
export interface ZwiftEventSchema {
  bikeHash: number;
  description: string;
  eventSubgroupStart: string;
  id: number;
  jerseyHash: number;
  label: number;
  laps: number;
  distanceInMeters: number;
  durationInSeconds: number;
  distanceSummary: {
    distanceInKilometers: number;
    elevationGainInMeters: number;
  };
  zwiftInsiderUrl: string;
  mapId: number;
  name: string;
  routeId: number;
  rulesSet: string[];
  subgroupLabel: string;
  tags: string[];
  timeTrialOptions: object;
  totalEntrantCount: number;
  totalJoinedCount: number;
  totalSignedUpCount: number;
  invitedLeaders: number[];
  invitedSweepers: number[];
}
//
//
export interface ZwiftResultSchema {
  _id: Types.ObjectId;
  zwiftEventId: Types.ObjectId;
  subgroupId: Types.ObjectId; // зачем?
  profileId: number;

  profileData: {
    firstName: string;
    lastName: string;
    gender: string;
    weightInGrams: number;
    heightInCentimeters: number;
    imageSrc: string;
    countryAlpha3: string;
    age: number;
  };

  eventSubgroupId: number;
  subgroupLabel: string;
  rank: number;
  rankEvent: number;
  eventId: number;

  activityData: {
    activityId: string;
    sport: string;
    durationInMilliseconds: number;
  };

  sensorData: {
    heartRateData: { avgHeartRate: number };
    avgWatts: number;
    powerType: string;
  };
  wattsPerKg: number;

  flaggedCheating: boolean;
  flaggedSandbagging: boolean;
  // свойства из предыдущей модели
  rankAbsolute: number;
  penalty: { fairPlay: number };
  isDisqualification: boolean;
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
