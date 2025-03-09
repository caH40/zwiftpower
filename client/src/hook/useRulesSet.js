import { useSelector } from 'react-redux';

/**
 * Хук возвращает массив установленных правил rulesSet, которые являются общими для всех подгрупп события.
 */
export const useRulesSet = () => {
  const eventParams = useSelector((state) => state.eventParams);

  // Создаем Set для хранения уникальных правил.
  const rulesSet = new Set();

  // Массив подгрупп.
  const subgroups = [
    eventParams.eventSubgroup_1,
    eventParams.eventSubgroup_2,
    eventParams.eventSubgroup_3,
    eventParams.eventSubgroup_4,
    eventParams.eventSubgroup_5,
  ];

  // Перебираем подгруппы и добавляем правила в Set
  for (const subgroup of subgroups) {
    if (subgroup?.rulesSet) {
      for (const rule of subgroup.rulesSet) {
        rulesSet.add(rule);
      }
    }
  }

  return Array.from(rulesSet);
};
