import { Types } from 'mongoose';

/**
 *  Event (описание) и зарегистрировавшиеся райдеры
 */
export interface EventSignedRidersFetch {
  _id?: Types.ObjectId | null;
  seriesId: Types.ObjectId | null;
  typeRaceCustom: string;
  id: number;
  mapId: number;
  categoryEnforcement: boolean;
  accessExpression: string;
  cullingType?: string;
  description: string;
  eventStart: string;
  eventType: string;
  type: string;
  imageUrl: string;
  microserviceEventVisibility: string;
  microserviceExternalResourceId?: string;
  name: string;
  rulesSet: string[];
  organizer: string;
  tags: string[];
  visible: boolean;
  totalEntrantCount?: number;
  totalJoinedCount?: number;
  totalSignedUpCount: number;
  eventSubgroups: {
    _id?: Types.ObjectId | null;
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
  signedRiders: {
    team?: {
      _id: string;
      name: string;
      shortName: string;
      urlSlug: string;
      logoUrl?: Record<string, string>;
    };
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
    powerCurve?: {
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
    };
  }[];
}
