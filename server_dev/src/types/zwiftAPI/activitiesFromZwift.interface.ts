export interface ActivitiesDataFromZwiftAPI {
  id_str: string;
  id: number;
  profileId: number;
  profile: Profile;
  worldId: number;
  name: string;
  privateActivity: boolean;
  sport: string;
  startDate: string;
  endDate: string;
  lastSaveDate: string;
  autoClosed: boolean;
  duration: string;
  distanceInMeters: number;
  totalElevation: number;
  avgWatts: number;
  rideOnGiven: boolean;
  activityRideOnCount: number;
  activityCommentCount: number;
  snapshotList: string[];
  calories: number;
  primaryImageUrl: string;
  movingTimeInMs: number;
  privacy: string;
  activityRideOns: [];
  avgHeartRate: number;
  maxHeartRate: number;
  maxWatts: number;
  avgCadenceInRotationsPerMinute: number;
  maxCadenceInRotationsPerMinute: number;
  avgSpeedInMetersPerSecond: number;
  maxSpeedInMetersPerSecond: number;
  percentageCompleted: number;
  snapshotThumbnails: string[];
  overriddenFitnessPrivate: string;
  notableMoments: NotableMoment[];
  fitnessData: FitnessData;
  rideOnTimes: number[];
  eventInfo: EventInfo;
  profileFtp: number;
  profileMaxHeartRate: number;
  clubId: string;
  clubAttributions: [];
}

/**
 * Профайл райдера
 */
interface Profile {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  male: boolean;
  eventCategory: string;
  imageSrc: string;
  imageSrcLarge: string;
  playerType: string;
  countryAlpha3: string;
  countryCode: number;
  useMetric: boolean;
  riding: boolean;
  privacy: {
    approvalRequired: boolean;
    displayWeight: boolean;
    minor: boolean;
    privateMessaging: boolean;
    defaultFitnessDataPrivacy: boolean;
    suppressFollowerNotification: boolean;
    displayAge: boolean;
    defaultActivityPrivacy: string;
  };
  socialFacts: null;
  worldId: number;
  enrolledZwiftAcademy: boolean;
  playerTypeId: number;
  playerSubTypeId: null;
  currentActivityId: null;
  likelyInGame: boolean;
}

/**
 * Информация об Эвенте
 */
interface EventInfo {
  id: number;
  eventSubGroupId: number;
  imageUrl: string;
  name: string;
  durationInSeconds: number;
  distanceInMeters: number;
  laps: number;
  sport: string;
  followeeEntrantCount: number;
  subgroupTotalEntrantCount: number;
  subgroupEventLabel: number;
  eventSubgroups: {
    id: number;
    name: string;
    label: number;
  }[];
}

/**
 * Важное событие во время заезда
 */
interface NotableMoment {
  notableMomentTypeId: number;
  activityId: number;
  incidentTime: number;
  priority: number;
  aux1: string;
  aux2: string;
}
/**
 * Фитфайлы с заезда
 */
interface FitnessData {
  status: string;
  fullDataUrl: string;
  smallDataUrl: string;
}
