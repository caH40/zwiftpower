// types
import { ResultSeries, TLeaderboardsCatchupDto } from '../../../types/types.interface.js';
import { ProfileDataInResult } from '../../../types/model.interface.js';

const categories = ['E', 'A', 'B', 'C', 'D'] as const;

/**
 * Сервис получения лидеров по победам в каждой группе в Догонялках.
 */
export function getLeaderboardCatchup(results: ResultSeries[]): TLeaderboardsCatchupDto[] {
  // Инициализация структуры данных для хранения лидеров.
  const initialData = categories.map((cat) => ({
    category: cat,
    leaders: new Map<number, { profileData: ProfileDataInResult; wins: number }>(),
  }));

  // Заполнение данных о победителях.
  const leaderboard = results.reduce((acc, cur) => {
    // Исключение результатов, когда не было деления на подгруппы, а была одна общая.
    // В БД только один такой Эвент с id=3656077
    if (cur.eventId === 3656077) {
      return acc;
    }
    const group = acc.find((elm) => elm.category === cur.subgroupLabel);

    // Если группа не найдена, пропускаем текущий результат.
    if (!group) return acc;

    // Обновляем или добавляем победителя в текущую группу.
    const currentLeader = group.leaders.get(cur.profileId);
    if (currentLeader) {
      currentLeader.wins++;
    } else {
      group.leaders.set(cur.profileId, {
        profileData: cur.profileData,
        wins: 1,
      });
    }

    return acc;
  }, initialData);

  // Формируем финальный массив с топ-3 победителями в каждой категории.
  return leaderboard.map((elm) => {
    const leaders = [...elm.leaders.entries()]
      .sort((a, b) => b[1].wins - a[1].wins) // Сортировка по числу побед.
      .slice(0, 3) // Выбор только топ-3.
      .map(([zwiftId, data]) => ({
        zwiftId,
        profileData: data.profileData,
        wins: data.wins,
      }));

    return {
      category: elm.category,
      leaders,
    };
  });
}
