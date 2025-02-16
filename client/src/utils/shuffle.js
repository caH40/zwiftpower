/**
 * Перемешивает элементы массива в случайном порядке (алгоритм Фишера-Йетса).
 *
 * @template T
 * @param {T[]} array - Исходный массив, который нужно перемешать.
 * @returns {T[]} Новый массив с элементами в случайном порядке.
 *
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}
