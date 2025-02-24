type Params = { oldArray: string[]; newArray: string[] };
type Response = { added: string[]; removed: string[] };
/**
 * Сравнивает два массива строк и возвращает добавленные и удаленные элементы.
 * @param {object} params - Входные параметры.
 * @param {string[]} params.oldArray - Первый массив (старый).
 * @param {string[]} params.newArray - Второй массив (новый).
 * @returns {{ added: string[]; removed: string[] }} - Объект с добавленными и удаленными элементами.
 */
export function compareArrays({ oldArray, newArray }: Params): Response {
  // Преобразуем массивы в Set для удобства работы.
  const oldSet = new Set(oldArray);
  const newSet = new Set(newArray);

  // Находим добавленные элементы (есть в newArray, но нет в oldArray).
  const added = [...newSet].filter((item) => !oldSet.has(item));

  // Находим удаленные элементы (есть в oldArray, но нет в newArray).
  const removed = [...oldSet].filter((item) => !newSet.has(item));

  return { added, removed };
}
