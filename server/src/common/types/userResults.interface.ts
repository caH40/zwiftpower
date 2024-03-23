import { Types } from 'mongoose';

// общий тип, используемый на сервере и фронте, UserResult отправляемый/получаемый через API
export interface UserResultFetch {
  powerCurve: {
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
  } | null;

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

  profile: {
    ftp: number | null;
    imageSrc: string | null;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    countryAlpha3: string;
    male: boolean;
    zCategory?: string;
    zCategoryWomen?: string;
    category?: 'E' | 'APlus' | 'A' | 'B' | 'C' | 'D';
    bio?: string;
  };
  quantityPages: number;
  message: string;
}

interface Additional {
  value: number;
  addition: string;
}
