export const raceResultsColumnsStartFull = [
  { name: '', id: 0 },
  { name: 'Dsq', id: 1 },
  { name: 'Категория', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Отставание от лидера', id: 5 },
  { name: 'Отставание от райдера впереди', id: 6 },
  { name: 'Удельная средняя мощность за гонку', id: 7 },
  { name: 'Средняя мощность за гонку', id: 8 },
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
  { name: 'Возраст', id: 12 },
  { name: 'Разное', id: 13 },
];

export const raceResultsColumns = () => {
  return raceResultsColumnsStartFull;
};
