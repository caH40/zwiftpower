export const zFTP = {
  A: { wattsPerKg: 4.2, watts: 250 },
  B: { wattsPerKg: 3.36, watts: 200 },
  C: { wattsPerKg: 2.625, watts: 150 },
};
export const zMAP = {
  A: { wattsPerKg: 5.1 },
  B: { wattsPerKg: 4.1 },
  C: { wattsPerKg: 3.2 },
};

export const racingScoreDefault = {
  A: { min: 690, max: 1000 },
  B: { min: 520, max: 689.99 },
  C: { min: 350, max: 519.99 },
  D: { min: 180, max: 349.99 },
  E: { min: 1, max: 179.99 },
};

/**
 * Категории из ZwiftPower для мужчин
 */
export const ftpMale = {
  APlusLow: 4.6,
  ALow: 4.0,
  BLow: 3.2,
  CLow: 2.5,
};

/**
 * Категории из ZwiftPower для женщин
 */
export const ftpFemale = {
  ALow: 3.7,
  BLow: 3.2,
  CLow: 2.5,
};
export const zFTPInterval = 2400;
export const zMAPInterval = 300;

/**
 * Цвета в зависимости от категорий
 */
export const getColorCategory = (isMale, opacity = 1) => {
  const colors = [
    `rgba(0, 0, 0, ${opacity})`,
    `rgba(220, 65, 25, ${opacity})`,
    `rgba(88, 195, 78,${opacity})`,
    `rgba(62, 192, 233, ${opacity})`,
    `rgba(252, 207, 11, ${opacity})`,
  ];

  if (isMale) {
    return colors;
  } else {
    colors.shift();
    return colors;
  }
};
