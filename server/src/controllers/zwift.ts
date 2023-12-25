import { Request, Response } from 'express';

import { getZwiftEventResultsService } from '../service/zwift/download.js';
import { getEventZwiftService, putEventZwiftService } from '../service/zwift/events.js';
import { getZwiftRiderService } from '../service/zwift/rider.js';
import { errorHandler } from '../errors/error.js';

//types
import { PutEvent } from '../types/http.interface.js';
import { AxiosError } from 'axios';

export async function getEvent(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const event = await getEventZwiftService(+eventId);
    res.status(200).json(event);
  } catch (error) {
    errorHandler(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        error.response.data.message;
        res.status(400).json(error.response.data);
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Контроллер для внесения изменений (обновление) данных заезда на сервере Zwift в Эвенте
 */
export async function putEvent(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const event: PutEvent = req.body.event;
    const eventChanged = await putEventZwiftService(event, userId);
    res.status(200).json(eventChanged);
  } catch (error) {
    errorHandler(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        error.response.data.message;
        res.status(400).json(error.response.data);
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export async function getZwiftRider(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;
    const rider = await getZwiftRiderService(zwiftId);
    res.status(200).json(rider);
  } catch (error) {
    errorHandler(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        error.response.data.message;
        res.status(400).json(error.response.data);
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Получение результатов Эвента для скачивания
 */
export async function getZwiftEventResults(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const { results } = await getZwiftEventResultsService(eventId);

    res.send(results);
  } catch (error) {
    errorHandler(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        error.response.data.message;
        res.status(400).json(error.response.data);
      }
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
