export const raceResultsColumnsStartFull = [
  { name: '', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Дата', id: 2 },
  { name: 'Название', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Средняя мощность за гонку', id: 5 },
  { name: 'Относительная средняя мощность за гонку', id: 6 },
];
export const raceResultsColumnsStartLg = [
  { name: '', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Дата', id: 2 },
  { name: 'Название', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Средняя мощность за гонку', id: 5 },
  { name: 'Относительная средняя мощность за гонку', id: 6 },
];
export const raceResultsColumnsStartSm = [
  { name: '', id: 0 },
  { name: 'Дата', id: 2 },
  { name: 'Название', id: 3 },
  { name: 'Время', id: 4 },
];
export const raceResultsColumnsCP = [
  { name: '5с', id: 100 },
  { name: '30с', id: 101 },
  { name: '1м', id: 102 },
  { name: '5м', id: 103 },
  { name: '12м', id: 104 },
  { name: '20м', id: 105 },
  { name: '40м', id: 106 },
];
export const raceResultsColumnsEnd = [
  { name: 'Пульс', id: 9 },
  { name: 'Вес', id: 10 },
];

export const raceResultsColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return raceResultsColumnsStartLg;
  if (!isScreenSm) return raceResultsColumnsStartSm;
  return raceResultsColumnsStartFull;
};
