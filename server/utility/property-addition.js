export function addPropertyAddition(results) {
  try {
    const resultsNew = [...results];

    for (const result of resultsNew) {
      result.activityData.durationInMilliseconds = {
        value: result.activityData.durationInMilliseconds,
        addition: '',
      };
      result.profileData.weightInGrams = {
        value: result.profileData.weightInGrams,
        addition: '',
      };
      result.profileData.heightInCentimeters = {
        value: result.profileData.heightInCentimeters,
        addition: '',
      };
      result.sensorData.heartRateData.avgHeartRate = {
        value: result.sensorData.heartRateData.avgHeartRate,
        addition: '',
      };
      result.sensorData.avgWatts = {
        value: result.sensorData.avgWatts,
        addition: '',
      };
      result.wattsPerKg = {
        value: result.wattsPerKg,
        addition: '',
      };
    }
    return resultsNew;
  } catch (error) {
    throw error;
  }
}
