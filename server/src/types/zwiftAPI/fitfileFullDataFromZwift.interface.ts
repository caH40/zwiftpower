/**
 * данные полученные с API Zwift по запросу `activities/${number}/file/${number}`
 * данные фитфайла заезда райдера с посекундным шагом записи
 */
export interface FitfileFullDataFromZwiftAPI {
  powerInWatts: number[];
  cadencePerMin: number[];
  heartRate: number[];
  distanceInCm: number[];
  speedInCmPerSec: number[];
  timeInSec: number[];
  altitudeInCm: number[];
  latlng: [number, number][];
}
