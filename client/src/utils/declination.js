// склонение слова "круг"
export const getLapsString = (laps) => {
  if (String(laps).slice(-1) === '1') {
    return `${laps} круг`;
  }

  if ([2, 3, 4].includes(laps)) {
    return `${laps} круга`;
  }

  return `${laps} кругов`;
};
// склонение слова "круг"
export const getMinutesString = (minutes) => {
  if (String(minutes).slice(-1) === '1') return '1 минута';
  if ([2, 3, 4].includes(minutes)) return `${minutes} минуты`;
  return `${minutes} минут`;
};
