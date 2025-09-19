import { groupTargetWattsPerKg } from '../../assets/constants';
import { millisecondsIn30Minutes } from '../../assets/date';
import { routes } from '../../assets/zwift/lib/cjs/routes';
import { handleAndLogError } from '../../errors/error';
import { NSeriesModel } from '../../Model/NSeries';
import { cyclingTimeInMilliseconds } from '../../utils/cycling-time';
import { TourResultsManager } from '../series/tour/TourResultsManager';

/**
 * Решает когда запускать обновление результатов  этапа серии.
 * Запуск обновления
 */
export class SeriesResultsUpdater {
  constructor(private seriesId: string) {}

  // Обновление (создание протокола) результатов этап происходит по seriesId и stageOrder.
  async update() {
    try {
      const tour = new TourResultsManager(this.seriesId);

      const stages = await this.getStageOrdersForUpdate();

      const stageOrders = stages.reduce<number[]>((acc, cur) => {
        this.isTimeToUpdate(cur.eventSubgroups) && acc.push(cur.order);
        return acc;
      }, []);

      await Promise.all(stageOrders.map((stageOrder) => tour.buildStageProtocol(stageOrder)));
    } catch (e) {
      handleAndLogError(e);
    }
  }

  /**
   * Получает данные по группам в заездах серии.
   */
  private async getStageOrdersForUpdate(): Promise<
    {
      order: number;
      eventSubgroups: {
        eventSubgroupStart: string;
        label: number;
        routeId: number;
        laps: number;
      }[];
    }[]
  > {
    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { _id: false, stages: true }
    )
      .populate({
        path: 'stages',
        select: ['-_id', 'order'],
        populate: {
          path: 'event',
          populate: {
            path: 'eventSubgroups',
            select: ['-_id', 'eventSubgroupStart', 'label', 'routeId', 'laps'],
          },
        },
      })
      .lean<{
        stages: {
          order: number;
          event: {
            eventSubgroups: {
              eventSubgroupStart: string;
              label: number;
              routeId: number;
              laps: number;
            }[];
          };
        }[];
      }>();

    if (!seriesDB) {
      throw new Error(`Не найдена серия с _id: ${this.seriesId}`);
    }

    return seriesDB.stages.map((stage) => ({
      order: stage.order,
      eventSubgroups: stage.event.eventSubgroups,
    }));
  }

  /**
   * Определяет необходимо делать обновление результатов этапа или нет, на основе данных:
   * Времени старта этапа, групп в этапе (по А+ время старта обновления,
   * по Д время завершения обновления), дистанции и общему набору.
   *
   * Для каждой группы необходимо высчитать примерное время финиша.
   * Время группы которая финиширует первой будет временем старта обновления.
   * Время группы которая финиширует последней будет временем остановки обновления + gap.
   * Если now находится между этих времен, значит необходимо обновлять результаты этапа
   */

  private isTimeToUpdate(
    subgroups: {
      eventSubgroupStart: string;
      label: number;
      routeId: number;
      laps: number;
    }[]
  ): boolean {
    const now = new Date().getTime();
    const GAP = millisecondsIn30Minutes;

    // Получаем все времена финиша
    const finishTimes = subgroups
      .map((cur) => {
        const routeData = routes.find((r) => r.id === cur.routeId);
        if (!routeData) return null;

        const { distance, elevation } = routeData as { distance: number; elevation: number };
        const avgPowerWatts = groupTargetWattsPerKg[cur.label];

        if (!avgPowerWatts || isNaN(distance) || isNaN(elevation)) {
          return null;
        }

        const time = cyclingTimeInMilliseconds({
          distanceMeters: distance,
          ascentMeters: elevation,
          avgPowerWatts,
          laps: cur.laps,
        });

        return new Date(cur.eventSubgroupStart).getTime() + time;
      })
      .filter((time): time is number => time !== null);

    if (finishTimes.length === 0) {
      return false;
    }

    const minFinishTime = Math.min(...finishTimes);
    const maxFinishTime = Math.max(...finishTimes);

    // Обновляем от старта первой группы до финиша последней + дополнительное время
    return now >= minFinishTime && now <= maxFinishTime + GAP;
  }
}
