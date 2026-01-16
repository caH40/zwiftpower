import { SeriesStageProtocolManager } from './SeriesStageProtocolManager.js';
import { TourGCManager } from './tour/TourGCManager.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { StageResultRepository } from '../../repositories/StageResult.js';

/**
 * Сервис для работы с временными штрафами.
 */
export class SeriesTimePenalty {
  private stageResultRepository = new StageResultRepository();
  /**
   * Изменение временного штрафа у участника в результате заезда на этапа.
   */
  public async modify({
    seriesId,
    stageResultId,
    timePenalty,
  }: {
    seriesId: string;
    stageResultId: string;
    timePenalty: {
      timeInMilliseconds: number;
      reason: string;
      modifiedAt: string;
      moderator: { username: string; _id: string };
    }[];
  }): Promise<TResponseService<null>> {
    const timePenaltyFormatted = timePenalty.map((penalty) => ({
      ...penalty,
      moderatorId: penalty.moderator._id,
    }));

    const stageResult = await this.stageResultRepository.getStageResultById(stageResultId);
    if (!stageResult) {
      throw new Error('Результат этапа серии не найден');
    }

    const sumTimePenalties = this.getSumTimePenalty(timePenaltyFormatted);

    // Новое время с учетом штрафа в результате этапа серии.
    const durationInMillisecondsWithPenalties =
      stageResult.activityData.durationInMilliseconds + sumTimePenalties;

    const removeTimePenalty = sumTimePenalties === 0;

    await this.stageResultRepository.changeRiderTimePenalty(
      stageResultId,
      timePenaltyFormatted,
      durationInMillisecondsWithPenalties,
      removeTimePenalty
    );

    // Пересчитать все финишные протоколы этапов из-за изменения категории у райдера.
    const stageProtocolManager = new SeriesStageProtocolManager(seriesId);
    await stageProtocolManager.recalculateStageProtocol(seriesId);

    // Обновление генеральной классификации серии.
    const tourGC = new TourGCManager(seriesId);
    await tourGC.update();

    return { data: null, message: 'Временный штраф изменен' };
  }

  public getSumTimePenalty<T extends { timeInMilliseconds: number }>(
    timePenalty: T[] | null
  ): number {
    if (!timePenalty) {
      return 0;
    }

    return timePenalty.reduce((acc, penalty) => acc + penalty.timeInMilliseconds, 0);
  }
}
