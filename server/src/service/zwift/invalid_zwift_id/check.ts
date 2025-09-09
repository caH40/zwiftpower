import { InvalidZwiftIdModel } from '../../../Model/InvalidZwiftId.js';

// Проверка на удаление аккаунта(zwiftId) в звифте.
export async function checkZwiftId(zwiftId: number): Promise<boolean> {
  return Boolean(await InvalidZwiftIdModel.exists({ zwiftId }));
}
