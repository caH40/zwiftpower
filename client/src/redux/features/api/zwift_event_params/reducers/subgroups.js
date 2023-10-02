import { labelsSubgroups } from '../../../../../assets/subgroups';

/**
 * Проверка наличия обязательных подгрупп в Эвенте для данного паттерна,
 * или наличие лишних поддгрупп
 */
export const checkingRequiredSubgroups = (eventParams, requiredLabels) => {
  // массив с номерами подгрупп в Эвенте
  const labelsInRaw = eventParams.eventSubgroups.map((subgroup) => subgroup.label);

  // поиск отсутствующий подгрупп в Эвенте
  // requiredLabels необходимые подгруппы в текущем Эвенте
  const absentSubgroups = requiredLabels.filter((elm) => !labelsInRaw.includes(elm.label));

  const lengthAbs = absentSubgroups.length;
  if (lengthAbs) {
    const message =
      lengthAbs === 1 ? 'Отсутствует обязательная группа' : 'Отсутствуют обязательные группы';
    throw Error(`${message}: ${absentSubgroups.map((elm) => elm.subgroupLabel).join(', ')}`);
  }

  // поиск лишних подгрупп в Эвенте
  const excessSubgroups = labelsInRaw.filter(
    (elm) => !requiredLabels.map((label) => label.label).includes(elm)
  );

  const lengthExc = excessSubgroups.length;
  if (lengthExc) {
    const message =
      lengthExc === 1 ? 'Присутствует лишняя группа' : 'Присутствуют лишние группы';
    throw Error(
      `${message}: ${excessSubgroups
        .map((elm) => labelsSubgroups.find((label) => label.label === elm).subgroupLabel)
        .join(', ')}`
    );
  }
};
