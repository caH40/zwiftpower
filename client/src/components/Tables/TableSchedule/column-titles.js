export const scheduleListColumnsFull = [
  { name: 'Дата', id: 0 },
  { name: '', id: 1 },
  { name: 'Название', id: 2 },
  { name: 'Организатор', id: 3 },
  { name: 'Формат заезда', id: 4 },
  { name: 'Зарегистрировались', id: 5 },
  { name: 'Правила', id: 12 },
  { name: 'Карта', id: 6 },
  { name: 'Маршрут', id: 7 },
  { name: 'Круги', id: 8 },
  { name: 'Расстояние', id: 9 },
  { name: 'Подъем', id: 10 },
  { name: 'Длительность', id: 11 },
];
// export const scheduleListColumnsLg = [
//   { name: 'Дата', id: 0 },
//   { name: 'Название', id: 2 },
//   { name: 'Зарегистрировались', id: 5 },
//   { name: 'Карта', id: 6 },
//   { name: 'Маршрут', id: 7 },
// ];
// export const scheduleListColumnsSm = [
//   { name: 'Дата', id: 0 },
//   { name: 'Название', id: 2 },
//   { name: 'Зарегистрировались', id: 5 },
// ];

export const scheduleListColumns = () => {
  // if (!isScreenLg && isScreenSm) return scheduleListColumnsLg;
  // if (!isScreenSm) return scheduleListColumnsSm;
  return scheduleListColumnsFull;
};
