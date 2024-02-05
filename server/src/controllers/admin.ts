import { Request, Response } from 'express';
import { AxiosError } from 'axios';

import { errorHandler } from '../errors/error.js';
import { getUsersService } from '../service/admin/users.js';
import {
  deleteClubService,
  getClubService,
  getClubsService,
  postClubService,
} from '../service/admin/club.js';

// types
import { ClubSchema, UserSchema } from '../types/model.interface.js';
import { ClubZwift } from '../types/zwiftAPI/clubFromZwift.interface.js';

/**
 * Получение всех зарегистрированных Users
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Omit<UserSchema, 'password'>[] = await getUsersService();
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
    const club: ClubZwift = req.body.club;
    const clubPosted: { message: string } = await postClubService(club);

    res.status(200).json(clubPosted);
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
