export function setValueMax(results) {
  try {
    let maxWatt = 0;
    let maxWattsPerKg = 0;
    let maxHeightInCentimeters = 0;
    let maxWeightInGrams = 0;
    let maxAvgHeartRate = 0;

    for (const result of results) {
      if (result.sensorData.avgWatts.value > maxWatt) {
        maxWatt = result.sensorData.avgWatts.value;
      }
      if (result.wattsPerKg.value > +maxWattsPerKg) {
        maxWattsPerKg = result.wattsPerKg.value;
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
      if (result.sensorData.avgWatts.value === maxWatt) {
        result.sensorData.avgWatts.addition = result.sensorData.avgWatts.value + 'max';
      } else {
        result.sensorData.avgWatts.addition = result.sensorData.avgWatts.value;
      }

      if (result.wattsPerKg.value === maxWattsPerKg) {
        result.wattsPerKg.addition = result.wattsPerKg.value + 'max';
      } else {
        result.wattsPerKg.addition = result.wattsPerKg.value;
      }

      if (result.profileData.heightInCentimeters.value === maxHeightInCentimeters) {
        result.profileData.heightInCentimeters.addition =
          result.profileData.heightInCentimeters.value + 'max';
      } else {
        result.profileData.heightInCentimeters.addition =
          result.profileData.heightInCentimeters.value;
      }

      if (result.profileData.weightInGrams.value === maxWeightInGrams) {
        result.profileData.weightInGrams.addition =
          result.profileData.weightInGrams.value + 'max';
      } else {
        result.profileData.weightInGrams.addition = result.profileData.weightInGrams.value;
      }

      if (result.sensorData.heartRateData.avgHeartRate.value === maxAvgHeartRate) {
        result.sensorData.heartRateData.avgHeartRate.addition =
          result.sensorData.heartRateData.avgHeartRate.value + 'max';
      } else {
        result.sensorData.heartRateData.avgHeartRate.addition =
          result.sensorData.heartRateData.avgHeartRate.value;
      }
    }

    return results;
  } catch (error) {
    throw error;
  }
}
