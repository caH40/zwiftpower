import { getLapsString } from '../../utils/declination';

export function getDurationDistance(laps, distanceInMeters, durationInSeconds) {
  if (laps !== 0) return getLapsString(laps);
  if (distanceInMeters !== 0) {
    return `${distanceInMeters / 1000} км`;
  }
  if (durationInSeconds !== 0) {
    return `${durationInSeconds / 60} минут`;
  }
  return 'дистанция не известна';
}
