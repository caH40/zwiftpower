import { Request, Response } from 'express';
import { AxiosError } from 'axios';

import { getRidersService } from '../service/riders/riders.js';
import { handleAndLogError } from '../errors/error.js';

// types
import { GetRidersQuery } from '../types/http.interface.js';

export const getRiders = async (req: Request, res: Response) => {
  try {
    const query: GetRidersQuery = req.query as unknown as GetRidersQuery;

    // Приведение параметров к нужным типам
    const page = query.page ? Number(query.page) : undefined;
    const docsOnPage = query.docsOnPage ? Number(query.docsOnPage) : undefined;
    const isRasing = query.isRasing === 'true'; // Приводим строку 'true' или 'false' к boolean.

    // Пример вызова сервиса с переданными параметрами
    const riders = await getRidersService({
      page,
      docsOnPage,
      search: query.search,
      columnName: query.columnName,
      isRasing,
      category: query.category,
      male: query.male,
    });

    res.status(200).json(riders);
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
