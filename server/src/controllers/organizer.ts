import { ObjectId, Types } from 'mongoose';
import { Request, Response } from 'express';

import { handleAndLogError, handleErrorInController } from '../errors/error.js';
import {
  deleteOrganizerBotZwiftService,
  getOrganizerBotZwiftService,
  putOrganizerBotZwiftService,
} from '../service/organizer/bot.js';
import { Organizer } from '../Model/Organizer.js';
import {
  addClubModeratorService,
  deleteClubModeratorService,
  deleteClubsZwiftService,
  getClubsZwiftForModeratorService,
  getClubsZwiftService,
  getClubZwiftService,
  postClubsZwiftService,
} from '../service/organizer/clubs.js';
import { Club } from '../Model/Club.js';
import {
  getClubZwiftModeratorService,
  getOrganizersForModeratorService,
  putOrganizerMainService,
} from '../service/organizer/organizer.js';
import { OrganizerDataZSchema } from '../utils/deserialization/organizer-data.js';
import { TPutOrganizerMain } from '../types/http.interface.js';

/**
 * Контроллер данных Организатора при запросе модератором.
 */
export async function getClubZwiftModerator(req: Request, res: Response) {
  try {
    const { organizerId } = req.params;

    // Проверка обязательных параметров.
    if (!organizerId) {
      throw new Error('Нет organizerId!');
    }

    // Вызов сервиса.
    const response = await getClubZwiftModeratorService({ organizerId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для добавления или редактирования данных бота-модератора для организаторов в Звифт.
 */
export async function putOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { organizerId, username, password, importance } = req.body;
    const { userId } = req.params;

    // Проверка обязательных параметров
    if (!username) {
      throw new Error('Нет username (email) для бота!');
    }

    if (!password) {
      throw new Error('Нет password для бота!');
    }

    if (!organizerId) {
      throw new Error('Нет organizerId!');
    }

    // Проверка, что пользователь имеет доступ к организатору.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: ObjectId;
    }>();

    if (!organizerDB) {
      return res.status(404).json({ message: 'Организатор не найден!' });
    }

    // Проверка, что organizerId, который пришел с клиента, совпадает с id организатора в БД.
    if (organizerId !== String(organizerDB._id)) {
      return res.status(403).json({ message: 'У вас нет доступа к этому организатору!' });
    }

    // Вызов сервиса для добавления/обновления данных бота
    const response = await putOrganizerBotZwiftService({
      organizerId,
      username,
      password,
      importance,
    });

    // Возврат успешного ответа
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок
    handleAndLogError(error);

    // Сообщение об ошибке
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для добавления или редактирования данных бота-модератора для организаторов в Звифт.
 */
export async function getOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    // Вызов сервиса для добавления/обновления данных бота
    const response = await getOrganizerBotZwiftService({ creatorId: userId });

    // Возврат успешного ответа
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок
    handleAndLogError(error);

    // Сообщение об ошибке
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для удаления токена и данных бота-модератора для организаторов в Звифт.
 */
export async function deleteOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { tokenId } = req.body;

    if (!tokenId) {
      throw new Error('Нет tokenId!');
    }

    // Вызов сервиса для удаления токена и данных бота.
    const response = await deleteOrganizerBotZwiftService({ tokenId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для получение клубов из БД для Организатора.
 */
export async function getClubsZwift(req: Request, res: Response) {
  try {
    const { organizerId } = req.params;

    if (!organizerId) {
      throw new Error('Нет organizerId!');
    }

    // Вызов сервиса.
    const response = await getClubsZwiftService({ organizerId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для получение клубов из БД для Модераторов клуба.
 */
export async function getClubsZwiftForModerator(req: Request, res: Response) {
  try {
    const { userModeratorId } = req.params;

    if (!userModeratorId) {
      throw new Error('Нет userModeratorId!');
    }

    // Вызов сервиса.
    const response = await getClubsZwiftForModeratorService({ userModeratorId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для получение клубов из БД для Организатора.
 */
export async function deleteClubsZwift(req: Request, res: Response) {
  try {
    const { clubId } = req.body;
    const { userId } = req.params;

    if (!clubId) {
      throw new Error('Нет clubId!');
    }

    // Проверка, что пользователь имеет доступ к организатору.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: ObjectId;
    }>();
    // Проверка, что пользователь является Организатором и добавлял удаляемый клуб.
    const clubDB = await Club.findOne(
      { id: clubId, organizer: organizerDB?._id },
      { _id: true }
    ).lean<{
      _id: ObjectId;
    }>();

    if (!clubDB) {
      return res.status(403).json({ message: 'У вас нет доступа на удаление данного клуба!' });
    }

    // Вызов сервиса.
    const response = await deleteClubsZwiftService({ clubId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для получение клуба из ZwiftAPI для добавления Организатору.
 */
export async function getClubZwift(req: Request, res: Response) {
  try {
    const { userId, clubId } = req.params;

    if (!clubId) {
      throw new Error('Нет clubId!');
    }

    // Проверка, что пользователь имеет доступ к организатору.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: ObjectId;
    }>();

    if (!organizerDB) {
      throw new Error('Не найден Организатор для вашей учётной записи!');
    }

    // Вызов сервиса.
    const response = await getClubZwiftService({ clubId, organizerId: organizerDB._id });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для получение клуба из ZwiftAPI для добавления Организатору.
 */
export async function postClubsZwift(req: Request, res: Response) {
  try {
    const { club, organizerId } = req.body;

    if (!club) {
      throw new Error('Нет данных club!');
    }

    if (!organizerId) {
      throw new Error('Нет organizerId!');
    }

    // Вызов сервиса.
    const response = await postClubsZwiftService({ club, organizerId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер добавления модератора в клуб.
 */
export async function addClubModerator(req: Request, res: Response) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId) {
      throw new Error('Нет данных clubId!');
    }

    if (!userId) {
      throw new Error('Нет userId!');
    }

    // Вызов сервиса.
    const response = await addClubModeratorService({ clubId, userId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер добавления модератора в клуб.
 */
export async function deleteClubModerator(req: Request, res: Response) {
  try {
    const { clubId, userId } = req.body;

    if (!clubId) {
      throw new Error('Нет данных clubId!');
    }

    if (!userId) {
      throw new Error('Нет userId!');
    }

    // Вызов сервиса.
    const response = await deleteClubModeratorService({ clubId, userId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер получения Организаторов у которых пользователь userId является модератором.
 */
export async function getOrganizersForModerator(req: Request, res: Response) {
  try {
    const { userModeratorId } = req.params;

    if (!userModeratorId) {
      throw new Error('Нет userId!');
    }

    // Вызов сервиса.
    const response = await getOrganizersForModeratorService({ userId: userModeratorId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер получения обновлённых данных Организатора.
 */
export async function putOrganizerMain(req: Request, res: Response) {
  try {
    // _id Создателя Организатора в БД.
    const creatorId = req.params.userId;

    // Получение файлов изображений, если они есть
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const logoFile = files?.logoFile?.[0];
    const posterFile = files?.posterFile?.[0];

    // Десериализация данных.
    const deserializedOrganizerData = OrganizerDataZSchema.parse(req.body) as Omit<
      TPutOrganizerMain,
      'logoFile' | 'posterFile'
    >;

    // Проверка, что изменяет данные Организатора сам создатель Организатора.
    const organizerDB = await Organizer.findOne({ creator: creatorId }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (!organizerDB || String(organizerDB._id) !== deserializedOrganizerData.organizerId) {
      throw new Error('У вас нет прав для редактирования данных этого Организатора!');
    }

    // Вызов сервиса.
    const response = await putOrganizerMainService({
      ...deserializedOrganizerData,
      logoFile,
      posterFile,
    });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
