import { intervals } from './intervals-cp.js';

// формирования массива пустых CP по заданным интервалам
export function getEmptyCP() {
  const cpBestEfforts = [];
  for (const interval of intervals) {
    cpBestEfforts.push({
      watts: null,
      wattsKg: null,
      cpLabel: `${interval} sec`,
      duration: interval,
    });
  }
  return cpBestEfforts;
}
