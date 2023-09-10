// types
import { GetIntervalsArg } from '../../../types/types.interface.js';

/**
 * Поиск данных CP для интервала (interval) в "сырых данных" (powerInWatts) заезда
 */
export const getInterval = ({ powerInWatts, weightInKilogram, interval }: GetIntervalsArg) => {
  // если длительность интервала (количество элементов соответствует секундам)
  // больше длительности заезда
  if (interval > powerInWatts.length) {
    return {
      watts: 0,
      wattsKg: 0,
      duration: interval,
    };
  }

  let cpMax = 0;
  for (let i = 0; i < powerInWatts.length - interval + 1; i++) {
    let cp = 0;

    // суммирование всех значений интервала
    for (let j = i; j < i + interval; j++) {
      cp += powerInWatts[j];
    }

    // обновление максимального значения CP для данного интервала
    if (cp > cpMax) {
      cpMax = cp;
    }
  }

  return {
    watts: Math.round(cpMax / interval),
    wattsKg: Math.round((cpMax / interval / weightInKilogram) * 100) / 100,
    duration: interval,
  };
};
