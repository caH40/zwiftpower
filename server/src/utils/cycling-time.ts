export const cyclingTimeInMilliseconds = ({
  distanceMeters,
  ascentMeters,
  avgPowerWatts,
  laps,
}: {
  distanceMeters: number;
  ascentMeters: number;
  avgPowerWatts: number;
  laps: number;
}): number => {
  const gradient = ascentMeters / (distanceMeters / 1000) || 0; // средний градиент (%)
  const avgSpeedKmH = (avgPowerWatts * 3.0 + 15.0) / (1 + gradient * 0.001); // км/ч
  const lapTimeSeconds = (distanceMeters / 1000 / avgSpeedKmH) * 3600; // время одного круга в секундах

  return laps * lapTimeSeconds * 1000;
};
