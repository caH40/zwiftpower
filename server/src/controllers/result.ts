import { Request, Response } from 'express';

import { putResultService } from '../service/result_edit/result.js';
import { handleAndLogError } from '../errors/error.js';

// types
import { PutResult } from '../types/http.interface.js';

/**
 * Изменение результата Райдера
 */
export const putResult = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data: PutResult = req.body;

    const response = await putResultService({ moderatorId: userId, ...data });
    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
