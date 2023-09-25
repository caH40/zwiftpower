// types
import { ZwiftResultSchema } from '../types/model.interface.js';
import { UserResult } from '../types/types.interface.js';

export function addPropertyAddition(results: ZwiftResultSchema[]) {
  const resultsNew: UserResult[] = results.map((result) => {
    /**
     * изменение свойства durationInMilliseconds
     */
    const activityData = {
      ...result.activityData,
      durationInMilliseconds: {
        value: result.activityData.durationInMilliseconds,
        addition: '',
      },
    };
    /**
     * изменение свойств weightInGrams, heightInCentimeters
     */
    const profileData = {
      ...result.profileData,
      weightInGrams: {
        value: result.profileData.weightInGrams,
        addition: '',
      },
      heightInCentimeters: {
        value: result.profileData.heightInCentimeters,
        addition: '',
      },
    };
    /**
     * изменение свойств heartRateData, avgWatts
     */
    const sensorData = {
      ...result.sensorData,
      heartRateData: {
        ...result.sensorData.heartRateData,
        avgHeartRate: {
          value: result.sensorData.heartRateData.avgHeartRate,
          addition: '',
        },
      },
      avgWatts: {
        value: result.sensorData.avgWatts,
        addition: '',
      },
    };
    /**
     * изменение свойства wattsPerKg
     */
    const wattsPerKg = {
      value: result.wattsPerKg,
      addition: '',
    };
    /**
     * изменение свойства cpBestEfforts
     */
    const cpBestEfforts = result.cpBestEfforts.map((cp) => ({
      watts: { value: cp.watts, addition: '' },
      wattsKg: { value: cp.wattsKg, addition: '' },
      cpLabel: cp.cpLabel,
      duration: cp.duration,
    }));

    return { ...result, activityData, profileData, sensorData, wattsPerKg, cpBestEfforts };
  });

  return resultsNew;
}
