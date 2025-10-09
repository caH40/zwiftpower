// types
import {
  TCategoriesWithRange,
  TCategoryRange,
  TFtpData,
  TRiderCP,
} from '../types/series.types';
import { TRaceSeriesCategories } from '../types/types.interface';

/**
 * Райдер проехал дистанцию и у него посчитаны ватты и удельные ватты на
 * стандартных интервалах: 15, 60, 300, 1200 и FTP.
 *
 * Получить интервалы по которым определяется категория в Серии заездов.
 *
 *
 */

/**
 * Функция определения категории.
 *
 * Перебираем по интервалам с мощностям в правилах определения категории.
 * Для определения достаточно любого совпадения в любом интервале, для определения категории,
 * То есть действует логика определения категории когда interval1 || interval2 || interval3
 *
 */
// types assumed to be already declared:
// TRiderCP, TFtpData, TCategoriesWithRange, TCategoryRange, TCategorySeries

function compare(
  riderValue: number,
  rangeValue: number,
  operand: '>' | '<' | '>=' | '<='
): boolean {
  switch (operand) {
    case '>':
      return riderValue > rangeValue;
    case '<':
      return riderValue < rangeValue;
    case '>=':
      return riderValue >= rangeValue;
    case '<=':
      return riderValue <= rangeValue;
    default:
      return false;
  }
}

export function calculateRiderCategory({
  riderCPs,
  riderFtp,
  categoriesWithRange,
}: {
  riderCPs: TRiderCP[];
  riderFtp: TFtpData;
  categoriesWithRange: TCategoriesWithRange[];
}): TRaceSeriesCategories | null {
  // проверяем категории по порядку (старшие → младшие)
  for (const { ftpRange, ranges, label } of categoriesWithRange) {
    // 1) совпадение по CP-интервалам (OR между интервалами)
    const cpOk = checkCPMatch(riderCPs, ranges);

    // 2) совпадение по FTP.wattPerKg
    const ftpPerKgOk = compare(
      riderFtp.wattPerKg,
      ftpRange.wattPerKg.value,
      ftpRange.wattPerKg.operand
    );

    // базовое совпадение: достаточно CP или FTP.w/kg
    let baseMatch = cpOk || ftpPerKgOk;

    // 3) если задан ftp.watt — комбинируем с baseMatch согласно wattLogic
    if (ftpRange.watt) {
      const ftpWattOk = compare(riderFtp.watt, ftpRange.watt.value, ftpRange.watt.operand);

      if (ftpRange.wattLogic === 'AND') {
        // требуется и baseMatch, и ftpWattOk
        baseMatch = baseMatch && ftpWattOk;
      } else {
        // OR по умолчанию: достаточно baseMatch или ftpWattOk
        baseMatch = baseMatch || ftpWattOk;
      }
    }

    if (baseMatch) {
      return label; // первая (старшая) подходящая категория
    }
  }

  return null;
}

function checkCPMatch(riderCPs: TRiderCP[], ranges: TCategoryRange[]): boolean {
  if (ranges.length === 0) {
    return true;
  } // если диапазонов нет, то считаем что CP подходит

  return ranges.some((range) => {
    const riderCP = riderCPs.find((r) => r.interval === range.interval);
    if (!riderCP) return false;
    return compare(riderCP.wattPerKg, range.wattPerKg.value, range.wattPerKg.operand);
  });
}
