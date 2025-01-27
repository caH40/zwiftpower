/**
 * Перевод из (male,female) в (мужской, женский)
 */
export const getGender: { [key: string]: string } = {
  male: 'мужской',
  female: 'женский',
  мужской: 'male',
  женский: 'female',
};

/**
 * Преобразует байты в килобайты или мегабайты.
 * @param bytes Количество байт для преобразования.
 * @param targetUnit Целевая единица измерения ('kB' для килобайт, 'mB' для мегабайт).
 * @returns Преобразованное значение.
 */
export const convertBytesTo = (bytes: number, targetUnit: 'kB' | 'mB') => {
  const KValue = 1024;
  if (targetUnit === 'kB') {
    return Math.round(bytes / KValue);
  }
  return Math.round(bytes / (KValue * KValue));
};
