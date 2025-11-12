/**
 * Фильтрация названий колонок таблиц от скрытых колонок.
 * @param {{name:string}[]} column
 * @param {string[]} hiddenColumns
 * @returns
 */
export function filterColumn(column, hiddenColumns) {
  return column.filter((c) => !hiddenColumns.includes(c.name));
}

export default function ShowColumn({ columnName, hiddenColumns, children }) {
  return hiddenColumns?.includes(columnName) ? null : children;
}
