export const logsAdminsColumnsFull = [
  { name: '', id: 0 },
  { name: 'Дата', id: 1 },
  { name: 'User', id: 2 },
  { name: 'Действие', id: 3 },
  { name: 'Id', id: 4 },
  { name: 'Название', id: 5 },
  { name: 'Старт', id: 6 },
];
export const logsAdminsColumnsLg = [
  { name: '', id: 10 },
  { name: 'Дата', id: 0 },
  { name: 'User', id: 1 },
  { name: 'Действие', id: 2 },
  { name: 'Id', id: 3 },
  { name: 'Название', id: 4 },
  { name: 'Старт', id: 5 },
];
export const logsAdminsColumnsSm = [
  { name: '', id: 10 },
  { name: 'Дата', id: 0 },
  // { name: 'User', id: 1 },
  { name: 'Действие', id: 2 },
  { name: 'Назв.', id: 4 },
];

export const logsAdminsColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return logsAdminsColumnsLg;
  if (!isScreenSm) return logsAdminsColumnsSm;
  return logsAdminsColumnsFull;
};
