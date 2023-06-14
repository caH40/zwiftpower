export const getIntervals = (powerInWatts, weightInKilogram, intervals) => {
  try {
    const cpBestEfforts = [];

    for (const interval of intervals) {
      let cpMax = 0;
      for (let i = 0; i < powerInWatts.length - interval + 1; i++) {
        let cp = 0;
        for (let j = i; j < i + interval; j++) {
          cp += powerInWatts[j];
        }
        if (cp > cpMax) cpMax = cp;
      }
      if (interval < powerInWatts.length) {
        cpBestEfforts.push({
          watts: Math.round(cpMax / interval),
          wattsKg: Math.round((cpMax / interval / weightInKilogram) * 100) / 100,
          duration: interval,
        });
      } else {
        cpBestEfforts.push({
          watts: null,
          wattsKg: null,
          duration: interval,
        });
      }
    }
    return cpBestEfforts;
  } catch (error) {
    throw error;
  }
};
