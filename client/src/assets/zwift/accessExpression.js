/**
 * Стандартные значения строгой категоризации, основанные на категориях райдеров.
 */
export const accessExpressionsDefault = {
  id: 1,
  name: 'default',
  label: 'По категориям. Базовые настройки.',
  value: `(powerCurves.category == 0 && subgroup.label == 1) || 
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 5)`,
  description: JSON.stringify({
    table: {
      th: ['Группа', 'zMAP, w/kg', 'zFTP, w/kg', 'zFTP, watt'],
      tds: [
        ['A', '≥ 5.1', '≥ 4.2', '≥ 250'],
        ['B', '≥ 4.1', '3.36 - 4.19', '≥ 200'],
        ['C', '≥ 3.2', '2.63 - 3.35', '≥ 150'],
        ['D', '< 3.2', '< 2.63', ''],
        ['E', 'n/a', 'n/a', 'n/a'],
      ],
      description:
        'Вы можете выбрать самую низкую группу темпа, основываясь на наибольшем значении ваших zMAP (Вт/кг) или zFTP (Вт/кг), если ваш zFTP (Вт) соответствует этой или более высокой группе. Если zFTP (Вт) попадает в более низкую группу, вы можете выбрать и её.',
    },
  }),
  paceValues: {
    1: { from: 4, to: 6 },
    2: { from: 3.2, to: 3.99 },
    3: { from: 2.5, to: 3.19 },
    4: { from: 1, to: 2.49 },
    5: { from: 1, to: 6 },
  },
  categoryEnforcement: true,
};
/**
 * Стандартные значения строгой категоризации с разделением А на А и А+ по zp.com.
 */
export const accessExpressionsDefaultAndAPlus = {
  id: 7,
  name: 'defaultAndAPlus',
  label: 'По категориям. Добавлена А+.',
  value: `(subgroup.label == 1 && (powerCurves.zFTPwkg < 4.6 || powerCurves.zFTP < 300)) || 
(powerCurves.category != 1 && powerCurves.category >= subgroup.label) || 
subgroup.label == 5`,
  description: JSON.stringify({
    table: {
      th: ['Группа', 'zMAP, w/kg', 'zFTP, w/kg', 'zFTP, watt'],
      tds: [
        ['A+', 'n/a', '≥ 4.6', '≥ 300'],
        ['A', '≥ 5.1', '4.2 - 4.59', '≥ 250'],
        ['B', '≥ 4.1', '3.36 - 4.19', '≥ 200'],
        ['C', '≥ 3.2', '2.63 - 3.35', '≥ 150'],
        ['D', '< 3.2', '< 2.63', ''],
        ['E', 'n/a', 'n/a', 'n/a'],
      ],
      description:
        'Вы можете выбрать самую низкую группу темпа, основываясь на наибольшем значении ваших zMAP (Вт/кг) или zFTP (Вт/кг), если ваш zFTP (Вт) соответствует этой или более высокой группе. Если zFTP (Вт) попадает в более низкую группу, вы можете выбрать и её.',
    },
  }),
  paceValues: {
    1: { from: 4.2, to: 4.59 },
    2: { from: 3.36, to: 4.19 },
    3: { from: 2.63, to: 3.35 },
    4: { from: 1, to: 2.62 },
    5: { from: 4.6, to: 6 },
  },
  categoryEnforcement: true,
};

/**
 * Регистрация закрыта.
 */
export const accessExpressionsRegClosed = {
  id: 6,
  name: 'closed',
  label: 'Регистрация временно закрыта',
  value: 'false',
  description: '❗️❗️❗️ Регистрация временно закрыта ❗️❗️❗️',
  paceValues: {
    1: { from: 1, to: 6 },
    2: { from: 1, to: 6 },
    3: { from: 1, to: 6 },
    4: { from: 1, to: 6 },
    5: { from: 1, to: 6 },
  },
  categoryEnforcement: true,
};

/**
 * Строгая категоризация выключена..
 */
export const accessExpressionsDisabled = {
  id: 0,
  name: 'disabled',
  label: 'Выключена',
  value: 'disabled',
  description: 'Выключена',
  paceValues: {
    1: { from: 4, to: 6 },
    2: { from: 3.2, to: 3.99 },
    3: { from: 2.5, to: 3.19 },
    4: { from: 1, to: 2.49 },
    5: { from: 0, to: 6 },
  },
  categoryEnforcement: false,
};

/**
 * Массив настроек для Строгой категоризации в заездах Звифта.
 */
