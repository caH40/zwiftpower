export const signedRidersColumnsFull = [
  { name: '#', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Райдер', id: 2 },
  { name: 'Команда', id: 3 },
  { name: 'Вес', id: 4 },
  { name: 'Рост', id: 5 },
  { name: 'Возраст', id: 6 },
  { name: 'Пол', id: 7 },
  { name: 'zp.com', id: 8 },
];
export const signedRidersColumnsLg = [
  { name: '#', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Райдер', id: 2 },
  { name: 'Вес', id: 4 },
  { name: 'Рост', id: 5 },
];
export const signedRidersColumnsSm = [
  { name: '#', id: 0 },
  { name: '', id: 1 },
  { name: 'Райдер', id: 2 },
];
export const signedRidersColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return signedRidersColumnsLg;
  if (!isScreenSm) return signedRidersColumnsSm;
  return signedRidersColumnsFull;
};
