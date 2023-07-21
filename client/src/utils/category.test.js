import { getCategoryZFTP, getCategoryZMAP } from './category';

test('Getting a zFTP category', () => {
  expect(getCategoryZFTP(4.2, 250)).toBe('A');
  expect(getCategoryZFTP(4.2, 251)).toBe('A');

  expect(getCategoryZFTP(4.2, 200)).toBe('B');
  expect(getCategoryZFTP(4.199, 251)).toBe('B');
  expect(getCategoryZFTP(3.36, 210)).toBe('B');

  expect(getCategoryZFTP(4.199, 199.99)).toBe('C');
  expect(getCategoryZFTP(3.3599, 210)).toBe('C');
  expect(getCategoryZFTP(2.625, 150)).toBe('C');

  expect(getCategoryZFTP(2.6249, 210)).toBe('D');
  expect(getCategoryZFTP(3.9, 149)).toBe('D');
  expect(getCategoryZFTP(2, 130)).toBe('D');
});

test('Getting a zMAP category', () => {
  expect(getCategoryZMAP(6, 500)).toBe('A');
  expect(getCategoryZMAP(5.1, 250)).toBe('A');
  expect(getCategoryZMAP(5.099, 350)).toBe('B');
  expect(getCategoryZMAP(4.1, 350)).toBe('B');
  expect(getCategoryZMAP(4.0999, 350)).toBe('C');
  expect(getCategoryZMAP(3.2, 350)).toBe('C');
  expect(getCategoryZMAP(3.1999, 350)).toBe('D');
});
