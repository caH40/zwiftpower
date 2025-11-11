/**
 * Выполняет запрос и гарантирует ненулевой результат.
 * @throws {Error} Если результат null или undefined
 */
export async function getOrThrow<T>(
  promise: Promise<T | null>,
  errorMessage: string = 'Не найден ресурс!'
): Promise<T> {
  const response = await promise;

  if (response == null) {
    throw new Error(errorMessage);
  }

  return response;
}
