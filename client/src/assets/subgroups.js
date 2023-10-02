/**
 * все возможные подгруппы в Эвентах
 */
export const labelsSubgroups = [
  { subgroupLabel: 'A', label: 1 },
  { subgroupLabel: 'B', label: 2 },
  { subgroupLabel: 'C', label: 3 },
  { subgroupLabel: 'D', label: 4 },
  { subgroupLabel: 'E', label: 5 },
];

/**
 * необходимые подгруппы в Эвенте CatchUp (Догонялки)
 */
export const requiredLabelsForCatchup = [
  { subgroupLabel: 'A', label: 1 },
  { subgroupLabel: 'B', label: 2 },
  { subgroupLabel: 'C', label: 3 },
  { subgroupLabel: 'E', label: 5 },
];

/**
 * необходимые подгруппы в Эвенте newbies (Новичковая)
 */
export const requiredLabelsForNewbies = [
  { subgroupLabel: 'C', label: 3 },
  { subgroupLabel: 'D', label: 4 },
  { subgroupLabel: 'E', label: 5 },
];

/**
 * необходимые подгруппы в Эвенте Series (Серия)
 */
export const requiredLabelsForSeries = [...labelsSubgroups];
