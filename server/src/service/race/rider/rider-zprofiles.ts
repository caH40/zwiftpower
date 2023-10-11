import { User } from '../../../Model/User.js';
import { errorHandler } from '../../../errors/error.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

// types
import { ZwiftRiderShot, ZwiftRidersShort } from '../../../types/types.interface.js';

/**
 * @param zwiftIdMain zwiftId с фронтенда для запроса привязанных райдеров к профилю юзера
 * @returns объект с данными основного и дополнительных райдеров с сервера ZwiftAPI
 */
export const getZwiftProfilesService = async (zwiftIdMain: string) => {
  // инициализация объекта для данных
  const zwiftRiders = {
    zwiftRiderMain: {} as ZwiftRiderShot,
    zwiftRiderAdditional: [],
  } as ZwiftRidersShort;

  // данные пользователя с ДБ
  const userDB = await User.findOne({ zwiftId: zwiftIdMain });

  if (!userDB) {
    return null;
  }

  // запрос данных для основного райдера с сервера ZwiftAPI
  const zwiftRiderMainZP = await getZwiftRiderService(zwiftIdMain).catch((error) =>
    errorHandler(error)
  );

  if (!zwiftRiderMainZP) {
    return null;
  }

  // данные основного райдера с сервера ZwiftAPI
  const zwiftRiderMain: ZwiftRiderShot = {
    id: zwiftRiderMainZP.id,
    firstName: zwiftRiderMainZP.firstName,
    lastName: zwiftRiderMainZP.lastName,
    male: zwiftRiderMainZP.male,
    imageSrc: zwiftRiderMainZP.imageSrc,
    countryCode: zwiftRiderMainZP.countryCode,
  };

  // если нет дополнительных zwiftId
  if (!userDB.zwiftIdAdditional || !userDB.zwiftIdAdditional.length) {
    return { zwiftRiderMain, zwiftIdAdditional: [] };
  }

  // запрос и формирование данных для дополнительных райдеров с сервера ZwiftAPI
  for (const zwiftId of userDB.zwiftIdAdditional) {
    const zwiftRiderAdditionalZP = await getZwiftRiderService(String(zwiftId)).catch((error) =>
      errorHandler(error)
    );

    if (!zwiftRiderAdditionalZP) {
      continue;
    }

    // данные дополнительного райдера с сервера ZwiftAPI
    const zwiftRiderAdditional: ZwiftRiderShot = {
      id: zwiftRiderAdditionalZP.id,
      firstName: zwiftRiderAdditionalZP.firstName,
      lastName: zwiftRiderAdditionalZP.lastName,
      male: zwiftRiderAdditionalZP.male,
      imageSrc: zwiftRiderAdditionalZP.imageSrc,
      countryCode: zwiftRiderAdditionalZP.countryCode,
    };

    // добавление в массив дополнительных райдеров
    zwiftRiders.zwiftRiderAdditional.push(zwiftRiderAdditional);
  }

  return { zwiftRiderMain, zwiftRiderAdditional: zwiftRiders };
};
