import { zFTP, zMAP } from '../assets/rule-category';
import { racingScoreDefault as rs } from '../assets/rule-category';

export const getCategoryZFTP = (wattsPerKg, watts) => {
  if (wattsPerKg >= zFTP.A.wattsPerKg && watts >= zFTP.A.watts) return 'A';
  if (wattsPerKg >= zFTP.B.wattsPerKg && watts >= zFTP.B.watts) return 'B';
  if (wattsPerKg >= zFTP.C.wattsPerKg && watts >= zFTP.C.watts) return 'C';
  return 'D';
};
export const getCategoryZMAP = (wattsPerKg) => {
  if (wattsPerKg >= zMAP.A.wattsPerKg) return 'A';
  if (wattsPerKg >= zMAP.B.wattsPerKg) return 'B';
  if (wattsPerKg >= zMAP.C.wattsPerKg) return 'C';
  return 'D';
};

/**
 * Получение названия категории в зависимости от значения racingScore
 * @param {number} racingScore
 * @returns {'APlus' | 'A' | 'B' | 'C' | 'D' | null} возвращается название категории,
 *  или null если значение не попало ни в один диапазон.
 */
export const getCategoryRacingScore = (racingScore) => {
  // Округление до двух знаков после запятой, так как диапазоны указаны с этой точностью.
  const rsRounded = parseFloat(racingScore.toFixed(2));

  for (const [key, value] of Object.entries(rs)) {
    if (rsRounded >= value.min && rsRounded <= value.max) {
      return key;
    }
  }

  return null;
};

/**
 * Изменение названия группы в гэпах для Эвента.
 */
export function changeLabelCategoryInGaps({ gaps, oldLabel, newLabel }) {
  return gaps.map((gap) =>
    gap.subgroupLabel === oldLabel ? { ...gap, subgroupLabel: newLabel } : gap
  );
}
