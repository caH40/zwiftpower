/**
 * Проверка наличия правила в общих настройках Эвента
 * @param {*} event данные отображаемого Эвента
 * @param {*} rule правило, наличие которого проверяется в Эвенте
 * @returns {boolean} есть или нет
 */
export const enabledRule = (event, rule) => {
  return event.rulesSet?.includes(rule);
};

/**
 * Проверяет, установлено ли хотя бы в одной подгруппе правило rule.
 * @param {*} event данные отображаемого Эвента
 * @param {*} rule правило, наличие которого проверяется в Эвенте
 * @returns {boolean} есть или нет
 */
export const enabledRuleInSubgroups = (event, rule) => {
  for (const subgroup of event.eventSubgroups) {
    if (subgroup?.rulesSet?.includes(rule)) {
      return true;
    }
  }
  return false;
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
  return event.tags?.includes(tag);
};
