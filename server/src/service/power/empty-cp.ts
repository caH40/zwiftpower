import { intervals } from './intervals-cp.js';

// types
import { ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Формирования CP при отсутствии активности у райдера (запрет доступа к активности)
 * данные берется из результата Эвента - result.criticalP
 */
export function getCPFromResult(result: ResultEventAdditional) {
  const cpBestEfforts = [];

  const criticalPower = new Map([
    [15, result.criticalP.criticalP15Seconds],
    [60, result.criticalP.criticalP1Minute],
    [300, result.criticalP.criticalP5Minutes],
    [1200, result.criticalP.criticalP20Minutes],
  ]);

  for (const interval of intervals) {
    const criticalPowerCurrent = criticalPower.get(interval);

    let wattsKg: number | null = null;
    // удельные ватты с округлением до сотых
    if (criticalPowerCurrent) {
      wattsKg =
        Math.round((criticalPowerCurrent / result.profileData.weightInGrams) * 100000) / 100;
    } else {
      wattsKg = null;
    }

    cpBestEfforts.push({
      watts: criticalPowerCurrent ?? null,
      wattsKg,
      cpLabel: `${interval} sec`,
      duration: interval,
    });
  }

  return cpBestEfforts;
}

/**
 * Формирования массива пустых CP по заданным интервалам
 */
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
