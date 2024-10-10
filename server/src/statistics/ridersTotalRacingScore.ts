import { Rider } from '../Model/Rider.js';

// types
import { TRidersRacingScore, TRidersRacingScores } from '../types/types.interface.js';

// Шаг диапазона суммирования данных.
const step = 10;

// Максимальная величина рейтинговых очков.
const maxValueRS = 1000;

/**
 * Сервис получения распределения всех райдеров по рейтинговым очкам с шагом step.
 */
export const getRidersTotalRacingScoreService = async (): Promise<TRidersRacingScores> => {
  const ridersDB: { competitionMetrics: { racingScore: number } | null; male: boolean }[] =
    await Rider.find({}, { 'competitionMetrics.racingScore': true, male: true }).lean();

  // Инициализируем карты с элементами от step до 1000 с шагом step.
  const initializeRacingScoreMap = () => {
    return new Map<number, number>(
      Array.from({ length: maxValueRS / step }, (_, index) => [(index + 1) * step, 0])
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

    // Округляем баллы до ближайшего значения, кратного step.
    const scoreRange = Math.ceil(rider.competitionMetrics.racingScore / step) * step;

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
