export const timePerformance = () => Date.now();
export const showPerformance = (start: number, end: number): void => {
  console.log(`Время выполнения: ${end - start} мс`); // eslint-disable-line
};
