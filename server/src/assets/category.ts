import { TCategorySeries } from '../types/types.interface';

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

export const eventSubGroups = new Map([
  [1, 'A'],
  [2, 'B'],
  [3, 'C'],
  [4, 'D'],
  [5, 'E'],
]);

// Все возможные категории по мощностным показателям.
export const allCategories: TCategorySeries[] = [
  'APlus',
  'A',
  'BPlus',
  'B',
  'C',
  'D',
  'E',
  'WA',
  'WB',
  'WC',
  'WD',
];

// Объект для подсчета категорий в результатах заехда или серий.
export const categoriesForRankings: Record<TCategorySeries | 'absolute', number> = {
  APlus: 1,
  A: 1,
  BPlus: 1,
  B: 1,
  C: 1,
  D: 1,
  E: 1,
  WA: 1,
  WB: 1,
  WC: 1,
  WD: 1,
  absolute: 1,
};
