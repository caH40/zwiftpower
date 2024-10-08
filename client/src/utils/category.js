// определение категорий, согласно правилам getCategoryZFTP
import { zFTP, zMAP } from '../assets/rule-category';

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
 * Изменение названия группы в гэпах для Эвента.
 */
export function changeLabelCategoryInGaps({ gaps, oldLabel, newLabel }) {
  return gaps.map((gap) =>
    gap.subgroupLabel === oldLabel ? { ...gap, subgroupLabel: newLabel } : gap
  );
}
