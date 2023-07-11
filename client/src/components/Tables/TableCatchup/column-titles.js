export const scheduleListColumnsFull = [
  { name: 'Дата', id: 0 },
  { name: 'Название', id: 1 },
  { name: 'Организатор', id: 2 },
  { name: 'Формат заезда', id: 3 },
  { name: 'Зарегистрировались', id: 4 },
  { name: 'Карта', id: 5 },
  { name: 'Маршрут', id: 6 },
  { name: 'Круги', id: 7 },
  { name: 'Расстояние', id: 8 },
  { name: 'Подъем', id: 9 },
  { name: 'Длительность', id: 10 },
];
export const scheduleListColumnsLg = [
  { name: 'Дата', id: 0 },
  { name: 'Название', id: 1 },
  { name: 'Зарегистрировались', id: 4 },
  { name: 'Карта', id: 5 },
  { name: 'Маршрут', id: 6 },
];
export const scheduleListColumnsSm = [
  { name: 'Дата', id: 0 },
  { name: 'Название', id: 1 },
  { name: 'Зарегистрировались', id: 4 },
];

export const scheduleListColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return scheduleListColumnsLg;
  if (!isScreenSm) return scheduleListColumnsSm;
  return scheduleListColumnsFull;
};
