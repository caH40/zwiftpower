// types

import { StageResultRepository } from '../../../repositories/StageResult.js';
import { getOrThrow } from '../../../utils/getOrThrow.js';

// types
import { TResponseService } from '../../../types/http.interface.js';

export class SeriesDeleteStageResult {
  private stageResultRepository = new StageResultRepository();

  /**
   * Проблема: сырой результат нельзя сохранить в БД, так как отсутствуют расчетные обязательные поля.
   * 1. Проверь есть ли у даного райдера profileId результат в данном этапе
   * 1. Если несколько заездов на этапе, определить какой эвент главный, а какие перезаезды. Использовать _id главного эвента на этапе.
   *
   * 2.
   */
  async delete(resultId: string): Promise<TResponseService<null>> {
    const result = await getOrThrow(
      this.stageResultRepository.delete(resultId),
      `Не найден результат с _id: ${resultId}`
    );

    return {
      data: null,
      message: `Удалён результат райдера ${result.profileData.lastName} ${result.profileData.firstName} c zwiftId: ${result.profileId}`,
    };
  }
}
