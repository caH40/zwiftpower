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
