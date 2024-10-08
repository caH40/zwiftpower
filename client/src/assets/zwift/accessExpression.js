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
  description: `Группа A:  zMAP: ≥5.1W/kg; zFTP: ≥4.2W/kg, zFTP (watts): ≥250W;
                Группа B: zMAP: ≥4.1W/kg; zFTP: ≥3.36W/kg, zFTP (watts): ≥200W;
                Группа C: zMAP: ≥3.2W/kg; zFTP: ≥2.63W/kg, zFTP (watts): ≥150W;
                Группа D: zMAP: <3.2W/kg; zFTP:<2.63W/kg;
                Группа E: zMAP: n/a; zFTP: n/a;`,
  paceValues: {
    1: { from: 1, to: 6 },
    2: { from: 1, to: 6 },
    3: { from: 1, to: 6 },
    4: { from: 1, to: 6 },
    5: { from: 1, to: 6 },
  },
};

/**
 * Массив настроек для Строгой категоризации в заездах Звифта.
 */
export const accessExpressions = [
  {
    id: 0,
    name: 'disabled',
    label: 'Выключена',
    value: 'disabled',
    description: 'Выключена',
    paceValues: {
      1: { from: 1, to: 6 },
      2: { from: 1, to: 6 },
      3: { from: 1, to: 6 },
      4: { from: 1, to: 6 },
      5: { from: 1, to: 6 },
    },
  },
  {
    ...accessExpressionsDefault,
  },
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
                  Группа A:  690-1000;
                  Группа B: 520-690;
                  Группа C: 350-520;
                  Группа D: 180-350;
                  Группа E: 0-180;`,
    paceValues: {
      1: { from: 1, to: 6 },
      2: { from: 1, to: 6 },
      3: { from: 1, to: 6 },
      4: { from: 1, to: 6 },
      5: { from: 1, to: 6 },
    },
  },
  {
    id: 3,
    name: 'catchUp',
    label: 'Догонялки. По категориям.',
    value: `(powerCurves.category == 0 && subgroup.label == 1) ||
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 1)`,
    description: `Группа A: zMAP: ≥5.1W/kg; zFTP: ≥4.2W/kg, zFTP (watts): ≥250W;
                  Группа B: zMAP: ≥4.1W/kg; zFTP: ≥3.36W/kg, zFTP (watts): ≥200W;
                  Группа C: zMAP: ≥3.2W/kg; zFTP: ≥2.63W/kg, zFTP (watts): ≥150W;
                  Группа D: zMAP: <3.2W/kg; zFTP:<2.63W/kg;
                  Райдер без категории (E) может присоединиться в группу А;`,
    paceValues: {
      1: { from: 1, to: 6 },
      2: { from: 1, to: 6 },
      3: { from: 1, to: 6 },
      4: { from: 1, to: 6 },
      5: { from: 1, to: 6 },
    },
  },
  {
    id: 4,
    name: 'catchUpNew',
    label: 'Догонялки. По удельной мощности.',
    value: `(subgroup.label == 5 && powerCurves.zFTPwkg < 6) ||
(subgroup.label == 1 && powerCurves.zFTPwkg < 4.6) ||
(subgroup.label == 2 && powerCurves.zFTPwkg < 4.2) ||
(subgroup.label == 3 && powerCurves.zFTPwkg < 3.5) ||
(subgroup.label == 4 && (powerCurves.zFTPwkg < 2.8 && powerCurves.zFTP < 200))`,
    description: `Группа E: zFTP (W/kg): 4.6 - 6.0;
                  Группа A: zFTP (W/kg): 4.2 - 4.59;
                  Группа B: zFTP (W/kg): 3.5 - 4.19;
                  Группа C: zFTP (W/kg): 2.8 - 3.49;
                  Группа D: zFTP (W/kg): 1.0 - 2.79 и zFTP (watts): < 200W;`,
    paceValues: {
      1: { from: 4.2, to: 4.59 },
      2: { from: 3.5, to: 4.19 },
      3: { from: 2.8, to: 3.49 },
      4: { from: 1.0, to: 2.79 },
      5: { from: 4.6, to: 6.0 },
    },
  },
  {
    id: 5,
    name: 'newbies',
    label: 'Новичковая. По категориям.',
    value: `(powerCurves.category == 3 && subgroup.label == 3) ||
(powerCurves.category == 4 && (subgroup.label == 4 || subgroup.label == 3)) || 
(powerCurves.category == 5)`,
    description: `Группа C: zFTP (W/kg): 2.63 - 3.359, zMAP (W/kg): 3.2 - 4.09 и zFTP (watts): ≥150W;
                  Группа D: zFTP (W/kg): 1.0 - 2.629, zMAP (W/kg): 1 - 3.19 и zFTP (watts): <150W;`,
    paceValues: {
      1: { from: 1, to: 6 },
      2: { from: 1, to: 6 },
      3: { from: 2.63, to: 3.35 },
      4: { from: 1, to: 2.62 },
      5: { from: 1, to: 6 },
    },
  },
  {
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
  },
];
