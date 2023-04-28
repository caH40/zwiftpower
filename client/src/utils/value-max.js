export function maxValue(results) {
  try {
    let maxWatt = 0;
    let maxWattPerKg = 0;
    let maxHeightInCentimeters = 0;
    let maxWeightInGrams = 0;
    let maxAvgHeartRate = 0;

    for (const result of results) {
      if (result.sensorData.avgWatts.value > maxWatt) {
        maxWatt = result.sensorData.avgWatts.value;
      }
      if (result.wattPerKg > +maxWattPerKg) {
        maxWattPerKg = result.wattPerKg.value;
      }
      if (result.profileData.heightInCentimeters.value > +maxHeightInCentimeters) {
        maxHeightInCentimeters = result.profileData.heightInCentimeters.value;
      }
      if (result.profileData.weightInGrams.value > +maxWeightInGrams) {
        maxWeightInGrams = result.profileData.weightInGrams.value;
      }
      if (result.sensorData.heartRateData.avgHeartRate.value > +maxAvgHeartRate) {
        maxAvgHeartRate = result.sensorData.heartRateData.avgHeartRate.value;
      }
    }

    for (const result of results) {
      if (result.sensorData.avgWatts.value === maxWatt)
        result.sensorData.avgWatts.addition = 'max';
      if (result.wattsPerKg.value === maxWattPerKg) result.wattsPerKg.addition = 'max';
      if (result.profileData.heightInCentimeters.value === maxHeightInCentimeters)
        result.profileData.heightInCentimeters.addition = 'max';
      if (result.profileData.weightInGrams.value === maxWeightInGrams) {
        result.profileData.weightInGrams.addition = 'max';
      }
      if (result.sensorData.heartRateData.avgHeartRate.value === maxAvgHeartRate) {
        result.sensorData.heartRateData.avgHeartRate.addition = 'max';
      }
    }

    return results;
  } catch (error) {
    throw error;
  }
}
