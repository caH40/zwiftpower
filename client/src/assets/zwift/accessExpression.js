export const accessExpression = {
  // Стандартное распределение по категориям.
  default: {
    value: `(powerCurves.category == 0 && subgroup.label == 1) || 
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 5) ||
(powerCurves.category == 5 && subgroup.label == 1)
`,
    description: `Группа A:  zMAP: ≥5.1W/kg; zFTP: ≥4.2W/kg, zFTP (watts): ≥250W;
  Группа B: zMAP: ≥4.1W/kg; zFTP: ≥3.36W/kg, zFTP (watts): ≥200W;
  Группа C: zMAP: ≥3.2W/kg; zFTP: ≥2.63W/kg, zFTP (watts): ≥150W;
  Группа D: zMAP: <3.2W/kg; zFTP:<2.63W/kg;
  Группа E: zMAP: n/a; zFTP: n/a;
  `,
  },

  // Стандартное распределение по рейтинговым очкам.
  racingScoreDefault: {
    value: `(subgroup.label == 1 && scoring.current <= 1000) ||
(subgroup.label == 2 && scoring.current < 650) ||
(subgroup.label == 3 && scoring.current < 525 ) ||
(subgroup.label == 4 && scoring.current < 415) ||
(subgroup.label == 5 && scoring.current < 300)
`,
    description: `Деление на группы происходит по Racing Score.
  Группа A:  650-1000;
  Группа B: 525-650;
  Группа C: 415-525;
  Группа D: 300-415;
  Группа E: 0-300;
  `,
  },

  // По категориям для Догонялок.
  catchUp: {
    value: `(powerCurves.category == 0 && subgroup.label == 1) ||
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 5) ||
(powerCurves.category == 5 && subgroup.label == 1)
`,
    description: `Группа A:  zMAP: ≥5.1W/kg; zFTP: ≥4.2W/kg, zFTP (watts): ≥250W;
  Группа B: zMAP: ≥4.1W/kg; zFTP: ≥3.36W/kg, zFTP (watts): ≥200W;
  Группа C: zMAP: ≥3.2W/kg; zFTP: ≥2.63W/kg, zFTP (watts): ≥150W;
  Группа D: zMAP: <3.2W/kg; zFTP:<2.63W/kg;
  Райдер без категории может присоединиться в группу А;
  `,
  },

  // По категориям для новичков.
  newbies: {
    value: `(powerCurves.category == 3 && subgroup.label == 3) ||
(powerCurves.category == 4 && (subgroup.label == 4 || subgroup.label == 3)) || 
(powerCurves.category == 5)
`,
    description: `Группа C: zMAP: ≥3.2W/kg; zFTP: ≥2.63W/kg, zFTP (watts): ≥150W;
Группа D: zMAP: <3.2W/kg; zFTP:<2.63W/kg;
`,
  },

  // Выделение А+ для D (тестовое).
  FTP: {
    value: `(powerCurves.zFTPwkg >= 4.84 && subgroup.label == 4) ||
(powerCurves.category == 1 && powerCurves.zFTPwkg < 4.84 && (subgroup.label == 1 || subgroup.label == 4)) ||
powerCurves.category == 2 && (subgroup.label < 3  || subgroup.label == 4) ||
powerCurves.category == 3 && (subgroup.label < 4  || subgroup.label == 4) ||
powerCurves.category == 5
`,
    description: '',
  },
};
