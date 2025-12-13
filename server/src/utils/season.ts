import { isValidYearString } from '../checkYear.js';

/**
 * Сезон начинается с 01.09.xx, заканчивается 31.08.xx.
 * @param date - Дата для определения её принадлежности к сезону.
 */
export function getSeasonPeriod(date: Date): { label: string; start: Date; end: Date } | null {
  const currentYear = date.getFullYear();

  for (let y = currentYear - 1; y <= currentYear + 1; y++) {
    const label = `${y}-${y + 1}`;
    const start = new Date(Date.UTC(y, 8, 1));
    const end = new Date(Date.UTC(y + 1, 7, 31, 23, 59, 59, 999));

    if (date >= start && date <= end) {
      return { label, start, end };
    }
  }

  return null;
}

/**
 * Получение даты старта и завершения сезона.
 * @param Название сезона в виде 2023-2024, где 2023 - год начала сезона, 2024 - завершения.
 */
export function parseSeasonLabel(
  label: string
): { label: string; start: Date; end: Date } | null {
  if (!label) {
    return null;
  }

  const [startRaw, endRaw] = label.split('-');

  if (!isValidYearString(startRaw) || !isValidYearString(endRaw) || +endRaw !== +startRaw + 1) {
    return null;
  }

  const start = new Date(Date.UTC(+startRaw, 8, 1)); // 1 сентября.
  const end = new Date(Date.UTC(+endRaw, 7, 31, 23, 59, 59, 999)); // 31 августа.

  return { label, start, end };
}
