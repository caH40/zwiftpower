import { Types } from 'mongoose';

export interface ResultsSeriesFetch {
  results: {
    eventId: number;
    subgroupLabel: string;
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

    durationInMilliseconds: number;
    eventSubgroup: {
      distanceSummary?: {
        distanceInKilometers: number;
        elevationGainInMeters: number;
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

  resultsSummary: {
    id: number;
    groupCategory: string;
    winsTotal: number;
  }[];
}
