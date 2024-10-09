import { Rider } from '../Model/Rider.js';

// types
import { TRidersRacingScore, TRidersRacingScores } from '../types/types.interface.js';

/**
 * Сервис получения распределения всех райдеров по рейтинговым очкам с шагом 20.
 */
export const getRidersTotalRacingScoreService = async (): Promise<TRidersRacingScores> => {
  const ridersDB: { competitionMetrics: { racingScore: number } | null; male: boolean }[] =
    await Rider.find({}, { 'competitionMetrics.racingScore': true, male: true }).lean();

  // Инициализируем карты с элементами от 20 до 1000 с шагом 20.
  const initializeRacingScoreMap = () => {
    return new Map<number, number>(
      Array.from({ length: 50 }, (_, index) => [(index + 1) * 20, 0])
    );
  };

  const maleRacingScoreMap = initializeRacingScoreMap();
  const femaleRacingScoreMap = initializeRacingScoreMap();

  // Функция для обновления карты.
  const updateRacingScore = (map: Map<number, number>, scoreRange: number) => {
    map.set(scoreRange, (map.get(scoreRange) || 0) + 1);
  };

  for (const rider of ridersDB) {
    // Пропускаем, если у райдера нет рейтингового балла.
    if (!rider.competitionMetrics?.racingScore) {
      continue;
    }

    // Округляем баллы до ближайшего значения, кратного 20.
    const scoreRange = Math.ceil(rider.competitionMetrics.racingScore / 20) * 20;

    // Обновляем карту для мужчин или женщин.
    if (rider.male) {
      updateRacingScore(maleRacingScoreMap, scoreRange);
    } else {
      updateRacingScore(femaleRacingScoreMap, scoreRange);
    }
  }

  // Преобразуем карты в массивы объектов.
  const maleRacingScore: TRidersRacingScore[] = [...maleRacingScoreMap].map(
    ([scoreRange, value]) => ({
      scoreRange,
      value,
    })
  );

  const femaleRacingScore: TRidersRacingScore[] = [...femaleRacingScoreMap].map(
    ([scoreRange, value]) => ({
      scoreRange,
      value,
    })
  );

  return { maleRacingScore, femaleRacingScore };
};
