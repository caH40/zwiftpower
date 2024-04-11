import { ftpMale } from '../assets/rule-category';

/**
 * Получение значений Pace категорий для настроек параметров групп
 * @param {'A' | 'B' | 'C' | 'D' | 'E'} label - название группы
 * @returns {{ fromPaceValue: number, toPaceValue: number }} Min Max Pace текущей группы.
 */
export const getPaceValue = (label) => {
  switch (label) {
    case 'APlusLow': {
      return getObject(ftpMale.APlusLow);
    }
    case 'A': {
      return getObject(ftpMale.ALow);
    }
    case 'B': {
      return getObject(ftpMale.BLow, ftpMale.ALow);
    }
    case 'C': {
      return getObject(ftpMale.CLow, ftpMale.BLow);
    }
    case 'D': {
      return getObject(ftpMale.DLow, ftpMale.CLow);
    }
    default: {
      return getObject();
    }
  }
};

/**
 * Создает объект с минимальным и максимальным значениями Pace.
 * @param {number} paceLow - Минимальное значение Pace текущей группы.
 * @param {number} [nextPaceLow] - Минимальное значение Pace следующей группы.
 * @returns {{ fromPaceValue: number, toPaceValue: number }} Min Max Pace текущей группы.
 */
function getObject(paceLow, nextPaceLow) {
  return {
    fromPaceValue: paceLow ? paceLow : 0,
    toPaceValue: nextPaceLow ? Math.trunc((nextPaceLow - 0.01) * 100) / 100 : 6,
  };
}
