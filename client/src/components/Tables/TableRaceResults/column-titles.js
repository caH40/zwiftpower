export const raceResultsColumnsStartFull = [
  { name: 'Место', id: 1 },
  { name: 'Категория', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Отставание от лидера', id: 5 },
  { name: 'Отставание от райдера впереди', id: 6 },
  { name: 'Средняя скорость', id: 7 },
  { name: 'Удельная средняя мощность за гонку', id: 8 },
  { name: 'Средняя мощность за гонку', id: 9 },
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
  { name: 'Пульс', id: 10 },
  { name: 'Вес', id: 11 },
  { name: 'Рост', id: 12 },
  { name: 'Возраст', id: 13 },
  { name: 'Разное', id: 14 },
];

export const raceResultsColumns = (setShowIndex) => {
  if (setShowIndex) {
    return [{ name: '#', id: 0 }, ...raceResultsColumnsStartFull];
  }
  return raceResultsColumnsStartFull;
};
