export const leadersInIntervalsColumns = (type) => {
  const columnName =
    type === 'watts' ? 'Средняя мощность за интервал' : 'Удельная средняя мощность за интервал';
  return [
    { name: '', id: 0 },
    { name: columnName, id: 1 },
    { name: 'Райдер', id: 2 },
    { name: 'Название', id: 3 },
    { name: 'Дата', id: 4 },
  ];
};
