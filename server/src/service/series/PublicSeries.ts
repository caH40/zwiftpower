import { Types } from 'mongoose';

import { seriesAllPublicDto, seriesOnePublicDto } from '../../dto/series.js';
import { getResultsSeriesCatchup } from './catchup/index.js';
import { Organizer } from '../../Model/Organizer.js';
import { getOrThrow } from '../../utils/getOrThrow.js';
import { SeriesRepository } from '../../repositories/Series.js';

// types
import {
  TGroupedSeriesForClient,
  TSeriesAllPublicDto,
  TSeriesOnePublicDto,
} from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс работы с Сериями заездов по запросам пользователей сайта.
 */
export class PublicSeriesService {
  private seriesRepository: SeriesRepository = new SeriesRepository();
  constructor() {}

  /**
   * Сервис получение всех Серий заездов.
   */
  public async getAll(
    organizerSlug?: string
  ): Promise<TResponseService<TGroupedSeriesForClient>> {
    // Получение _id организатора если есть запрос по organizerSlug, для последующего поиска Series
    const organizer = organizerSlug
      ? await Organizer.findOne({ urlSlug: organizerSlug }, { _id: true }).lean<{
          _id: Types.ObjectId;
        }>()
      : null;

    // Формирование строки поиска.
    const searchQuery = { ...(organizer && { organizer }) };

    // Получение всех Серий заезда, или только Серий заездов организатора, если есть organizerSlug.
    const seriesDB = await this.seriesRepository.getAllForPublicGC(searchQuery);

    const seriesAfterDto = seriesAllPublicDto(seriesDB);

    // Группировка карточек по статусам и сортировка внутри каждой группы.
    const groupedSeries = this.groupByStatus(seriesAfterDto);

    return { data: groupedSeries, message: 'Серии заездов.' };
  }

  /**
   * Сервис получение данных Серий заездов по urlSlug.
   * FIXME: Может добавить options для сужения запроса,
   */
  public async get(urlSlug: string): Promise<TResponseService<TSeriesOnePublicDto>> {
    const seriesOneDB = await getOrThrow(
      this.seriesRepository.getForPublicGC(urlSlug),
      `Не найдена Серия заездов с urlSlug: "${urlSlug}"`
    );

    // Фильтрация от этапов у которых нет id Эвента.
    const stagesFilteredAndSorted = seriesOneDB.stages
      .filter((stage) => stage.event)
      .sort((a, b) => a.order - b.order);

    seriesOneDB.stages = stagesFilteredAndSorted;

    // Добавление итоговых таблиц результатов для разных типов серий.
    let seriesResults = {};
    switch (seriesOneDB.type) {
      case 'catchUp':
        seriesResults = await getResultsSeriesCatchup(seriesOneDB._id);
        break;

      case 'series':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'tour': {
        seriesResults = {
          message: 'Генеральная классификация отправляется отдельным запросом.',
        };
        break;
      }

      case 'endurance': {
        seriesResults = {
          message: 'Генеральная классификация отправляется отдельным запросом.',
        };
        break;
      }

      case 'criterium':
        seriesResults = { message: 'В разработке...' };
        break;

      default:
        throw new Error(`Не опознан тип seriesType: ${seriesOneDB.type}`);
    }

    const seriesAfterDto = seriesOnePublicDto(seriesOneDB, seriesResults);

    return { data: seriesAfterDto, message: 'Запрашиваемая Серия заездов.' };
  }

  /**
   * Группировка событий по их статусу и сортировка внутри каждой группы.
   * @param series - Все события.
   * @returns - Группировка по статусам.
   */
  private groupByStatus(series: TSeriesAllPublicDto[]) {
    const now = Date.now();

    // Объявляем тип для группировки
    const grouped: TGroupedSeriesForClient = {
      upcoming: [],
      ongoing: [],
      completed: [],
    };

    // Группируем и сразу сортируем в каждой группе.
    series.forEach((card) => {
      const startDate = new Date(card.dateStart).getTime();
      const endDate = new Date(card.dateEnd).getTime();

      if (now < startDate) {
        grouped.upcoming.push(card); // Событие еще не началось.
      } else if (now >= startDate && now <= endDate) {
        grouped.ongoing.push(card); // Событие проходит сейчас.
      } else {
        grouped.completed.push(card); // Событие завершилось.
      }
    });

    // Сортируем группу по дате начала.
    grouped.upcoming.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    // Сортируем группу по дате начала.
    grouped.ongoing.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    // Завершенные серии сортируем по дате завершения.
    grouped.completed.sort(
      (a, b) => new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime()
    );

    return grouped;
  }
}
