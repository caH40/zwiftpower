/**
 * Фильтрация результатов по категориям райдеров (мужчин и женщин).
 *
 * Эта функция создаёт фильтр для MongoDB-запроса, который определяет,
 * к какой категории относится райдер в зависимости от его пола. Если
 * указана категория 'All', то возвращается пустой объект, что означает
 * отсутствие фильтрации по категориям. Если указана конкретная категория
 * ('A', 'B', 'C', 'D', 'E'), функция возвращает условия для фильтрации:
 * - Для мужчин проверяется поле `competitionMetrics.category`.
 * - Для женщин проверяется поле `competitionMetrics.categoryWomen`.
 *
 * @param {Object} options - Параметры фильтрации.
 * @param {'All' | 'A' | 'B' | 'C' | 'D' | 'E'} options.category - Категория для фильтрации (например, 'A', 'B', 'C', 'D', 'E' или 'All').
 * @returns {Object} MongoDB фильтр, который используется для выборки данных.
 */
export const categoryFilter = ({
  category,
}: {
  category: 'All' | 'A' | 'B' | 'C' | 'D' | 'E';
}) => {
  return category === 'All'
    ? {}
    : {
        $or: [
          { 'competitionMetrics.category': category, male: true },
          { 'competitionMetrics.categoryWomen': category, male: false },
        ],
      };
};

/**
 * Создание запроса по полу райдера.
 */
export const createMaleQuery = ({ gender }: { gender?: 'male' | 'female' }) => {
  if (!gender) {
    return undefined;
  }

  return gender === 'male' ? true : false;
};
