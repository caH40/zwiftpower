import { Types } from 'mongoose';

// общий тип, используемый на сервере и фронте, UserResult отправляемый/получаемый через API
export interface UserResultFetch {
  userResults: {
    _id: Types.ObjectId;
    zwiftEventId: Types.ObjectId;
    subgroupId: Types.ObjectId; // зачем?
    profileId: number;

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

    eventSubgroupId: number;
    subgroupLabel: string;
    rank: number;
    rankEvent: number;
    eventId: number;

    activityData: {
      activityId: string;
      sport: string;
      durationInMilliseconds: Additional;
    };

    sensorData: {
      heartRateData: { avgHeartRate: Additional };
      avgWatts: Additional;
      powerType: string;
    };
    wattsPerKg: Additional;

    flaggedCheating: boolean;
    flaggedSandbagging: boolean;
    // свойства из предыдущей модели
    penalty: { fairPlay: number };
    isDisqualification: boolean;
    isDidNotFinish: boolean;
    category: string;
    categoryCurrent: string;
    teamCurrent: string;
    pointsStage: number;
    isUnderChecking: boolean;
    addedManually: boolean;

    cpBestEfforts: {
      watts: Additional;
      wattsKg: Additional;
      cpLabel: string;
      duration: number;
    }[];
  }[];
  quantityPages: number;
  message: string;
}

interface Additional {
  value: number;
  addition: string;
}
