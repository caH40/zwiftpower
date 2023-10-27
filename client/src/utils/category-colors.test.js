import { getCategoryColors } from './category-colors';

test('should first', () => {
  // группа А+, мужчины
  expect(getCategoryColors([{ ftp: 4.5, quantityMale: 44, quantityFemale: 2 }], true)).toBe(
    'rgba(0, 0, 0, 0.7)'
  );
});
