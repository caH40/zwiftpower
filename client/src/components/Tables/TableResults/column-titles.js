export const resultsColumnsFull = [
  { name: 'Дата', id: 0 },
  { name: '', id: 1 },
  { name: 'Название', id: 2 },
  { name: 'Организатор', id: 3 },
  // { name: 'Формат заезда', id: 4 },
  { name: 'Финиш', id: 5 },
  { name: 'Карта', id: 6 },
  { name: 'Маршрут', id: 7 },
  { name: 'Круги', id: 8 },
  { name: 'Расстояние', id: 9 },
  { name: 'Подъем', id: 10 },
  { name: 'Длительность', id: 11 },
];
// export const resultsColumnsLg = [
//   { name: 'Дата', id: 0 },
//   { name: '', id: 1 },
//   { name: 'Название', id: 2 },
//   { name: 'Организатор', id: 3 },
//   { name: 'Формат заезда', id: 4 },
//   { name: 'Финиш', id: 5 },
//   { name: 'Карта', id: 6 },
//   { name: 'Маршрут', id: 7 },
//   { name: 'Круги', id: 8 },
//   { name: 'Расстояние', id: 9 },
//   { name: 'Подъем', id: 10 },
//   // { name: 'Длительность', id: 11 },
// ];
// export const resultsColumnsMd = [
//   { name: 'Дата', id: 0 },
//   { name: 'Название', id: 1 },
//   { name: 'Финиш', id: 5 },
//   { name: 'Карта', id: 6 },
//   { name: 'Маршрут', id: 7 },
// ];
// export const resultsColumnsSm = [
//   { name: 'Дата', id: 0 },
//   { name: 'Название', id: 1 },
//   { name: 'Финиш', id: 5 },
// ];

export const resultsColumns = () => {
  // if (!isScreenLg && isScreenMd) return resultsColumnsLg;
  // if (!isScreenLg && !isScreenMd && isScreenSm) return resultsColumnsMd;
  // if (!isScreenSm) return resultsColumnsSm;
  return resultsColumnsFull;
};
