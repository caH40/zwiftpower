// Стандартное распределение по категориям.
export const accessExpressionDefault = {
  value: `(powerCurves.category == 0 && subgroup.label == 1) || 
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 5) ||
(powerCurves.category == 5 && subgroup.label == 1)
`,
  description: '',
};

// Стандартное распределение по рейтинговым очкам.
export const accessExpressionDefaultRacingScoreDefault = {
  value: `(subgroup.label == 1 && scoring.current <= 1000) ||
(subgroup.label == 2 && scoring.current < 690) ||
(subgroup.label == 3 && scoring.current < 520 ) ||
(subgroup.label == 4 && scoring.current < 350) ||
(subgroup.label == 5 && scoring.current < 180)
`,
  description: '',
};

// По категориям для Догонялок.
export const accessExpressionCatchUp = {
  value: `(powerCurves.category == 0 && subgroup.label == 1) ||
(powerCurves.category != 5 && powerCurves.category >= subgroup.label) ||
(powerCurves.category == 5 && subgroup.label == 5) ||
(powerCurves.category == 5 && subgroup.label == 1)
`,
  description: '',
};

// По категориям для новичков.
export const accessExpressionNewbies = {
  value: `(powerCurves.category == 3 && subgroup.label == 3) ||
(powerCurves.category == 4 && (subgroup.label == 4 || subgroup.label == 3)) || 
(powerCurves.category == 5)
`,
  description: '',
};

// Выделение А+ для D (тестовое).
export const accessExpressionFTP = {
  value: `(powerCurves.zFTPwkg >= 4.84 && subgroup.label == 4) ||
(powerCurves.category == 1 && powerCurves.zFTPwkg < 4.84 && (subgroup.label == 1 || subgroup.label == 4)) ||
powerCurves.category == 2 && (subgroup.label < 3  || subgroup.label == 4) ||
powerCurves.category == 3 && (subgroup.label < 4  || subgroup.label == 4) ||
powerCurves.category == 5
`,
  description: '',
};
