import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { userPowerDto } from '../../../dto/user-power.dto.js';
import { getProfileService } from './profile.js';

// types
import { ResultWithEvent } from '../../../types/types.interface.js';
import { userProfileDto } from '../../../dto/user-profile.dto.js';
import { User } from '../../../Model/User.js';
import { TUserStreams } from '../../../types/model.interface.js';

/**
 * Получение профайла райдера (анкеты), основных значений CriticalPower, всех результатов райдера
 */
export async function getUserProfileService(zwiftId: number) {
  const powerCurveDB = await PowerCurve.findOne({ zwiftId }).lean();

  const profile = await getProfileService(zwiftId);

  // Получает только суммарное количество заездов
  const userDB = await User.findOne(
    { zwiftId },
    { streams: true, zwiftIdAdditional: true, _id: false }
  ).lean<{
    zwiftIdAdditional: number[];
    streams: TUserStreams;
  }>();

  const zwiftIdAdditional: number[] = userDB?.zwiftIdAdditional ? userDB.zwiftIdAdditional : [];
  const quantityRace = await ZwiftResult.countDocuments({
    profileId: [zwiftId, ...zwiftIdAdditional],
  });

  // подготовка данных для отправки при запросе API
  return userProfileDto({
    profile,
    powerCurve: powerCurveDB,
    quantityRace,
    streams: userDB?.streams,
  });
}

/**
 * Сервис получения значений кривой CriticalPower за 90 дней
 * для райдера (zwiftId) и CriticalPower со всех Заездов
 */
export async function getUserPowerService(zwiftId: string) {
  if (zwiftId === 'undefined') {
    return null;
  }

  const powerCurveDB = await PowerCurve.findOne({ zwiftId }).lean();

  const resultsDB = await ZwiftResult.find(
    { profileId: zwiftId },
    { cpBestEfforts: true, zwiftEventId: true }
  )
    .populate('zwiftEventId')
    .lean<ResultWithEvent[]>();

  const powerFromEvents = resultsDB.map((result) => ({
    _id: result._id,
    cpBestEfforts: result.cpBestEfforts,
    eventName: result.zwiftEventId.name,
    eventStart: new Date(result.zwiftEventId.eventStart).getTime(),
  }));

  powerFromEvents.sort((a, b) => b.eventStart - a.eventStart);

  // подготовка данных для отправки при запросе API
  return userPowerDto({ powerCurve: powerCurveDB, powerFromEvents });
}
