export const logsAdminsColumnsFull = [
  { name: 'Дата', id: 0 },
  { name: 'User', id: 1 },
  { name: 'Действие', id: 2 },
  { name: 'Id', id: 3 },
  { name: 'Название', id: 4 },
  { name: 'Старт', id: 5 },
];
export const logsAdminsColumnsLg = [
  { name: 'Дата', id: 0 },
  { name: 'User', id: 1 },
  { name: 'Действие', id: 2 },
  { name: 'Id', id: 3 },
  { name: 'Название', id: 4 },
  { name: 'Старт', id: 5 },
];
export const logsAdminsColumnsSm = [
  { name: 'Дата', id: 0 },
  { name: 'User', id: 1 },
  { name: 'Действие', id: 2 },
  { name: 'Назв.', id: 4 },
];

export const logsAdminsColumns = (isScreenLg, isScreenSm) => {
  if (!isScreenLg && isScreenSm) return logsAdminsColumnsLg;
  if (!isScreenSm) return logsAdminsColumnsSm;
  return logsAdminsColumnsFull;
};
