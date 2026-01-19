import { NSeriesModel } from '../../Model/NSeries.js';
import { GCProviderFactory } from './GCProviderFactory.js';
import { SeriesClassificationRepository } from '../../repositories/SeriesClassification.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { TSeriesType } from '../../types/model.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { getSeasonPeriod } from '../../utils/season.js';
import { TeamScoreAggregator } from '../TeamScoreAggregator/TeamScoreAggregator.js';
import { SeriesStageProtocolManager } from './SeriesStageProtocolManager.js';

/**
 * Класс работы с генеральными классификациями серий и туров.
 */
export class SeriesGCManager {
  private seriesClassificationRepository: SeriesClassificationRepository;

  constructor(public seriesId: string) {
    this.seriesClassificationRepository = new SeriesClassificationRepository();
  }

  /**
   * Обновление результатов генеральной классификации.
   */
  async update(): Promise<TResponseService<null>> {
    // Получем тип серии заездов.
    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { _id: false, type: true, dateStart: true }
    ).lean<{ type: TSeriesType; dateStart: Date }>();

    if (!seriesDB) {
      throw new Error(`Не найдена серия с _id:${this.seriesId}`);
    }

    const gcProvider = new GCProviderFactory(this.seriesId);
    const gcHandler = gcProvider.getHandler(seriesDB.type);

    // Пересчет командного рейтинга сезона после изменения результатов этапов серии
    // и пересчете ГК.
    await this.recalculateTeamSeasonRating(seriesDB.dateStart);

    return await gcHandler.update();
  }

  /**
   * Пересчет ГК и всех этапов.
   */
  async recalculateGCWithAllStages(): Promise<TResponseService<null>> {
    const seriesStageProtocolManager = new SeriesStageProtocolManager(this.seriesId);
    await seriesStageProtocolManager.recalculateStageProtocol(this.seriesId);

    return this.update();
  }

  /**
   * Удаление генеральной классификации для серии seriesId
   * @param seriesId
   */
  async delete(): Promise<void> {
    try {
      await this.seriesClassificationRepository.deleteMany(this.seriesId);
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /**
   * Обновление командного рейтинга сезона после изменения результатов этапов серии.
   */
  private recalculateTeamSeasonRating = async (dateStart: Date): Promise<void> => {
    // Обновление таблицы рейтинга команд.
    const season = getSeasonPeriod(new Date(dateStart));

    if (season?.label) {
      const service = new TeamScoreAggregator();
      await service.recalculateTeamSeasonRating(season.label);
    } else {
      handleAndLogError(
        new Error(`Не удалось определить сезон для даты ${dateStart.toISOString()}`)
      );
    }
  };
}
