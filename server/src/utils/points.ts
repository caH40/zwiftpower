import { massCoefficients } from '../assets/racePoints.js';

const coefficientCache = new Map<number, number>();

/**
 * Получение коэффициента массовости заезда.
 */
export function getMassCoefficient(participantCount: number): number {
  if (!Number.isInteger(participantCount) || participantCount < 0) {
    return 0;
  }

  let coefficient = coefficientCache.get(participantCount);

  if (coefficient !== undefined) {
    return coefficient;
  }

  coefficient =
    massCoefficients.find(
      (elm) =>
        participantCount >= elm.participants.min &&
        (elm.participants.max === null || participantCount <= elm.participants.max)
    )?.coefficient ?? 0;

  coefficientCache.set(participantCount, coefficient);

  return coefficient;
}

export function calculateZpruFinishPoints({
  baseRacePoints,
  massCoefficient,
  importanceCoefficient,
}: {
  baseRacePoints: number;
  massCoefficient: number;
  importanceCoefficient: number;
}): number {
  return Math.round(baseRacePoints * massCoefficient * importanceCoefficient);
}
