/**
 * данные полученные с API Zwift по запросу `events/${eventId}?skip_cache=boolean`
 * параметры созданного Event(заезда)
 */
export interface eventDataFromZwiftAPI {
  id: number; // eventId
  worldId: number;
  name: string;
  description: string;
  shortName: string;
  shortDescription: string;
  imageUrl: string;
  rulesId: number;
  mapId: number;
  routeId: number;
  routeUrl: null;
  jerseyHash: number | null;
  bikeHash: number | null;
  visible: boolean;
  overrideMapPreferences: boolean;
  eventStart: string;
  durationInSeconds: number;
  distanceInMeters: number;
  laps: number;
  privateEvent: boolean;
  invisibleToNonParticipants: boolean;
  followeeEntrantCount: number;
  totalEntrantCount: number;
  followeeSignedUpCount: number;
  totalSignedUpCount: number;
  followeeJoinedCount: number;
  totalJoinedCount: number;
  eventSubgroups: eventSubgroup[];
  eventSeries: null;
  auxiliaryUrl: string;
  imageS3Name: null;
  imageS3Bucket: null;
  sport: string;
  cullingType: string;
  rulesSet: string[];
  recurring: boolean;
  recurringOffset: null;
  publishRecurring: boolean;
  parentId: null;
  type: string;
  workoutHash: null;
  customUrl: string;
  restricted: boolean;
  unlisted: boolean;
  eventSecret: string;
  accessExpression: string;
  tags: string[];
  qualificationRuleIds: null;
  lateJoinInMinutes: null;
  timeTrialOptions: null;
  microserviceName: string;
  microserviceExternalResourceId: string;
  microserviceEventVisibility: string;
  minGameVersion: null;
  recordable: boolean;
  imported: boolean;
  eventTemplateId: number;
  categoryEnforcement: boolean;
  rangeAccessLabel: null;
  eventType: string;
}

interface eventSubgroup {
  id: number;
  name: string;
  description: string;
  label: number;
  subgroupLabel: string;
  rulesId: number;
  mapId: number;
  routeId: number;
  routeUrl: null;
  jerseyHash: number;
  bikeHash: null;
  startLocation: number;
  invitedLeaders: number[];
  invitedSweepers: number[];
  paceType: number;
  fromPaceValue: number;
  toPaceValue: number;
  fieldLimit: null;
  registrationStart: string;
  registrationEnd: string;
  lineUpStart: string;
  lineUpEnd: string;
  eventSubgroupStart: string;
  durationInSeconds: number;
  laps: number;
  distanceInMeters: number;
  signedUp: boolean;
  signupStatus: number;
  registered: boolean;
  registrationStatus: number;
  followeeEntrantCount: number;
  totalEntrantCount: number;
  followeeSignedUpCount: number;
  totalSignedUpCount: number;
  followeeJoinedCount: number;
  totalJoinedCount: number;
  auxiliaryUrl: string;
  rulesSet: string[];
  workoutHash: null;
  customUrl: string;
  overrideMapPreferences: boolean;
  tags: string[];
  lateJoinInMinutes: number;
  timeTrialOptions: null;
  qualificationRuleIds: null;
  accessValidationResult: boolean;
  rangeAccessLabel: null;
}
