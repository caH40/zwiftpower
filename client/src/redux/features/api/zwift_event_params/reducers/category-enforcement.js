import { accessExpressions } from '../../../../../assets/zwift/accessExpression';

/**
 * Reducer установки параметров строгой категоризации CategoryEnforcement и accessExpression.
 */
export const setCategoryEnforcementReducer = (state, action) => {
  const name = action.payload;

  const eventSubgroups = [
    state.eventSubgroup_1,
    state.eventSubgroup_2,
    state.eventSubgroup_3,
    state.eventSubgroup_4,
    state.eventSubgroup_5,
  ];

  const accessExpression = accessExpressions.find((elm) => elm.name === name);

  // Удаления value строки, так как она уже есть в сущности ZwiftEvent в которую вносятся данные изменения.
  const {
    paceValues,
    value,
    id,
    rangeAccessLabelSubgroup,
    categoryEnforcement,
    ...accessExpressionObj
  } = accessExpression;

  const isZRacing = name.includes('racingScore');

  // Включение/отключение строгой категоризации.
  state.eventMainParams.categoryEnforcement = categoryEnforcement;

  // Настройки строгой категоризации, если включена categoryEnforcement, то устанавливать.
  state.eventMainParams.accessExpression = categoryEnforcement === true ? value : null;

  // Данные для сайта zwfitpower.ru
  state.eventMainParams.accessExpressionObj = accessExpressionObj;

  // Установка диапазона рейтинга при включенном рейтинге.
  if (isZRacing) {
    state.eventMainParams.rangeAccessLabel = '0-1000';
    setRangeAccessLabel(eventSubgroups, rangeAccessLabelSubgroup);
  }
  setPaceValues(eventSubgroups, paceValues);
};

/**
 * Установка отображаемых диапазонов FTP райдера в описании заезда для каждой группы.
 */
function setPaceValues(eventSubgroups, paceValuesCurrent) {
  if (!paceValuesCurrent) {
    return;
  }
  for (const subgroup of eventSubgroups) {
    if (!subgroup) {
      continue;
    }

    const paceValues = paceValuesCurrent[subgroup.label] ?? {
      from: 1,
      to: 6,
    };
    subgroup.fromPaceValue = paceValues.from;
    subgroup.toPaceValue = paceValues.to;
  }
}

/**
 * Установка параметров для zRacing.
 */
function setRangeAccessLabel(eventSubgroups, rangeAccessLabelSubgroup) {
  if (!rangeAccessLabelSubgroup) {
    return;
  }

  for (const subgroup of eventSubgroups) {
    if (!subgroup) {
      continue;
    }

    const rangeAccessLabel = rangeAccessLabelSubgroup[subgroup.label] ?? {
      from: 0,
      to: 1000,
    };
    subgroup.rangeAccessLabel = rangeAccessLabel;
    subgroup.accessRules = [
      {
        name: 'scored.race',
        result: false,
      },
    ];
  }
}
