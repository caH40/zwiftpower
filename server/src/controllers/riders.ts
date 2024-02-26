import { Request, Response } from 'express';
import { AxiosError } from 'axios';

import { getRidersService } from '../service/riders/riders.js';
import { errorHandler } from '../errors/error.js';

// types
import { GetRidersQuery } from '../types/http.interface.js';

export const getRiders = async (req: Request, res: Response) => {
  try {
    const query: GetRidersQuery = req.query;

    const riders = await getRidersService({
      page: query.page ? +query.page : undefined,
      docsOnPage: query.docsOnPage ? +query.docsOnPage : undefined,
      search: query.search,
    });

    res.status(200).json(riders);
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
