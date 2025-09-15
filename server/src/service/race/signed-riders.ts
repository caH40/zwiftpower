import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { getRequest } from '../zwift/api/request-get.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { SignedRiderFromZwiftAPI } from '../../types/zwiftAPI/signedRidersFromZwift.interface.js';
import { getAccessTokenOrganizer } from '../zwift/token.js';
import { ZwiftEventSchema } from '../../types/model.interface.js';
import { Types } from 'mongoose';
import { User } from '../../Model/User.js';
import { TeamMemberModel } from '../../Model/TeamMember.js';

/**
 * Получение зарегистрированных райдров с ZwiftAPI и сохранение в БД
 */
export async function putSignedRidersService({
  eventId,
  clubId,
}: {
  eventId: number;
  clubId: string;
}) {
  try {
    // Токен доступа Организатора заездов, которому принадлежит клуб clubId.
    const token = await getAccessTokenOrganizer({ clubId, importanceToken: 'main' });

    const eventDB = await ZwiftEvent.findOne({
      id: eventId,
    })
      .populate({ path: 'eventSubgroups', select: ['id', 'subgroupLabel'] })
      .lean<
        Omit<ZwiftEventSchema, 'eventSubgroups'> & {
          eventSubgroups: { _id: Types.ObjectId; id: number; subgroupLabel: string }[];
        }
      >();

    if (!eventDB) {
      throw new Error(`Не найден Event ${eventId} в БД`);
    }

    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе
      const signedDataTotal = [];
      let ridersQuantity = 100;
      let start = 0;

      while (ridersQuantity === 100) {
        const urlSignedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=${ridersQuantity}&participation=signed_up&start=${start}&type=all`;
        const signedData: SignedRiderFromZwiftAPI[] | null = await getRequest({
          url: urlSignedData,
          tokenOrganizer: token,
        });

        // количество зарегистрированных райдеров подсчет которых начинается с позиции start
        ridersQuantity = signedData?.length || 0;
        start += 100;

        if (!signedData) {
          continue;
        }

        signedDataTotal.push(...signedData);
      }

      const zwiftIdToTeamId = await mapZwiftIdToTeamId(
        signedDataTotal.map(({ id }) => ({ id }))
      );

      // добавление райдеров в группу
      for (const rider of signedDataTotal) {
        await ZwiftSignedRiders.create({
          subgroup: eventSubgroup._id,
          id: rider.id,
          firstName: rider.firstName,
          lastName: rider.lastName,
          male: rider.male,
          countryAlpha3: rider.countryAlpha3,
          countryCode: rider.countryCode,
          imageSrc: rider.imageSrc,
          age: rider.age,
          height: rider.height,
          weight: rider.weight,
          subgroupLabel: eventSubgroup.subgroupLabel,
          team: zwiftIdToTeamId.get(rider.id),
        });

        // добавление кривой мощности зарегистрированного райдера в БД (пустого шаблона)
        await PowerCurve.create({ zwiftId: rider.id, isMale: rider.male }).catch((error) => {
          if (error.code === 11000) return true;
          handleAndLogError(error);
        });
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    handleAndLogError(error);
  }
}

/**
 * Получение зарегистрированных райдров с ZwiftAPI
 */
export async function getSignedRiders({
  eventId,
  clubId,
}: {
  eventId: number;
  clubId: string;
}) {
  try {
    // Токен доступа Организатора заездов, которому принадлежит клуб clubId.
    const token = await getAccessTokenOrganizer({ clubId, importanceToken: 'main' });

    const eventDB = await ZwiftEvent.findOne({
      id: eventId,
    })
      .populate('eventSubgroups')
      .lean<EventWithSubgroup>();

    if (!eventDB) {
      throw new Error(`Не найден Event ${eventId} в БД`);
    }

    const signedDataTotal = [];
    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе

      let ridersQuantity = 100;
      let start = 0;
      while (ridersQuantity === 100) {
        const urlSignedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=${ridersQuantity}&participation=signed_up&start=${start}&type=all`;
        const signedData: SignedRiderFromZwiftAPI[] | null = await getRequest({
          url: urlSignedData,
          tokenOrganizer: token,
        });

        if (!signedData) {
          continue;
        }
        signedDataTotal.push(...signedData);

        ridersQuantity = signedData.length;
        start += 100;
      }
    }

    return signedDataTotal;
  } catch (error) {
    handleAndLogError(error);
  }
}

/**
 * Создаёт связку Zwift ID → Team ID для участников гонки.
 * Если у пользователя нет команды, возвращается undefined.
 *
 * @param signedDataTotal - массив участников с полем id (Zwift ID)
 * @returns Map<zwiftId, teamId | undefined>
 */
async function mapZwiftIdToTeamId(
  signedDataTotal: { id: number }[]
): Promise<Map<number, Types.ObjectId | undefined>> {
  // получаем массив zwiftId
  const zwiftIds = signedDataTotal.map(({ id }) => id);

  // ищем пользователей в базе по zwiftId
  const usersDB = await User.find(
    { zwiftId: { $in: zwiftIds } },
    { _id: true, zwiftId: true }
  ).lean<{ _id: Types.ObjectId; zwiftId: number }[]>();

  // создаём Map: userId → zwiftId
  const userIdToZwiftId = new Map<string, number>(
    usersDB.map(({ _id, zwiftId }) => [_id.toString(), zwiftId])
  );

  // получаем массив userId для поиска команд
  const userIds = usersDB.map(({ _id }) => _id);

  // ищем команды
  const teamDB = await TeamMemberModel.find(
    { user: { $in: userIds } },
    { team: true, user: true, _id: false }
  ).lean<{ user: Types.ObjectId; team: Types.ObjectId }[]>();

  // создаём итоговую Map: zwiftId → teamId | undefined
  const zwiftIdToTeamId = new Map<number, Types.ObjectId>();

  // заполняем Map данными о командах
  for (const { user, team } of teamDB) {
    const zwiftId = userIdToZwiftId.get(user.toString());
    if (zwiftId !== undefined) {
      zwiftIdToTeamId.set(zwiftId, team);
    }
  }

  return zwiftIdToTeamId;
}
