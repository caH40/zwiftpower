export const getAccessExpression = () => {
  // описание разрешенных групп при определенных категориях райдеров

  // для райдера категория "А" присвоена: powerCurves.category == 0
  // может подключиться только к группе "А": subgroup.label == 1
  const subgroupForFirstCat = '(powerCurves.category == 0 && subgroup.label == 1)';

  // может подключиться к группе большей или равной своей категории,
  // но кроме группы "E" powerCurves.category != 5
  const subgroupForCatExceptFifth =
    '(powerCurves.category != 5 && powerCurves.category >= subgroup.label)';

  // для райдера категория "E" присвоена: powerCurves.category == 5
  // может подключиться только к группе "E": subgroup.label == 5
  const subgroupForFifthCat = '(powerCurves.category == 5 && subgroup.label == 5)';

  // для райдера категория "E" присвоена: powerCurves.category == 5
  // может подключиться также к группе "A": subgroup.label == 1
  const subgroupForFifthCatException = '(powerCurves.category == 5 && subgroup.label == 1)';

  // суммарное правило подключение райдеров к группам
  return `${subgroupForFirstCat} || ${subgroupForCatExceptFifth} || ${subgroupForFifthCat} || ${subgroupForFifthCatException}`;
};
