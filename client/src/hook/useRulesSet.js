import { useSelector } from 'react-redux';

import { rulesPerGroup } from '../assets/zwift/rule';

/**
 * Хук возвращает массив установленных правил rulesSet, которые являются общими для всех подгрупп события.
 */
export const useRulesSet = () => {
  const eventParams = useSelector((state) => state.eventParams);

  // Массив подгрупп.
  const subgroups = [
    eventParams.eventSubgroup_1,
    eventParams.eventSubgroup_2,
    eventParams.eventSubgroup_3,
    eventParams.eventSubgroup_4,
    eventParams.eventSubgroup_5,
  ];

  return getCommonRulesSet(subgroups);
};

/**
 * Возвращает массив установленных общих правил для всех групп.
 * @param {string[]} subgroups - массив подгрупп.
 */
export function getCommonRulesSet(subgroups) {
  // Создаем Set для хранения уникальных правил.
  const rulesSet = new Set();

  // Перебираем подгруппы и добавляем правила в Set
  for (const subgroup of subgroups) {
    if (subgroup?.rulesSet) {
      for (const rule of subgroup.rulesSet) {
        rulesSet.add(rule);
      }
    }
  }

  // Удаление правил, которые устанавливаются отдельно для каждой группы.
  for (const rulesNotCommon of rulesPerGroup) {
    rulesSet.delete(rulesNotCommon.value);
  }

  return Array.from(rulesSet);
}
