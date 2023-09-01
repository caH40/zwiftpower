export function addWattsPerKg(results) {
  try {
    const resultsNew = [...results];

    for (const result of resultsNew) {
      const watts = result.sensorData.avgWatts;
      const weight = result.profileData.weightInGrams;
      result.wattsPerKg = Math.round((watts / weight) * 100000) / 100;
    }

    return resultsNew;
  } catch (error) {
    throw error;
  }
}
