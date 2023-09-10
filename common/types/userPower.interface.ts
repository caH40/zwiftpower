// общий тип, используемый на сервере и фронте, UserPower отправляемый/получаемый через API
export interface UserPowerFetch {
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

  powerFromEvents: {
    _id: string;
    cpBestEfforts: {
      watts: number;
      wattsKg: number;
      cpLabel: string;
      duration: number;
    }[];

    eventName: string;
    eventStart: number;
  }[];

  message: string;
}
