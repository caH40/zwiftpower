// общий тип, используемый на сервере и фронте, UserProfile отправляемый/получаемый через API
export interface UserProfileFetch {
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

  quantityRace: number;
  message: string;
}
