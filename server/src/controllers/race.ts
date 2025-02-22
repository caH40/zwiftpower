import { Request, Response } from 'express';

import { deleteEventAndResultsService } from '../service/race/events-delete.js';
import { postEventService } from '../service/race/event_post/events-post.js';
import { putEventService } from '../service/race/events-put.js';
import { getEventService } from '../service/race/event_get/event-get.js';
import {
  getEventsForSeriesService,
  getEventsService,
} from '../service/race/events_list/events.js';
import { putResultsService } from '../service/race/results-put.js';
import { getResultsService } from '../service/race/results.js';
import { getSeriesService } from '../service/race/series.js';
import { handleAndLogError, handleErrorInController } from '../errors/error.js';
import { getResultsSeriesService } from '../service/series/index.js';
import { checkModeratorClub } from '../service/moderator-club.js';

// types
import { GetEvents, PostEvent } from '../types/http.interface.js';
import { eventParamsDto } from '../dto/eventParams.dto.js';
import { EventSignedRidersFetch } from '../common/types/eventSignedRiders.interface.js';
import { getNextWeekRacesService } from '../service/race/events_list/next-week.js';
import { SeriesController } from './series.js';

/**
 * Получение Event (описание) и зарегистрировавшихся райдеров
 */
export async function getEvent(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const event: EventSignedRidersFetch = await getEventService(eventId);

    res.status(200).json({ event });
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
// получение данных заезда (started=false для расписания, started:true для результатов)
export async function getEvents(req: Request, res: Response) {
  try {
    const query: GetEvents = req.query;
    const events = await getEventsService(query);
    res.status(200).json(events);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Создание(сохранение) нового Эвента в БД
 */
export async function postEvent(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const event: PostEvent = req.body.event;

    // подготовка данных для сервиса
    const eventAfterDto = eventParamsDto(event);

    // Проверка является ли userId модератором клуба в котором создается данный Эвент
    await checkModeratorClub({ userId, clubId: eventAfterDto.microserviceExternalResourceId });

    const eventSaved = await postEventService(eventAfterDto, userId);
    res.status(201).json(eventSaved);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
/**
 * Обновление данных Эвента и зарегистрированных райдеров в БД после запроса Модератора
 */
export async function putEvent(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const eventId: number = req.body.eventId;

    const eventUpdated = await putEventService(eventId, userId);
    res.status(201).json(eventUpdated);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Удаления Эвента и зарегистрированных райдеров, результатов райдеров в БД
 */
export async function deleteEvent(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const eventId: number = req.body.eventId;

    const eventDeleted = await deleteEventAndResultsService(eventId, userId);
    res.status(200).json(eventDeleted);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Обновление результатов Эвента
 */
export async function putResults(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const eventId: number = req.body.eventId;

    const resultsUpdated = await putResultsService(eventId, userId);
    res.status(201).json(resultsUpdated);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Удаления Эвента и зарегистрированных райдеров, результатов райдеров в БД
 */
export async function deleteEventAndResults(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const eventId: number = req.body.eventId;

    const eventDeleted = await deleteEventAndResultsService(eventId, userId);
    res.status(200).json(eventDeleted);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Получение Эвента и результатов райдеров в Эвенте из БД
 */
export async function getResults(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const eventResults = await getResultsService(+eventId);
    res.status(200).json(eventResults);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Получение данных Серии
 */
export async function getSeries(req: Request, res: Response) {
  try {
    const series = await getSeriesService();
    res.status(200).json(series);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 *
 */
export async function getResultsSeries(req: Request, res: Response) {
  try {
    const { type, season } = req.params;
    const results = await getResultsSeriesService(type, season);

    res.status(200).json(results);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Контроллер получения данных Эвентов с параметрами в расписании для рассылки информационного письма пользователям сайта.
 */
export async function getNextWeekRaces(req: Request, res: Response) {
  try {
    // Вызов сервиса.
    const response = await getNextWeekRacesService();

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер получения всех эвентов Организатора для добавления в серию заездов.
 */
export async function getEventsForSeries(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    // Проверка, что запрос происходит от Организатора.
    const seriesController = new SeriesController();
    const organizerId = await seriesController.checkOrganizer(userId);

    // Вызов сервиса.
    const response = await getEventsForSeriesService({ organizerId });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
