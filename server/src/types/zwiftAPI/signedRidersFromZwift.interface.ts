/**
 * данные зарегистрированного райдера в Эвент
 * !!! добавить все необходимые из закомментированного ответа с ZwiftAPI
 */
export interface SignedRiderFromZwiftAPI {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  male: boolean;
  imageSrc: string;
  countryAlpha3: string;
  countryCode: number;
  age: number;
  height: number;
  weight: number;
}

// {
//   id: 3596390;
//   publicId: '1e0da233-38ba-4a19-a77c-b41062221285';
//   firstName: 'jan  ';
//   lastName: 'FOTOJAN [RTR]';
//   male: true;
//   eventCategory: 'MALE';
//   imageSrc: 'https://static-cdn.zwift.com/prod/profile/46508fe2-2429126';
//   imageSrcLarge: 'https://static-cdn.zwift.com/prod/profile/46508fe2-2429126';
//   playerType: 'NORMAL';
//   countryAlpha3: 'dnk';
//   countryCode: 208;
//   useMetric: true;
//   riding: false;
//   privacy: {
//     approvalRequired: false;
//     displayWeight: false;
//     minor: false;
//     privateMessaging: false;
//     defaultFitnessDataPrivacy: false;
//     suppressFollowerNotification: false;
//     displayAge: false;
//     defaultActivityPrivacy: 'FRIENDS';
//   };
//   socialFacts: {
//     profileId: 3596390;
//     followersCount: 0;
//     followeesCount: 0;
//     followeesInCommonWithLoggedInPlayer: 0;
//     followerStatusOfLoggedInPlayer: 'NO_RELATIONSHIP';
//     followeeStatusOfLoggedInPlayer: null;
//     isFavoriteOfLoggedInPlayer: false;
//   };
//   worldId: null;
//   enrolledZwiftAcademy: false;
//   playerTypeId: 1;
//   playerSubTypeId: null;
//   currentActivityId: null;
//   likelyInGame: false;
//   address: null;
//   age: 61;
//   bodyType: 48;
//   connectedToStrava: false;
//   connectedToTrainingPeaks: false;
//   connectedToTodaysPlan: false;
//   connectedToUnderArmour: false;
//   connectedToWithings: false;
//   connectedToFitbit: false;
//   connectedToGarmin: false;
//   connectedToRuntastic: false;
//   connectedToZwiftPower: false;
//   stravaPremium: false;
//   bt: null;
//   dob: null;
//   emailAddress: null;
//   height: 1860;
//   location: '';
//   preferredLanguage: 'en';
//   mixpanelDistinctId: 'b827bb5b-b135-45d5-b851-39a9c846f9c4';
//   profileChanges: false;
//   weight: 77000;
//   b: false;
//   createdOn: '2021-01-19T22:21:49.414+0000';
//   source: 'IOS';
//   origin: null;
//   launchedGameClient: '01/19/2021 22:21:51 +0000';
//   ftp: 266;
//   userAgent: 'CNL/3.43.2 (iOS 17.1.2) zwift/1.0.122711 game/1.53.2 curl/8.4.0';
//   runTime1miInSeconds: 483;
//   runTime5kmInSeconds: 1636;
//   runTime10kmInSeconds: 3600;
//   runTimeHalfMarathonInSeconds: 8439;
//   runTimeFullMarathonInSeconds: 18988;
//   cyclingOrganization: null;
//   licenseNumber: null;
//   bigCommerceId: null;
//   marketingConsent: null;
//   publicAttributes: { '324889996': '0' };
//   privateAttributes: {};
//   achievementLevel: 2363;
//   totalDistance: 2940535;
//   totalDistanceClimbed: 27071;
//   totalTimeInMinutes: 5464;
//   totalInKomJersey: 0;
//   totalInSprintersJersey: 0;
//   totalInOrangeJersey: 0;
//   totalWattHours: 18355;
//   totalExperiencePoints: 97832;
//   targetExperiencePoints: 97832;
//   totalGold: 2056130;
//   runAchievementLevel: 100;
//   totalRunDistance: 0;
//   totalRunTimeInMinutes: 0;
//   totalRunExperiencePoints: 0;
//   targetRunExperiencePoints: 0;
//   totalRunCalories: 0;
//   powerSourceType: 'Power Source';
//   powerSourceModel: 'Smart Trainer';
//   virtualBikeModel: 'Specialized Tarmac';
//   numberOfFolloweesInCommon: 0;
//   affiliate: null;
//   avantlinkId: null;
//   fundraiserId: null;
//   profilePropertyChanges: [
//     { propertyName: 'GENDER'; changeCount: 0; maxChanges: 3 },
//     { propertyName: 'DATE_OF_BIRTH'; changeCount: 0; maxChanges: 3 }
//   ];
//   streaksCurrentLength: 0;
//   streaksMaxLength: 0;
//   streaksLastRideTimestamp: null;
//   competitionMetrics: null;
// }
