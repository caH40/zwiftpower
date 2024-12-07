import { Types } from 'mongoose';

import { ZwiftToken } from '../../Model/ZwiftToken.js';
import { Organizer } from '../../Model/Organizer.js';

type Params = {
  organizerLabel: string;
  organizerId?: Types.ObjectId;
};
/**
 * Получение токена доступа к ZwiftAPI для работы с данными Эвента.
 * organizerId добавился когда уже были Эвенты в которых сохранялся только label.
 */
export async function getTokenForEvent({
  organizerLabel,
  organizerId,
}: Params): Promise<string | null> {
  let query = {} as Record<string, Types.ObjectId>;

  if (organizerId) {
    query = { organizer: organizerId };
  } else {
    const organizerDB = await Organizer.findOne({ label: organizerLabel }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (!organizerDB) {
      throw new Error(`Organizer с label "${organizerLabel}" не найден.`);
    }

    query = { organizer: organizerDB._id };
  }

  const tokenDB = await ZwiftToken.findOne(query, { _id: false, token: true }).lean<{
    token: string | null;
  }>();

  return tokenDB?.token ?? null;
}
