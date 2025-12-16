import { TImportanceLevel, TMassCoefficient, TRacePointsRule } from '../types/points.types';

/**
 * Базовое распределение очков за занятое место в рейтинге zpru.
 */
export const baseRacePoints: TRacePointsRule[] = [
  { place: 1, points: 25 },
  { place: 2, points: 18 },
  { place: 3, points: 15 },
  { place: 4, points: 12 },
  { place: 5, points: 10 },
  { place: 6, points: 8 },
  { place: 7, points: 6 },
  { place: 8, points: 4 },
  { place: 9, points: 2 },
  { place: 10, points: 1 },
];

export const baseRacePointsMap = new Map(baseRacePoints.map((e) => [e.place, e.points]));

/**
 * Коэффициенты массовости заезда для очков за занятое место в рейтинге zpru.
 */
export const massCoefficients: TMassCoefficient[] = [
  { participants: { min: 1, max: 5 }, coefficient: 0.0, status: 'Не рейтинговый' },
  { participants: { min: 6, max: 14 }, coefficient: 0.7, status: 'Малый' },
  { participants: { min: 15, max: 39 }, coefficient: 1.0, status: 'Стандартный' },
  { participants: { min: 40, max: 99 }, coefficient: 1.2, status: 'Крупный' },
  { participants: { min: 100, max: null }, coefficient: 1.5, status: 'Гигантский' },
];

/**
 * Названия для коэффициентов важности заезда для очков за занятое место в рейтинге zpru.
 */
export const IMPORTANCE_COEFFICIENTS_LEVELS = [
  'unrated',
  'standard',
  'important',
  'championship',
] as const;

/**
 * Коэффициенты важности заезда для очков за занятое место в рейтинге zpru.
 */
export const importanceCoefficients: TImportanceLevel[] = [
  {
    levelRu: 'Не рейтинговый',
    level: 'unrated',
    coefficient: 0.0,
    description: 'Коферайды, тренировки',
  },
  {
    levelRu: 'Базовый',
    level: 'standard',
    coefficient: 1.0,
    description: 'Стандартные соревнования',
  },
  {
    levelRu: 'Приоритетный',
    level: 'important',
    coefficient: 1.2,
    description: 'Важные старты',
  },
  {
    levelRu: 'Премиальный',
    level: 'championship',
    coefficient: 1.5,
    description: 'Финалы, чемпионаты',
  },
];
