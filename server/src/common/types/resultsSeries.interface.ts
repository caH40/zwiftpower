import { Types } from 'mongoose';
import { ProfileDataInResult } from '../../types/model.interface.js';

export interface ResultsSeriesFetch {
  results: {
    eventId: number;
    subgroupLabel: string;
    profileId: number;
    profileData: ProfileDataInResult;

    durationInMilliseconds: number;
    eventSubgroup: {
      distanceSummary?: {
        distanceInKilometers: number | null;
        elevationGainInMeters: number | null;
      };

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
    };
    eventStart: number;
    totalFinishedCount?: number;
  }[];

  resultsSummary?: {
    id: number;
    groupCategory: string;
    winsTotal: number;
  }[];
}
