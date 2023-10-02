import { labelsSubgroups, requiredLabelsForCatchup } from '../../../../../assets/subgroups';

/**
 * Проверка наличия обязательных подгрупп в Эвенте для данного паттерна,
 * или наличие лишних поддгрупп
 */
export const checkingRequiredSubgroups = (eventParams) => {
  // массив с номерами подгрупп в Эвенте
  const labelsInRaw = eventParams.eventSubgroups.map((subgroup) => subgroup.label);

  // поиск отсутствующий подгрупп в Эвенте
  // requiredLabelsForCatchup необходимые подгруппы в текущем Эвенте
  const absentSubgroups = requiredLabelsForCatchup.filter(
    (elm) => !labelsInRaw.includes(elm.label)
  );

  const lengthAbs = absentSubgroups.length;
  if (lengthAbs) {
    const wordEnd = lengthAbs === 1 ? 'а' : 'ы';
    throw Error(
      `Отсутствуют обязательные групп${wordEnd}: ${absentSubgroups
        .map((elm) => elm.subgroupLabel)
        .join(', ')}`
    );
  }

  // поиск лишних подгрупп в Эвенте
  const excessSubgroups = labelsInRaw.filter(
    (elm) => !requiredLabelsForCatchup.map((label) => label.label).includes(elm)
  );

  const lengthExc = excessSubgroups.length;
  if (lengthExc) {
    const wordEnd = lengthExc === 1 ? 'а' : 'ы';
    throw Error(
      `Присутствуют лишние групп${wordEnd}: ${excessSubgroups
        .map((elm) => labelsSubgroups.find((label) => label.label === elm).subgroupLabel)
        .join(', ')}`
    );
  }
};
