import { getPaceValue } from './pace-category';

const ftpMale = {
  APlusLow: 4.6,
  ALow: 4.0,
  BLow: 3.2,
  CLow: 2.5,
};

describe('getPaceValue', () => {
  test('should return object with pace values for group APlusLow', () => {
    const result = getPaceValue('APlusLow');
    expect(result).toEqual({ fromPaceValue: 0, toPaceValue: 6 });
  });

  test('should return object with pace values for group A', () => {
    const result = getPaceValue('A');
    expect(result).toEqual({ fromPaceValue: 0, toPaceValue: 6 });
  });

  test('should return object with pace values for group B', () => {
    const result = getPaceValue('B');
    expect(result).toEqual({ fromPaceValue: ftpMale.ALow, toPaceValue: 6 });
  });

  test('should return object with pace values for group C', () => {
    const result = getPaceValue('C');
    expect(result).toEqual({ fromPaceValue: ftpMale.BLow, toPaceValue: 6 });
  });

  test('should return object with pace values for group D', () => {
    const result = getPaceValue('D');
    expect(result).toEqual({ fromPaceValue: ftpMale.CLow, toPaceValue: 6 });
  });

  test('should return default object if label does not match any group', () => {
    const result = getPaceValue('UnknownGroup');
    expect(result).toEqual({ fromPaceValue: 0, toPaceValue: 6 });
  });
});
