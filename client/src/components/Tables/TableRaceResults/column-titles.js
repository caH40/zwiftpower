export const raceResultsColumnsStartFull = [
  { name: '#', id: 0 },
  { name: 'Кат', id: 1 },
  { name: '', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Отс.', id: 5 },
  { name: 'Отс.пр.', id: 6 },
  { name: 'Сред.', id: 7 },
  { name: '', id: 8 },
];
export const raceResultsColumnsStartLg = [
  { name: '#', id: 0 },
  { name: 'Кат', id: 1 },
  { name: '', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Сред.', id: 7 },
  { name: '', id: 8 },
];
export const raceResultsColumnsStartSm = [
  { name: '#', id: 0 },
  { name: 'Кат', id: 1 },
  { name: 'Райдер', id: 3 },
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
  { name: 'Рост', id: 11 },
  { name: 'Возр.', id: 12 },
];

export const raceResultsColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return raceResultsColumnsStartLg;
  if (!isScreenSm) return raceResultsColumnsStartSm;
  return raceResultsColumnsStartFull;
};
