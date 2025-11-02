import { NSeriesModel } from '../../Model/NSeries.js';
import { TourGCManager } from './tour/TourGCManager.js';
import { SeriesClassificationRepository } from '../../repositories/SeriesClassification.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { TSeriesType } from '../../types/model.interface.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс работы с генеральными классификациями серий и туров.
 */
export class SeriesGCManager {
  private seriesClassificationRepository: SeriesClassificationRepository;

  constructor(public seriesId: string) {
    this.seriesClassificationRepository = new SeriesClassificationRepository();
  }

  async update(): Promise<TResponseService<null>> {
    // Получем тип серии заездов.
    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { _id: false, type: true }
    ).lean<{ type: TSeriesType }>();

    if (!seriesDB) {
      throw new Error(`Не найдена серия с _id:${this.seriesId}`);
    }

    const response = {
      data: null,
      message: `⚠️ Функционал для типа '${seriesDB.type}' находится в разработке`,
    };

    switch (seriesDB.type) {
      case 'series':
        return response;

      case 'tour': {
        // Обновление генеральной классификации серии.
        const tourGCService = new TourGCManager(this.seriesId);
        // Вызов сервиса.
        return await tourGCService.update();
      }

      case 'catchUp':
        return response;

      case 'criterium':
        return response;

      default:
        throw new Error(`❌ Неподдерживаемый тип серии: ${seriesDB.type}`);
    }
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
}
