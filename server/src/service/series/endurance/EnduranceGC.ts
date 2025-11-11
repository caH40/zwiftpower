import { SeriesRepository } from '../../../repositories/Series.js';
import { SeriesClassificationRepository } from '../../../repositories/SeriesClassification.js';
import { getOrThrow } from '../../../utils/getOrThrow.js';
import { AbstractBaseGCManager } from '../AbstractBaseGC.js';
import { createRidersResults } from '../ridersResults.js';

/**
 * Класс работы с генеральной классификацией серии типа Endurance.
 */
export class EnduranceGC extends AbstractBaseGCManager {
  private seriesRepository: SeriesRepository = new SeriesRepository();
  private gcRepository: SeriesClassificationRepository = new SeriesClassificationRepository();

  constructor(public seriesId: string) {
    super(seriesId);
  }

  /**
   * Пересчет всех итоговых таблиц.
   */
  update = async () => {
    const seriesDB = await getOrThrow(
      this.seriesRepository.getStageIds(this.seriesId),
      `Серия с ID ${this.seriesId} не найдена.`
    );

    // Группировка результатов по райдерам.
    const riderResults = await createRidersResults(this.seriesId);

    // Создание генеральной классификации серии заездов.
    const gc = this.createGC(riderResults);

    // Удаление предыдущих данных по этой серии.
    await this.gcRepository.deleteMany(this.seriesId);

    // Сохранение в БД.
    await this.gcRepository.create(gc);

    // Изменение даты когда обновлялись результаты серии.
    await this.seriesRepository.getById(this.seriesId);

    return {
      data: null,
      message: `Обновлена (создана) генеральная классификация серии заездов "${seriesDB.name}"`,
    };
  };

  private createGC = async (riderResults: TRidersResults): Promise<unknown> => {};
}
