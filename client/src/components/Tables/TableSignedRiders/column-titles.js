export const signedRidersColumnsFull = [
  { name: '#', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Райдер', id: 2 },
  { name: 'Команда', id: 3 },
  { name: '15с', id: 4 },
  { name: '5м', id: 5 },
  { name: '40м', id: 6 },
  { name: 'Вес', id: 7 },
  { name: 'Рост', id: 8 },
  { name: 'Возраст', id: 9 },
  { name: 'zp.com', id: 10 },
];
// export const signedRidersColumnsLg = [
//   { name: '#', id: 0 },
//   { name: 'Категория', id: 1 },
//   { name: 'Райдер', id: 2 },
//   { name: '15с', id: 4 },
//   { name: '5м', id: 5 },
//   { name: '20м', id: 6 },
// ];
// export const signedRidersColumnsSm = [
//   { name: '#', id: 0 },
//   { name: 'Категория', id: 1 },
//   { name: 'Райдер', id: 2 },
//   { name: '20м', id: 6 },
// ];
export const signedRidersColumns = (isScreenLg, isScreenSm) => {
  // if (!isScreenLg && isScreenSm) return signedRidersColumnsLg;
  // if (!isScreenSm) return signedRidersColumnsSm;
  return signedRidersColumnsFull;
};
