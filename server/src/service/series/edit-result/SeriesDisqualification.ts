import { SeriesRepository } from '../../../repositories/Series.js';
import { StageResultRepository } from '../../../repositories/StageResult.js';
import { TResponseService } from '../../../types/http.interface.js';
import { TDisqualification } from '../../../types/model.interface.js';
import { getOrThrow } from '../../../utils/getOrThrow.js';
import { SeriesGCManager } from '../SeriesGCManager.js';

/**
 * Класс работы с дисквалификацией результатов в серии заездов.
 */
export class SeriesDisqualification {
  stageResultRepository = new StageResultRepository();

  /**
   * Установка дисквалификации.
   */
  async set({
    resultId,
    disqualification,
  }: {
    resultId: string;
    disqualification: Omit<TDisqualification, 'moderator'>;
  }): Promise<TResponseService<null>> {
    // Если отсутствует label
    const label = disqualification.label || 'DSQ';

    // Если отсутствует причина.
    const reason = disqualification.reason || 'Дисквалификация';

    const modifiedAt = new Date();
    const result = await getOrThrow(
      this.stageResultRepository.setDisqualification({
        resultId,
        disqualification: { ...disqualification, label, reason, modifiedAt },
      }),
      `Не найден результат с _id: "${resultId}" для дисквалификации`
    );

    // Пересчет ГК и всех этапов.
    await this.recalculateAllStageResultsAndGC(resultId);

    return {
      data: null,
      message: `Установлена дисквалификация для результата райдера ${result.profileData.lastName} ${result.profileData.firstName} в серии ${result.series.name} на этапе №${result.order}!`,
    };
  }

  /**
   * Снятие дисквалификации.
   */
  async remove(resultId: string): Promise<TResponseService<null>> {
    const result = await getOrThrow(
      this.stageResultRepository.removeDisqualification(resultId),
      `Не найден результат с _id: "${resultId}" для дисквалификации`
    );

    return {
      data: null,
      message: `Снята дисквалификация для результата райдера ${result.profileData.lastName} ${result.profileData.firstName} в серии ${result.series.name} на этапе №${result.order}!`,
    };
  }

  /**
   * Пересчет ГК и всех этапов
   */
  private async recalculateAllStageResultsAndGC(resultId: string): Promise<void> {
    const seriesRepository = new SeriesRepository();

    const { _id: seriesId } = await getOrThrow(
      seriesRepository.getByStageResultId(resultId),
      `Не найдена серия заездов в к которой принадлежит результат этапа _id: "${resultId}"`
    );

    const seriesGCManager = new SeriesGCManager(seriesId!.toString());

    await seriesGCManager.recalculateGCWithAllStages();
  }
}
