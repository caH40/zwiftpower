import { Request, Response } from 'express';

import { errorHandler } from '../errors/error.js';
import { getUsersService } from '../service/admin/users.js';

// types
import { UserSchema } from '../types/model.interface.js';

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
