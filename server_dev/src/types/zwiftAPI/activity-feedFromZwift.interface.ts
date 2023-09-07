/**
 * данные полученные с API Zwift по запросу
 * `activity-feed/feed/?feedType=OTHER_PROFILE&profile_id=${zwiftId}&limit=50`
 * список (activityFeedFromZwiftAPI[]) последний активностей райдера
 */
export interface activityFeedFromZwiftAPI {
  id: number;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    imageSrc: string;
    approvalRequired: null;
  };
  worldId: number;
  name: string;
  sport: string;
  startDate: string;
  endDate: string;
  distanceInMeters: number;
  totalElevation: number;
  calories: number;
  primaryImageUrl: string;
  feedImageThumbnailUrl: string;
  lastSaveDate: string;
  movingTimeInMs: number;
  avgSpeedInMetersPerSecond: number;
  activityRideOnCount: number;
  activityCommentCount: number;
  privacy: string;
  eventId: number;
  rideOnGiven: boolean;
  id_str: string;
}
