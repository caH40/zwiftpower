export function setValueMax(results) {
  try {
    let maxWatt = 0;
    let maxWattsPerKg = 0;
    let maxHeightInCentimeters = 0;
    let maxWeightInGrams = 0;
    let maxAvgHeartRate = 0;

    // поиск максимального значения
    for (const result of results) {
      if (result.sensorData.avgWatts.value > maxWatt) {
        maxWatt = result.sensorData.avgWatts.value;
      }
      if (result.wattsPerKg.value > maxWattsPerKg) {
        maxWattsPerKg = result.wattsPerKg.value;
      }
      if (result.profileData.heightInCentimeters.value > maxHeightInCentimeters) {
        maxHeightInCentimeters = result.profileData.heightInCentimeters.value;
      }
      if (result.profileData.weightInGrams.value > maxWeightInGrams) {
        maxWeightInGrams = result.profileData.weightInGrams.value;
      }
      if (result.sensorData.heartRateData.avgHeartRate.value > maxAvgHeartRate) {
        maxAvgHeartRate = result.sensorData.heartRateData.avgHeartRate.value;
      }
    }
    // присвоение максимального значения
    for (const result of results) {
      if (result.sensorData.avgWatts.value === maxWatt) {
        result.sensorData.avgWatts.addition = maxWatt + 'max';
      } else {
        result.sensorData.avgWatts.addition = result.sensorData.avgWatts.value;
      }

      if (result.wattsPerKg.value === maxWattsPerKg) {
        result.wattsPerKg.addition = maxWattsPerKg + 'max';
      } else {
        result.wattsPerKg.addition = result.wattsPerKg.value;
      }

      if (result.profileData.heightInCentimeters.value === maxHeightInCentimeters) {
        result.profileData.heightInCentimeters.addition = maxHeightInCentimeters + 'max';
      } else {
        result.profileData.heightInCentimeters.addition =
          result.profileData.heightInCentimeters.value;
      }

      if (result.profileData.weightInGrams.value === maxWeightInGrams) {
        result.profileData.weightInGrams.addition = maxWeightInGrams + 'max';
      } else {
        result.profileData.weightInGrams.addition = result.profileData.weightInGrams.value;
      }

      if (result.sensorData.heartRateData.avgHeartRate.value === maxAvgHeartRate) {
        result.sensorData.heartRateData.avgHeartRate.addition = maxAvgHeartRate + 'max';
      } else {
        result.sensorData.heartRateData.avgHeartRate.addition =
          result.sensorData.heartRateData.avgHeartRate.value;
      }
    }

    setValueMaxCP(results); // максимальные значения для CP

    return results;
  } catch (error) {
    throw error;
  }
}

function setValueMaxCP(results) {
  for (let i = 0; i < results[0].cpBestEfforts.length; i++) {
    let maxCPWatt = 0;
    let maxCPWattsPerKg = 0;
    // поиск максимального значения
    for (const result of results) {
      if (result.cpBestEfforts[i].watts.value > maxCPWatt) {
        maxCPWatt = result.cpBestEfforts[i].watts.value;
      }
      if (result.cpBestEfforts[i].wattsKg.value > maxCPWattsPerKg) {
        maxCPWattsPerKg = result.cpBestEfforts[i].wattsKg.value;
      }
    }
    // присвоение максимального значения
    for (const result of results) {
      if (result.cpBestEfforts[i].watts.value === maxCPWatt) {
        result.cpBestEfforts[i].watts.addition = maxCPWatt + 'max';
      } else {
        result.cpBestEfforts[i].watts.addition = result.cpBestEfforts[i].watts.value;
      }
      if (result.cpBestEfforts[i].wattsKg.value === maxCPWattsPerKg) {
        result.cpBestEfforts[i].wattsKg.addition = maxCPWattsPerKg + 'max';
      } else {
        result.cpBestEfforts[i].wattsKg.addition = result.cpBestEfforts[i].wattsKg.value;
      }
    }
  }
}
