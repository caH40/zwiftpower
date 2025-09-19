export const cyclingTimeInMilliseconds = ({
  distanceKilometers,
  ascentMeters,
  avgPowerWatts,
  laps,
  totalWeight = 75,
}: {
  distanceKilometers: number;
  ascentMeters: number;
  avgPowerWatts: number;
  laps: number;
  totalWeight?: number;
}): number => {
  const totalDistanceKm = distanceKilometers * laps;
  const totalAscentMeters = ascentMeters * laps;

  // Физические константы
  const g = 9.81; // ускорение свободного падения
  const crr = 0.004; // коэффициент сопротивления качению
  const cda = 0.3; // коэффициент аэродинамического сопротивления
  const rho = 1.2; // плотность воздуха
  const eta = 0.95; // КПД трансмиссии

  // Общая мощность в ваттах
  const totalPower = avgPowerWatts * totalWeight * eta;

  // Средний градиент
  const gradient = totalAscentMeters / (totalDistanceKm * 1000);

  // Решаем уравнение мощности для скорости
  // Power = P_gravity + P_rolling + P_aero
  let speed = 10.0; // начальное предположение (м/с)

  for (let i = 0; i < 20; i++) {
    const gravityPower = totalWeight * g * gradient * speed;
    const rollingPower = totalWeight * g * crr * speed;
    const aeroPower = 0.5 * cda * rho * Math.pow(speed, 3);

    const totalRequiredPower = gravityPower + rollingPower + aeroPower;
    const powerDifference = totalPower - totalRequiredPower;

    // Корректируем скорость
    speed +=
      powerDifference /
      (totalWeight * g * (gradient + crr) + 1.5 * cda * rho * Math.pow(speed, 2));

    if (Math.abs(powerDifference) < 0.1) break;
  }

  // Конвертируем м/с в км/ч
  const avgSpeedKmH = speed * 3.6;

  // Общее время в секундах
  const totalTimeSeconds = (totalDistanceKm / avgSpeedKmH) * 3600;

  return totalTimeSeconds * 1000;
};
