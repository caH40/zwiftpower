import { InvalidZwiftIdModel } from '../../../Model/InvalidZwiftId.js';

/**
 * Добавление zwiftId не найденного в ZwiftAPI.
 */
export async function addInvalidZwiftId(zwiftId: number): Promise<void> {
  await InvalidZwiftIdModel.create({ zwiftId });
}
