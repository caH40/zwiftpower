// types
import { UserResult } from '../types/types.interface.js';

export function setValueMax(results: UserResult[]) {
  if (!results.length) return [];

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
    const valueAvgWatts = result.sensorData.avgWatts.value;
    if (valueAvgWatts === maxWatt) {
      result.sensorData.avgWatts.addition = maxWatt + 'max';
    } else {
      result.sensorData.avgWatts.addition = valueAvgWatts ? String(valueAvgWatts) : '';
    }

    const valueWattsPerKg = result.wattsPerKg.value;
    if (valueWattsPerKg === maxWattsPerKg) {
      result.wattsPerKg.addition = maxWattsPerKg + 'max';
    } else {
      result.wattsPerKg.addition = valueWattsPerKg ? String(valueWattsPerKg) : '';
    }

    const valueHeight = result.profileData.heightInCentimeters.value;
    if (valueHeight === maxHeightInCentimeters) {
      result.profileData.heightInCentimeters.addition = maxHeightInCentimeters + 'max';
    } else {
      result.profileData.heightInCentimeters.addition = valueHeight ? String(valueHeight) : '';
    }

    const valueWeight = result.profileData.weightInGrams.value;
    if (valueWeight === maxWeightInGrams) {
      result.profileData.weightInGrams.addition = maxWeightInGrams + 'max';
    } else {
      result.profileData.weightInGrams.addition = valueWeight ? String(valueWeight) : '';
    }

    const valueHeartRate = result.sensorData.heartRateData.avgHeartRate.value;
    if (valueHeartRate === maxAvgHeartRate) {
      result.sensorData.heartRateData.avgHeartRate.addition = maxAvgHeartRate + 'max';
    } else {
      result.sensorData.heartRateData.avgHeartRate.addition = valueHeartRate
        ? String(valueHeartRate)
        : '';
    }
  }

  setValueMaxCP(results); // максимальные значения для CP

  return results;
}

function setValueMaxCP(results: UserResult[]) {
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
      const valueCPWatt = result.cpBestEfforts[i].watts.value;
      if (valueCPWatt === maxCPWatt) {
        result.cpBestEfforts[i].watts.addition = maxCPWatt + 'max';
      } else {
        result.cpBestEfforts[i].watts.addition = valueCPWatt ? String(valueCPWatt) : '';
      }

      const valueWattsKg = result.cpBestEfforts[i].wattsKg.value;
      if (valueWattsKg === maxCPWattsPerKg) {
        result.cpBestEfforts[i].wattsKg.addition = maxCPWattsPerKg + 'max';
      } else {
        result.cpBestEfforts[i].wattsKg.addition = valueWattsKg ? String(valueWattsKg) : '';
      }
    }
  }
}
