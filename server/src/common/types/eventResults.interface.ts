import { Types } from 'mongoose';

/**
 *  Event (описание) и результаты райдеров
 */
export interface EventResultsFetch {
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

  eventSubgroups: {
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
  }[];
  clubName: string;
  hasResults: boolean;
  needCount: boolean;
  updated?: number;
  creator: Types.ObjectId | string;
  started: boolean;
  totalFinishedCount?: number;

  results?: UserResultForFetch[];
}

interface Additional {
  value: number;
  addition: string;
}

export interface UserResultForFetch {
  _id: Types.ObjectId;
  zwiftEventId: Types.ObjectId;
  subgroupId: Types.ObjectId; // зачем?
  profileId: number;

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

  eventSubgroupId: number;
  subgroupLabel: string;
  rank: number;
  rankEvent: number;
  eventId: number;

  wattsPerKg: Additional;
  cpBestEfforts: {
    watts: Additional;
    wattsKg: Additional;
    cpLabel: string;
    duration: number;
  }[];

  eventName?: string;
  eventStart?: number;

  flaggedCheating: boolean;
  flaggedSandbagging: boolean;
  // свойства из предыдущей модели
  penalty: { fairPlay: number };
  isDisqualification: boolean;
  isDidNotFinish: boolean;
  category: string;
  categoryCurrent: string;
  pointsStage: number;
  isUnderChecking: boolean;
  addedManually: boolean;
}
