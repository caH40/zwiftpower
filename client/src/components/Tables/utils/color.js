// выбор цвета для спринтовой или горной номинации
export const backgroundColorSM = (pointsType, result, sequenceNumber) => {
  const backgroundType = pointsType === 'pointsSprint' ? '#58c34e' : 'red';
  return result[pointsType][sequenceNumber - 1].place === 'none' ? '#ffffff' : backgroundType;
};