export const accessExpressions = [
  accessExpressionsDisabled,
  accessExpressionsDefault,
  accessExpressionsDefaultAndAPlus,
  {
    id: 2,
    name: 'racingScoreDefault',
    label: 'Гоночный рейтинг. Базовые настройки.',
    value: `(subgroup.label == 1 && scoring.current <= 1000) ||
(subgroup.label == 2 && scoring.current < 690) ||
(subgroup.label == 3 && scoring.current < 520 ) ||
(subgroup.label == 4 && scoring.current < 350) ||
(subgroup.label == 5 && scoring.current < 180)`,
    description: `Деление на группы происходит по Racing Score.
                  Группа A: 690-1000;
                  Группа B: 520-690;
                  Группа C: 350-520;
                  Группа D: 180-350;
                  Группа E: 1-180;`,
    paceValues: {
      1: { from: 1, to: 6 },
      2: { from: 1, to: 6 },
      3: { from: 1, to: 6 },
      4: { from: 1, to: 6 },
      5: { from: 1, to: 6 },
    },
    rangeAccessLabelSubgroup: {
      1: '690-1000',
      2: '520-690',
      3: '350-520',
      4: '180-350',
      5: '0-180',
    },
    categoryEnforcement: true,
  },
  {
    id: 3,
    name: 'komonCatchUp',
    label: 'KOMon Догонялки',
    value: `(subgroup.label == 5 && powerCurves.zFTPwkg < 6) ||
(subgroup.label == 1 && powerCurves.zFTPwkg < 4.6) ||
(subgroup.label == 2 && powerCurves.zFTPwkg < 4.2) ||
(subgroup.label == 3 && powerCurves.zFTPwkg < 3.5) ||
(subgroup.label == 4 && (powerCurves.zFTPwkg < 2.5 || powerCurves.zFTP < 180))`,
    description: `Группа E: zFTP (W/kg): 4.6 - 6.0;
                  Группа A: zFTP (W/kg): 4.2 - 4.59;
                  Группа B: zFTP (W/kg): 3.5 - 4.19;
                  Группа C: zFTP (W/kg): 2.5 - 3.49;
                  Группа D: zFTP (W/kg): 1.0 - 2.49 или zFTP (watts): < 180W;`,
    paceValues: {
      1: { from: 4.2, to: 4.59 },
      2: { from: 3.5, to: 4.19 },
      3: { from: 2.5, to: 3.49 },
      4: { from: 1.0, to: 2.49 },
      5: { from: 4.6, to: 6.0 },
    },
    categoryEnforcement: true,
  },
  {
    id: 4,
    name: 'komonTour',
    label: 'KOMon Тур',
    value: `(subgroup.label == 5 && powerCurves.zFTPwkg < 6) ||
(subgroup.label == 1 && powerCurves.zFTPwkg < 4.6) ||
(subgroup.label == 2 && (powerCurves.zFTPwkg < 4.2 || powerCurves.zFTP < 240)) ||
(subgroup.label == 3 && powerCurves.zFTPwkg < 3.5) ||
(subgroup.label == 4 && (powerCurves.zFTPwkg < 2.5 || powerCurves.zFTP < 180))`,
    description: `Группа E: zFTP (W/kg): 4.6 - 6.0;
                  Группа A: zFTP (W/kg): 4.2 - 4.59;
                  Группа B: zFTP (W/kg): 3.5 - 4.19 или zFTP (watts): < 240W;
                  Группа C: zFTP (W/kg): 2.5 - 3.49;
                  Группа D: zFTP (W/kg): 1.0 - 2.49 или zFTP (watts): < 180W;`,
    paceValues: {
      1: { from: 4.2, to: 4.59 },
      2: { from: 3.5, to: 4.19 },
      3: { from: 2.5, to: 3.49 },
      4: { from: 1.0, to: 2.49 },
      5: { from: 4.6, to: 6.0 },
    },
    categoryEnforcement: true,
  },
  accessExpressionsRegClosed,
  {
    id: 100,
    name: 'disabledVTR',
    label: 'Выключена. VTR',
    value: 'disabled',
    description: 'Выключена. Отображение для VTR',
    paceValues: {
      1: { from: 4.2, to: 6 },
      2: { from: 3.2, to: 4.19 },
      3: { from: 1, to: 3.19 },
      4: { from: 3.16, to: 6 },
      5: { from: 1, to: 3.15 },
    },
    categoryEnforcement: false,
  },
  {
    id: 101,
    name: 'EDFemaleETR',
    label: 'D,E женские. EtR',
    value: `(powerCurves.category >= subgroup.label && powerCurves.category != 4 && powerCurves.category != 5) ||
(subgroup.label <= 3 && (powerCurves.category == 4 || powerCurves.category == 5)) ||
(subgroup.label == 4 && powerCurves.zFTPwkg <= 3.15) ||
subgroup.label == 5`,
    description: 'D,E женские, С,B,A стандартные для EtR',
    paceValues: {
      1: { from: 4.2, to: 4.59 },
      2: { from: 3.36, to: 4.19 },
      3: { from: 2.63, to: 3.35 },
      4: { from: 1, to: 3.15 },
      5: { from: 3.16, to: 6 },
    },
    categoryEnforcement: true,
  },
];
