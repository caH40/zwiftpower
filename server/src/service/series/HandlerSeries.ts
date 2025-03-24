import { Schema } from 'mongoose';

import { NSeriesModel } from '../../Model/NSeries.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsFromZwift } from '../updates/results_event/resultsFromZwift.js';
import { getCPFromResult } from '../power/empty-cp.js';
import { MongooseUtils } from '../../utils/MongooseUtils.js';

// types
import {
  TSeries,
  TStageResult,
  ZwiftEventSubgroupSchema,
} from '../../types/model.interface.js';

export class HandlerSeries {
  mongooseUtils: MongooseUtils = new MongooseUtils();

  constructor(public seriesId: string) {}

  /**
   * Получает данные серии из базы данных.
   */
  protected async getSeriesData() {
    const seriesDB = await NSeriesModel.findOne({ _id: this.seriesId }).lean<TSeries>();

    if (!seriesDB) {
      throw new Error(`Серия с _id: ${this.seriesId} не найдена в базе данных.`);
    }

    return seriesDB;
  }

  /**
   * Получение финишных протоколов заездов Этапа серии из ZwiftAPI.
   */
  protected async getProtocolsStageFromZwift(
    stages: Schema.Types.ObjectId[]
  ): Promise<TStageResult[]> {
    // Запрос данных подгрупп заездов в этапе для последующего получения результатов подгрупп и объединения их в результаты заездов.
    const requestEventsWithSubgroups = stages.map(
      (eventId) =>
        ZwiftEvent.findOne({ _id: eventId }, { _id: false })
          .populate({ path: 'eventSubgroups', select: ['id', 'subgroupLabel'] })
          .lean<{
            eventSubgroups: ZwiftEventSubgroupSchema[];
          }>()
      // FIXME: изменить в модуле getResultsFromZwift типизацию.
      // А во всех модулях, вызывающих getResultsFromZwift изменить передаваемый параметр
      // на { subgroupLabel: string; id: number; _id: Types.ObjectId }[]
      //
      // .lean<{
      //   eventSubgroups: { subgroupLabel: string; id: number; _id: Types.ObjectId }[];
      // }>()
    );

    // Получение данных всех подгрупп для последующего запроса результатов райдеров в подгруппах.
    const eventsWithSubgroups = (await Promise.all(requestEventsWithSubgroups)).flatMap(
      (event) => {
        if (!event) {
          throw new Error('Не найден ZwiftEvent из обновляемого Этапа!');
        }
        return event.eventSubgroups;
      }
    );

    // Получение финишных протокола(протоколов) этапа серии с ZwiftAPI.
    const requestResults = await getResultsFromZwift(eventsWithSubgroups, null);

    // Формирования необходимой структуры результатов Этапа для Серии заездов.
    const stageResults = requestResults.map((result) => {
      const cpBestEfforts = getCPFromResult(result);
      const activityData = {
        durationInMilliseconds: result.activityData.durationInMilliseconds,
        subgroupLabel: result.subgroupLabel,
      };

      return {
        series: this.mongooseUtils.convertToObjectId(this.seriesId),
        profileId: result.profileId,
        eventId: result.eventId,

        // zwiftEventSubgroup: result.subgroupId,
        profileData: result.profileData,
        cpBestEfforts,
        rank: 0, // Инициализация, установка корректного места в протоколе на следующих этапах.
        activityData,
        category: null,
        points: null,
        disqualification: null,
        penalty: null,
        teamSquadAtRace: null,
      } as TStageResult;
    });

    return stageResults;
  }
}
