export const raceResultsColumnsStartFull = [
  { name: 'Место', id: 1 },
  { name: 'Категория', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Команда', id: 4 },
  { name: 'Время', id: 5 },
  { name: 'Отставание от лидера', id: 6 },
  { name: 'Отставание от райдера впереди', id: 7 },
  { name: 'Средняя скорость', id: 8 },
  { name: 'Удельная средняя мощность за гонку', id: 9 },
  { name: 'Средняя мощность за гонку', id: 10 },
  { name: 'Нормализованная мощность', id: 11 },
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
  { name: 'Рейтинговые очки', tooltip: 'Гоночные рейтинговые очки', id: 21 },
  { name: 'Пульс', id: 22 },
  { name: 'Вес', id: 23 },
  { name: 'Рост', id: 24 },
  { name: 'Возраст', id: 25 },
  { name: 'ZPRU Очки', id: 26, tooltip: 'zpru рейтинговые очки' },
  { name: 'Разное', id: 27 },
];

export const raceResultsColumns = (setShowIndex) => {
  if (setShowIndex) {
    return [{ name: '#', id: 0 }, ...raceResultsColumnsStartFull];
  }
  return raceResultsColumnsStartFull;
};
