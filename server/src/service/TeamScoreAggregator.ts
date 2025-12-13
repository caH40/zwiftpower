import { handleAndLogError } from '../errors/error';

export class TeamScoreAggregator {
  /**
   * Утилита расчета рейтинговых ZP очков команды по заработанным очкам в заездах.
   * 1. Получение всех результатов заездов и результатов этапов, которые принадлежат командным
   * райдерам и у которых zpruFinishPoints > 0;
   * 2. Суммирование очков для соответствующих команд.
   * 3. Сохранение в БД.
   */

  recalculateTeamSeasonRating = async (season: string): Promise<void> => {
    try {
      const startSeason = season.split('-')[0];
      const endSeason = season.split('-')[0];
    } catch (error) {
      handleAndLogError(error);
    }
  };
}
