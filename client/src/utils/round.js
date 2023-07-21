// округление строки где может быть слово "max" до нужной точности dimension:
// integer целое число, ten до десятых, hundred - до сотых
export function roundValue(value, dimension) {
  if (!value || value === '0') return null;
  const dimensions = { integer: 1, ten: 10, hundred: 100 };
  const sizes = { integer: 0, ten: 1, hundred: 2 };

  if (String(value).includes('max')) {
    return (
      (
        Math.round(value.split('max')[0] * dimensions[dimension]) / dimensions[dimension]
      ).toFixed(sizes[dimension]) + 'max'
    );
  } else {
    return (Math.round(value * dimensions[dimension]) / dimensions[dimension]).toFixed(
      sizes[dimension]
    );
  }
}
