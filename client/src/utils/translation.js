const dictionary = new Map([
  ['news', 'Новости'],
  ['development', 'Разработка сайта'],
  ['events', 'Заезды'],
]);

/**
 * Перевод иностранных слов (название свойств, ключей объектов).
 * @param {string} word Слово которое необходимо перевести.
 * @returns {string} Переведенное слово.
 */
export function getTranslation(word) {
  return dictionary.get(word) || word;
}
