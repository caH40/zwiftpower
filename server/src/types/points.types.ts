import { IMPORTANCE_COEFFICIENTS_LEVELS } from '../assets/racePoints';

/**
 * Правило начисления очков за конкретное место.
 */
export type TRacePointsRule = {
  place: number; // Место в финишном протоколе (1, 2, 3 и т.д.).
  points: number; // Количество начисляемых очков за указанное место.
};

export type TImportanceCoefficientsLevels = (typeof IMPORTANCE_COEFFICIENTS_LEVELS)[number];

/**
 * Таблица коэффициента важности заезда (V)
 */
export type TImportanceLevel = {
  levelRu: string;
  level: TImportanceCoefficientsLevels;
  coefficient: number;
  description: string;
};

/**
 * Коэффициент массовости заезда/группы (K)
 */

export type TParticipantCount = {
  min: number;
  max: number | null; // null означает "и более"
};

export type TMassCoefficient = {
  participants: TParticipantCount;
  coefficient: number;
  status: string;
};
