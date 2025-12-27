// types
import { TImportanceCoefficientsLevels } from '../types/points.types.js';

const SHORTEST_DISTANCE = 7000; // Дистанция меньше которой считается спринтом в классификации важностей заездов.

export function calculateImportanceLevel({
  importanceLevel,
  eventType,
  distance,
}: {
  importanceLevel?: TImportanceCoefficientsLevels;
  eventType: string;
  distance: number;
}): TImportanceCoefficientsLevels {
  if (['GROUP_RIDE', 'EVENT_TYPE_GROUP_RIDE'].includes(eventType)) {
    return 'unrated';
  }
  if (distance <= SHORTEST_DISTANCE) {
    return 'sprint';
  } else if (importanceLevel === 'sprint') {
    return 'standard';
  }

  return importanceLevel || 'standard';
}
