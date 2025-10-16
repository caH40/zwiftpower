export const raceResultsColumnsStartFull = [
  { name: '', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Дата', id: 2 },
  { name: 'Название', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Средняя скорость', id: 5 },
  { name: 'Удельная средняя мощность за гонку', id: 6 },
  { name: 'Средняя мощность за гонку', id: 7 },
  { name: 'Нормализованная мощность', id: 8 },
];

export const raceResultsColumnsEnd = [
  { name: 'Пульс', id: 9 },
  { name: 'Вес', id: 10 },
];

export const raceResultsColumns = () => {
  return raceResultsColumnsStartFull;
};
