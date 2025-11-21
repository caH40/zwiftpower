import { tags } from '../../assets/zwift/tags';

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

/**
 * Проверка наличия тэгов для "Единые характеристики для всех велосипедов в Эвенте.
 * !!! Функция сделана только для CommonBike с возможностью последующего расширения.
 * @param {String[]} tagsFromEvent тэги (правила) Эвента (подгруппы).
 * @param {string} label отображаемое название тэга.
 * @returns {boolean} есть или нет
 */
export const enabledCommonBikeSpecsTag = (tagsFromEvent, label) => {
  if (!tagsFromEvent || !Array.isArray(tagsFromEvent)) {
    return false;
  }

  const valuesForCommonBike = tags.find((elm) => elm.label === label)?.value;

  if (!valuesForCommonBike) {
    return false;
  }

  return valuesForCommonBike.every((value) => tagsFromEvent.includes(value));
};

/**
 * Проверяет идентичность маршрутов и их параметров во всех подгруппах заезда
 * @param {Array} subgroups - массив подгрупп заезда
 * @returns {string | null} текст ошибки или null если все совпадает
 */
export const checkSubgroupsRoute = (subgroups) => {
  if (!Array.isArray(subgroups) || subgroups.length === 0) {
    return 'Нет ни одной подгруппы в заезде!';
  }

  if (subgroups.length === 1) {
    return null;
  }

  const validations = [
    { field: 'mapId', name: 'карта (мир)' },
    { field: 'routeId', name: 'маршрут' },
    { field: 'laps', name: 'количество кругов' },
    { field: 'durationInSeconds', name: 'длительность заезда' },
    { field: 'distanceInMeters', name: 'дистанция заезда' },
  ];

  for (let i = 1; i < subgroups.length; i++) {
    const currentSubgroup = subgroups[i];

    for (const validation of validations) {
      const { field, name } = validation;
      const firstValue = subgroups[0][field];
      const currentValue = currentSubgroup[field];

      if (firstValue !== currentValue) {
        const formatValue = (value, fieldName) => {
          if (fieldName === 'durationInSeconds') {
            return `${value} сек.`;
          }
          if (fieldName === 'distanceInMeters') {
            return `${value} м.`;
          }
          if (fieldName === 'laps') {
            return `${value} кругов.`;
          }
          return value;
        };

        return `Несовпадение ${name}! Группа ${subgroups[0].subgroupLabel}: ${formatValue(
          firstValue,
          field
        )}, Группа ${subgroups[i]?.subgroupLabel}: ${formatValue(currentValue, field)}`;
      }
    }
  }

  return null;
};
