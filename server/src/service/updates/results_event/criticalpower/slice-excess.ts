/**
 * Исключение данных мощности, полученных после завершения гонки (исключение закатки после гонки)
 */
export const sliceExcess = (powerArray: number[], time: number): number[] => {
  const secondsInRace = Math.round(time / 1000);
  return powerArray?.slice(0, secondsInRace);
};
