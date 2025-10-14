import { getSeasonPeriod } from './season';

describe('getSeasonPeriod', () => {
  it('возвращает правильный сезон для даты внутри сезона', () => {
    const date = new Date('2025-02-15'); // февраль 2025
    const result = getSeasonPeriod(date);

    expect(result).not.toBeNull();
    expect(result?.label).toBe('2024-2025');
    expect(result?.start.toISOString()).toBe(new Date(Date.UTC(2024, 8, 1)).toISOString());
    expect(result?.end.toISOString()).toBe(
      new Date(Date.UTC(2025, 7, 31, 23, 59, 59, 999)).toISOString()
    );
  });

  it('корректно определяет начало сезона', () => {
    const date = new Date('2024-09-01');
    const result = getSeasonPeriod(date);

    expect(result?.label).toBe('2024-2025');
  });

  it('корректно определяет конец сезона', () => {
    const date = new Date('2025-08-31T23:59:59Z');
    const result = getSeasonPeriod(date);

    expect(result?.label).toBe('2024-2025');
  });

  it('возвращает предыдущий сезон для даты в августе', () => {
    const date = new Date('2022-02-15');
    const result = getSeasonPeriod(date);

    expect(result?.label).toBe('2021-2022');
  });
});
