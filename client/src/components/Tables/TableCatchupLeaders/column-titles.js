export const catchupColumnsFull = [
  { name: 'Дата', id: 0 },
  { name: 'Победа', id: 1 },
  { name: 'Райдер', id: 2 },
  { name: 'Время', id: 3 },
  { name: 'Средняя скорость', id: 12 },
  { name: 'Финиш', id: 4 },
  { name: 'Стартовые гэпы (фора)', id: 11 },
  { name: 'Карта', id: 5 },
  { name: 'Маршрут', id: 6 },
  { name: 'Круги', id: 7 },
  { name: 'Расстояние', id: 8 },
  { name: 'Подъем', id: 9 },
  { name: 'Результаты', id: 10 },
];
// export const catchupColumnsLg = [
//   { name: 'Дата', id: 0 },
//   { name: 'Победа', id: 1 },
//   { name: 'Райдер', id: 2 },
//   { name: 'Время', id: 5 },
//   { name: 'Финиш', id: 6 },
//   { name: 'Результаты', id: 10 },
// ];
// export const catchupColumnsSm = [
//   { name: 'Дата', id: 0 },
//   { name: 'Победа', id: 1 },
//   { name: 'Райдер', id: 2 },
//   { name: 'Результаты', id: 10 },
// ];

export const catchupColumns = (isScreenLg, isScreenSm) => {
  // if (!isScreenLg && isScreenSm) return catchupColumnsLg;
  // if (!isScreenSm) return catchupColumnsSm;
  return catchupColumnsFull;
};
