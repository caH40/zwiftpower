// склонение слова "круг"
export const getLapsString = (laps) => {
  if (String(laps).slice(-1) === '1') return '1 круг';
  if ([2, 3, 4].includes(laps)) return `${laps} круга`;
  return `${laps} кругов`;
};
