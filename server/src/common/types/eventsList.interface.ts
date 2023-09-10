import { Types } from 'mongoose';

// types
import { UserResultForFetch } from './eventResults.interface.js';
/**
 *  Events для страниц расписания, анонса или результатов
 */
export interface EventListFetch {
  _id?: Types.ObjectId | null;

  seriesId: {
    _id: Types.ObjectId;
    name: string;
    dateStart: number;
    description: string;
    descriptionShort?: string;
    type: string;
    organizer: string;
    hasGeneral: boolean;
    hasTeams: boolean;
    isFinished: boolean;
  };

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
      distanceInKilometers: number;
      elevationGainInMeters: number;
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
