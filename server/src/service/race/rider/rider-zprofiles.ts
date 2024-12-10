import { User } from '../../../Model/User.js';
import { handleAndLogError } from '../../../errors/error.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

// types
import { ZwiftProfileShort, ZwiftRidersShort } from '../../../types/types.interface.js';

/**
 * @param zwiftIdMain zwiftId с фронтенда для запроса привязанных райдеров к профилю юзера
 * @returns объект с данными основного и дополнительных райдеров с сервера ZwiftAPI
 */
export const getZwiftProfilesService = async (
  zwiftIdMain: number
): Promise<ZwiftRidersShort | null> => {
  // данные пользователя с ДБ
  const userDB = await User.findOne({ zwiftId: zwiftIdMain });

  if (!userDB) {
    return null;
  }

  // запрос данных для основного райдера с сервера ZwiftAPI
  const zwiftProfileMainZP = await getZwiftRiderService(zwiftIdMain).catch((error) =>
    handleAndLogError(error)
  );

  if (!zwiftProfileMainZP) {
    return null;
  }

  // данные основного райдера с сервера ZwiftAPI
  const zwiftProfileMain: ZwiftProfileShort = {
    id: zwiftProfileMainZP.id,
    firstName: zwiftProfileMainZP.firstName,
    lastName: zwiftProfileMainZP.lastName,
    male: zwiftProfileMainZP.male,
    imageSrc: zwiftProfileMainZP.imageSrc,
    countryAlpha3: zwiftProfileMainZP.countryAlpha3,
  };

  // если нет дополнительных zwiftId
  if (!userDB.zwiftIdAdditional || !userDB.zwiftIdAdditional.length) {
    return { zwiftProfileMain, zwiftProfilesAdditional: [] };
  }

  // инициализация объекта для данных
  const zwiftProfilesAdditional: ZwiftProfileShort[] = [];

  // запрос и формирование данных для дополнительных райдеров с сервера ZwiftAPI
  for (const zwiftId of userDB.zwiftIdAdditional) {
    const zwiftProfileAdditionalZP = await getZwiftRiderService(zwiftId).catch((error) =>
      handleAndLogError(error)
    );

    if (!zwiftProfileAdditionalZP) {
      continue;
    }

    // данные дополнительного райдера с сервера ZwiftAPI
    const zwiftProfileAdditional: ZwiftProfileShort = {
      id: zwiftProfileAdditionalZP.id,
      firstName: zwiftProfileAdditionalZP.firstName,
      lastName: zwiftProfileAdditionalZP.lastName,
      male: zwiftProfileAdditionalZP.male,
      imageSrc: zwiftProfileAdditionalZP.imageSrc,
      countryAlpha3: zwiftProfileAdditionalZP.countryAlpha3,
    };

    // добавление в массив дополнительных райдеров
    zwiftProfilesAdditional.push(zwiftProfileAdditional);
  }

  return { zwiftProfileMain, zwiftProfilesAdditional };
};
