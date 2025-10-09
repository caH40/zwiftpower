import { FINISH_TIME_ADJUSTMENT, groupTargetWattsPerKg } from '../../assets/constants.js';
import { routes } from '../../assets/zwift/lib/cjs/routes.js';
import { handleAndLogError } from '../../errors/error.js';
import { NSeriesModel } from '../../Model/NSeries.js';
import { cyclingTimeInMilliseconds } from '../../utils/cycling-time.js';
import { SeriesStageProtocolManager } from '../series/SeriesStageProtocolManager.js';

/**
 * Решает когда запускать обновление результатов  этапа серии.
 * Запуск обновления
 */
export class SeriesResultsUpdater {
  constructor(private seriesId: string) {}

  // Обновление (создание протокола) результатов этап происходит по seriesId и stageOrder.
  async update() {
    try {
      const stages = await this.getStageOrdersForUpdate();

      const stageOrders = stages.reduce<number[]>((acc, cur) => {
        this.isTimeToUpdate(cur.eventSubgroups) && acc.push(cur.order);
        return acc;
      }, []);

      if (stageOrders.length === 0) {
        return;
      }

      const protocolManager = new SeriesStageProtocolManager(this.seriesId);

      // Обновляем протоколы каждого этапа и ГС.
      await Promise.all(
        stageOrders.map((stageOrder) => protocolManager.updateStageProtocolAndGC(stageOrder))
      );
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
    const now = Date.now();

    // Получаем все времена финиша
    const finishTimes = subgroups
      .map((cur) => {
        const routeData = routes.find((r) => r.id === cur.routeId);
        if (!routeData) return null;

        const { distance, elevation, leadInDistance, leadInElevation } = routeData as {
          distance: number;
          elevation: number;
          leadInDistance: number;
          leadInElevation: number;
        };
        const avgPowerWatts = groupTargetWattsPerKg[cur.label];

        if (
          !avgPowerWatts ||
          isNaN(distance) ||
          isNaN(elevation) ||
          isNaN(leadInDistance) ||
          isNaN(leadInElevation)
        ) {
          return null;
        }

        const distanceKilometers = distance + leadInDistance;
        const ascentMeters = elevation + leadInElevation;

        const time = cyclingTimeInMilliseconds({
          distanceKilometers,
          ascentMeters,
          avgPowerWatts,
          laps: cur.laps ? cur.laps : 1,
        });

        const startTime = new Date(cur.eventSubgroupStart).getTime();

        return { finish: startTime + Math.trunc(time), active: time };
      })
      .filter(
        (
          time
        ): time is {
          finish: number;
          active: number;
        } => time !== null
      );

    if (finishTimes.length === 0) {
      return false;
    }

    finishTimes.sort((a, b) => a.finish - b.finish);

    const minFinishTime = finishTimes[0].finish;
    const maxFinishTime = finishTimes.at(-1)!.finish;
    const activeTime = finishTimes.at(-1)!.active;

    // Обновляем от старта первой группы до финиша последней + дополнительное время
    return now >= minFinishTime && now <= maxFinishTime + activeTime * FINISH_TIME_ADJUSTMENT;
  }
}
