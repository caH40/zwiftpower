/**
 * данные полученные с API Zwift по запросу `profiles/${eventId}`
 * параметры профайла райдера в Звифте
 */
export interface ProfileZwiftAPI {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  male: boolean;
  eventCategory: string;
  imageSrc: string | null;
  imageSrcLarge: null;
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
  socialFacts: {
    profileId: number;
    followersCount: number;
    followeesCount: number;
    followeesInCommonWithLoggedInPlayer: number;
    followerStatusOfLoggedInPlayer: string;
    followeeStatusOfLoggedInPlayer: string;
    isFavoriteOfLoggedInPlayer: boolean;
  };
  worldId: null;
  enrolledZwiftAcademy: boolean;
  playerTypeId: number;
  playerSubTypeId: null;
  currentActivityId: null;
  likelyInGame: boolean;
  address: null;
  age: number;
  bodyType: number;
  connectedToStrava: boolean;
  connectedToTrainingPeaks: boolean;
  connectedToTodaysPlan: boolean;
  connectedToUnderArmour: boolean;
  connectedToWithings: boolean;
  connectedToFitbit: boolean;
  connectedToGarmin: boolean;
  connectedToRuntastic: boolean;
  connectedToZwiftPower: boolean;
  stravaPremium: boolean;
  bt: string;
  dob: string;
  emailAddress: string;
  height: number;
  location: string;
  preferredLanguage: string;
  mixpanelDistinctId: string;
  profileChanges: boolean;
  weight: number;
  b: boolean;
  createdOn: string;
  source: string;
  origin: null;
  launchedGameClient: string;
  ftp: number;
  userAgent: string;
  runTime1miInSeconds: number;
  runTime5kmInSeconds: number;
  runTime10kmInSeconds: number;
  runTimeHalfMarathonInSeconds: number;
  runTimeFullMarathonInSeconds: number;
  cyclingOrganization: null;
  licenseNumber: null;
  bigCommerceId: null;
  marketingConsent: null;
  publicAttributes: unknown;
  privateAttributes: unknown;
  achievementLevel: number;
  totalDistance: number;
  totalDistanceClimbed: number;
  totalTimeInMinutes: number;
  totalInKomJersey: number;
  totalInSprintersJersey: number;
  totalInOrangeJersey: number;
  totalWattHours: number;
  totalExperiencePoints: number;
  targetExperiencePoints: number;
  totalGold: number;
  runAchievementLevel: number;
  totalRunDistance: number;
  totalRunTimeInMinutes: number;
  totalRunExperiencePoints: number;
  targetRunExperiencePoints: number;
  totalRunCalories: number;
  powerSourceType: string;
  powerSourceModel: string;
  virtualBikeModel: string;
  numberOfFolloweesInCommon: number;
  affiliate: null;
  avantlinkId: null;
  fundraiserId: null;
  profilePropertyChanges: [
    { propertyName: 'DATE_OF_BIRTH'; changeCount: number; maxChanges: number },
    { propertyName: 'GENDER'; changeCount: number; maxChanges: number }
  ];
  streaksCurrentLength: number;
  streaksMaxLength: number;
  streaksLastRideTimestamp: string; // date string.

  competitionMetrics: {
    racingScore: number;
    category: string;
    categoryWomen: string;
  } | null;
}
