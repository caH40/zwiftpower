/**
 * Правила категорий по zwiftpower
 * данные это ftp = CP20*0.95 нижние границы
 */
export const categoryMale = {
  APlus: {
    ftpWattsPerKg: 4.6,
    ftpWatts: 300,
  },
  A: {
    ftpWattsPerKg: 4.0,
    ftpWatts: 250,
  },
  B: {
    ftpWattsPerKg: 3.2,
    ftpWatts: 200,
  },
  C: {
    ftpWattsPerKg: 2.5,
    ftpWatts: 150,
  },
};

export const categoryFemale = {
  A: { ftpWattsPerKg: 3.7 },
  B: { ftpWattsPerKg: 3.2 },
  C: { ftpWattsPerKg: 2.5 },
};
