// types
import { ResultSeries, ResultWithEventAndSubgroup } from '../../../types/types.interface.js';

const profileDataEmpty = {
  firstName: '',
  lastName: '',
  gender: '',
  weightInGrams: 0,
  heightInCentimeters: 0,
  imageSrc: '',
  countryAlpha3: '',
  age: 0,
};

/**
 * Формирование массива результатов с необходимыми данными для запроса
 */
export function getResults(resultsRow: ResultWithEventAndSubgroup[]) {
  const results = resultsRow
    .map((event) => {
      const result = <ResultSeries>{};
      result.eventId = event.eventId;
      result.subgroupLabel = event.subgroupLabel;
      if (event.profileDataMain) {
        result.profileId = event.profileDataMain.profileIdMain;

        // подмена zwiftId на id основного профиля
        result.profileData = profileDataEmpty;

        // данные из основного профиля которые заменяют данные дополнительного профиля
        result.profileData.firstName = event.profileDataMain.firstName;
        result.profileData.lastName = event.profileDataMain.lastName;
        result.profileData.imageSrc = event.profileDataMain.imageSrc;
        result.profileData.countryAlpha3 = event.profileDataMain.countryAlpha3;
        result.profileData.age = event.profileDataMain.age;

        // исходные данные из текущего результата дополнительного профиля
        result.profileData.weightInGrams = event.profileData.weightInGrams;
        result.profileData.heightInCentimeters = event.profileData.heightInCentimeters;
        result.profileData.gender = event.profileData.gender;
      } else {
        result.profileId = event.profileId;
        result.profileData = event.profileData;
      }

      result.durationInMilliseconds = event.activityData.durationInMilliseconds;
      result.eventSubgroup = event.subgroupId;
      result.eventStart = new Date(event.zwiftEventId.eventStart).getTime();
      result.totalFinishedCount = event.zwiftEventId.totalFinishedCount;
      return result;
    })
    .sort((a, b) => b.eventStart - a.eventStart);

  return results;
}
