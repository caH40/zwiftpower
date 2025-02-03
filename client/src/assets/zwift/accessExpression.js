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
  description: `Группа A: (zMAP (W/kg): ≥ 5.1 или zFTP (W/kg): ≥ 4.2) и zFTP (watts): ≥ 250W;
                Группа B: (zMAP (W/kg): ≥ 4.1 или zFTP (W/kg): 3.36 - 4.19) и zFTP (watts): ≥ 200W;
                Группа C: (zMAP (W/kg): ≥ 3.2 или zFTP (W/kg): 2.63 - 3.35) и zFTP (watts): ≥ 150W;
                Группа D: zMAP (W/kg): < 3.2 или zFTP (W/kg): < 2.63;
                Группа E: zMAP: n/a, FTP: n/a;`,
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
];
