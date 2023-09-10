/**
 * Данные по результатам райдеров в Event получаемы с API Zwift
 */
export interface ResultsEvent {
  entries: ResultEvent[];
}

/**
 * Результат райдера в Event получаемы с API Zwift
 */
export interface ResultEvent {
  activityData: {
    activityId: string;
    calories: number;
    durationInMilliseconds: number;
    elevationInMeters: number;
    endDate: string;
    endWorldTime: number;
    mapId: number;
    segmentDistanceInMeters: number;
    sport: string;
    worldId: number;
  };
  bibNumber: number;
  criticalP: {
    criticalP15Seconds: number;
    criticalP1Minute: number;
    criticalP20Minutes: number;
    criticalP5Minutes: number;
  };
  eventId: number;
  eventSubgroupId: number;
  flaggedCheating: boolean;
  flaggedSandbagging: boolean;
  lateJoin: boolean;
  profileData: {
    firstName: string;
    gender: string;
    heightInCentimeters: number;
    imageSrc: string;
    lastName: string;
    playerType: string;
    weightInGrams: number;
  };
  profileId: number;
  qualified: boolean;
  rank: number;
  rankingValue: number;
  sensorData: {
    avgWatts: number;
    heartRateData: { avgHeartRate: number; heartRateMonitor: boolean };
    pairedSteeringDevice: boolean;
    powerType: string;
  };
}
