// types
import { ResultEventAdditional } from '../types/types.interface.js';

export function addWattsPerKg(results: ResultEventAdditional[]) {
  const resultsNew = [...results];

  for (const result of resultsNew) {
    const watts = result.sensorData.avgWatts;
    const weight = result.profileData.weightInGrams;
    result.wattsPerKg = Math.round((watts / weight) * 100000) / 100;
  }

  return resultsNew;
}
