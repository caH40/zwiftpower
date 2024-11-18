import { Request, Response } from 'express';
import { AxiosError } from 'axios';

import { errorHandler } from '../errors/error.js';
import { getUsersService } from '../service/admin/users.js';
import {
  addClubModeratorService,
  deleteClubModeratorService,
  deleteClubService,
  getClubService,
  getClubsService,
  postClubService,
} from '../service/admin/club.js';

// types
import { ClubSchema, OrganizerSchema } from '../types/model.interface.js';
import { ClubZwift } from '../types/zwiftAPI/clubFromZwift.interface.js';
import {
  deleteOrganizersService,
  getOrganizersService,
  postOrganizersService,
} from '../service/admin/organizer.js';
import { putActivityInFitFileService } from '../service/fitfile.js';

/**
 * Получение всех зарегистрированных Users
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getUsers');
    }
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
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getUsers');
    }
  }
};

/**
 * Получение данных Клуба из ZwiftAPI
 */
export const getClub = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await getClubService(id);

    res.status(200).json(club);
  } catch (error) {
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    errorHandler(error);
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
    const { _id, banned } = req.body as {
      _id: string;
      banned: boolean;
    };

    const response = await putActivityInFitFileService({ _id, banned });

    res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
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
