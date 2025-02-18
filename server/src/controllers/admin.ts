import { Request, Response } from 'express';
import { AxiosError } from 'axios';

import { handleAndLogError, handleErrorInController } from '../errors/error.js';
import { getUsersForModeratorService, getUsersService } from '../service/admin/users.js';
import {
  addClubModeratorService,
  deleteClubModeratorService,
  deleteClubService,
  getClubService,
  getClubsService,
  postClubService,
  updateClubService,
} from '../service/admin/club.js';

// types
import { ClubSchema, OrganizerSchema, TBanCode } from '../types/model.interface.js';
import { ClubZwift } from '../types/zwiftAPI/clubFromZwift.interface.js';
import {
  deleteOrganizersService,
  getOrganizersService,
  postOrganizersService,
} from '../service/admin/organizer.js';
import {
  getActivityInFitFileService,
  putActivityInFitFileService,
} from '../service/fitfile.js';
import { updateFitFileAndPowerCurveService } from '../service/power-curve.js';
import {
  getFairRideBanService,
  updateFairRideBanService,
} from '../service/riders/rider-ban.js';

/**
 * Получение всех зарегистрированных Users
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getUsers');
    }
  }
};

/**
 * Получение всех зарегистрированных Users по запросу Модератора.
 */
export const getUsersForModerator = async (req: Request, res: Response) => {
  try {
    // Вызов сервиса.
    const users = await getUsersForModeratorService();

    // Возврат успешного ответа.
    res.status(200).json(users);
  } catch (error) {
    // Обработка ошибок.
    handleAndLogError(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
};

/**
 * Получение всех клубов из БД
 */
export const getClubs = async (req: Request, res: Response) => {
  try {
    const clubs: ClubSchema[] = await getClubsService();
    res.status(200).json(clubs);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getUsers');
    }
  }
};

/**
 * Получение данных Клуба из ZwiftAPI
 * * Доступ данных к клубу в ZwiftAPI разрешается любым пользователям.
 */
export const getClub = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await getClubService(id);

    res.status(200).json(club);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Сохранение клуба в БД
 */
export const postClub = async (req: Request, res: Response) => {
  try {
    const { club, organizerId }: { club: ClubZwift; organizerId: string } = req.body;
    const clubPosted: { message: string } = await postClubService(club, organizerId);

    res.status(201).json(clubPosted);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Удаления клуба из БД
 */
export const deleteClub = async (req: Request, res: Response) => {
  try {
    const { clubId }: { clubId: string } = req.body;

    const clubDeleted: { message: string } = await deleteClubService(clubId);

    res.status(200).json(clubDeleted);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Удаления клуба из БД
 */
export const updateClub = async (req: Request, res: Response) => {
  try {
    const { clubId }: { clubId: string } = req.body;

    if (!clubId) {
      throw new Error('Не получен clubId с клиента!');
    }

    const clubDeleted: { message: string } = await updateClubService(clubId);

    res.status(200).json(clubDeleted);
  } catch (error) {
    handleErrorInController(res, error);
  }
};

/**
 * Добавление модератора для клуба
 */
export const addClubModerator = async (req: Request, res: Response) => {
  try {
    // objectId клуба и пользователя
    const { clubId, userId }: { clubId: string; userId: string } = req.body;

    const clubModeratorAdded: { message: string } = await addClubModeratorService(
      clubId,
      userId
    );

    res.status(201).json(clubModeratorAdded);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
/**
 * Удаление модератора из клуба
 */
export const deleteClubModerator = async (req: Request, res: Response) => {
  try {
    // objectId клуба и пользователя
    const { clubId, userId }: { clubId: string; userId: string } = req.body;

    const clubModeratorAdded: { message: string } = await deleteClubModeratorService(
      clubId,
      userId
    );

    res.status(200).json(clubModeratorAdded);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Получение Организаторов заездов
 */
export const getOrganizers = async (req: Request, res: Response) => {
  try {
    const organizers: OrganizerSchema[] = await getOrganizersService();

    res.status(200).json(organizers);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Добавление Организаторов заездов
 */
export const postOrganizers = async (req: Request, res: Response) => {
  try {
    const { name, label, creatorId } = req.body;
    const organizers: { message: string } = await postOrganizersService(name, label, creatorId);

    res.status(201).json(organizers);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Удаление Организаторов заездов
 */
export const deleteOrganizers = async (req: Request, res: Response) => {
  try {
    const { organizerId } = req.body;
    const organizers: { message: string } = await deleteOrganizersService(organizerId);

    res.status(200).json(organizers);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export const putActivityInFitFile = async (req: Request, res: Response) => {
  try {
    const { _idActivity, banned } = req.body as {
      _idActivity: string;
      banned: boolean;
    };

    const response = await putActivityInFitFileService({ _idActivity, banned });

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Получение фитфайла активностей райдера.
 */
export const getActivityInFitFile = async (req: Request, res: Response) => {
  try {
    const { zwiftId } = req.params;

    const parsedZwiftId = Number(zwiftId);

    if (isNaN(parsedZwiftId) || !Number.isInteger(parsedZwiftId)) {
      throw new Error(`Не верный формат zwiftId: ${zwiftId}`);
    }

    const response = await getActivityInFitFileService({ zwiftId: +zwiftId });

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Создание/обновления (FitFiles) фитфайла активностей райдера и
 * обновление кривой мощности за последние 90 дней
 */
export const updateFitFileAndPowerCurve = async (req: Request, res: Response) => {
  try {
    const { zwiftId }: { zwiftId: number } = req.body;

    const response = await updateFitFileAndPowerCurveService({ zwiftId });

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export const updateFairRideBan = async (req: Request, res: Response) => {
  try {
    const { zwiftId, banned, code, description } = req.body as {
      zwiftId: number;
      banned: boolean;
      code: TBanCode;
      description?: string;
    };

    const { userId } = req.params;

    const parsedZwiftId = Number(zwiftId);

    if (isNaN(parsedZwiftId) || !Number.isInteger(parsedZwiftId)) {
      throw new Error(`Не верный формат входного параметра zwiftId: ${zwiftId}`);
    }

    if (typeof banned !== 'boolean') {
      throw new Error(
        `Неверный формат входного параметра banned: ${banned} тип ${typeof banned}, а необходим тип boolean`
      );
    }

    const response = await updateFairRideBanService({
      zwiftId,
      banned,
      code,
      description,
      adminId: userId,
    });

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

/**
 * Установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export const getFairRideBan = async (req: Request, res: Response) => {
  try {
    const { zwiftId } = req.params;

    const parsedZwiftId = Number(zwiftId);

    if (isNaN(parsedZwiftId) || !Number.isInteger(parsedZwiftId)) {
      throw new Error(`Не верный формат входного параметра zwiftId: ${zwiftId}`);
    }

    const response = await getFairRideBanService({
      zwiftId: parsedZwiftId,
    });

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        const message = JSON.stringify(error.response.data);
        res.status(400).json({ message });
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
