import { CpBestEffortsAdditional } from '../types/types.interface';

/**
 * Универсальная сортировка результатов по критериям Critical Power (CP).
 *
 * Поддерживает сортировку как по `watts`, так и по `wattsKg`,
 * определяя тип и продолжительность из строки `columnName`, например:
 * - `"cp-watts-300"` → сортировка по мощности (watts) на 300 сек
 * - `"cp-wattsKg-60"` → сортировка по W/kg на 60 сек
 *
 * @template T Обобщённый тип результата с полем `cpBestEfforts`.
 * @param {Object} params - Параметры сортировки.
 * @param {T[]} params.results - Массив результатов для сортировки (изменяется на месте).
 * @param {string} params.columnName - Имя колонки в формате `"cp-{тип}-{длительность}"`.
 * @param {boolean} params.isRasing - Направление сортировки (`true` — по возрастанию, `false` — по убыванию).
 */
export function sortByCP<T extends { cpBestEfforts: CpBestEffortsAdditional[] }>({
  results,
  columnName,
  isRasing,
}: {
  results: T[];
  columnName: string;
  isRasing: boolean;
}) {
  // Пример columnName: "cp-wattsKg-300"
  const parts = columnName.split('-');

  if (parts.length !== 3) {
    return;
  }

  const columnType = parts[1] as 'watts' | 'wattsKg';
  const columnValue = Number(parts[2]);

  if (!['watts', 'wattsKg'].includes(columnType) || Number.isNaN(columnValue)) {
    return;
  }

  results.sort((a, b) => {
    const getValue = (rider: T) =>
      rider.cpBestEfforts?.find((cp) => cp.duration === columnValue)?.[columnType].value ?? 0;

    const aVal = getValue(a);
    const bVal = getValue(b);

    return isRasing ? aVal - bVal : bVal - aVal;
  });
}
