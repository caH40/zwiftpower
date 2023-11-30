/**
 * Проверка наличия правила в Эвенте
 * @param {*} event данные отображаемого Эвента
 * @param {*} rule правило, наличие которого проверяется в Эвенте
 * @returns {boolean} есть или нет
 */
export const enabledRule = (event, rule) => {
  return event.rulesSet.includes(rule);
};

/**
 * Проверка наличия тэга (tag) в Эвенте
 * @param {*} event данные отображаемого Эвента
 * @param {string} tag тэга, наличие которого проверяется в Эвенте
 * @returns {boolean} есть или нет
 */
export const enabledRuleInTag = (event, tag) => {
  const isFound = event.eventSubgroups[0]?.tags?.find((elm) => elm === tag);
  if (isFound) {
    return true;
  }
  return event.tags.includes(tag);
};
