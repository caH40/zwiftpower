/**
 * Сериализация данных для создания команды для отправки на сервер.
 */
export function serializeTeamCreate(data) {
  const formData = new FormData();

  Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      if (['logoFile', 'posterFile'].includes(key)) {
        // Добавляем файл как есть
        formData.append(key, value);
      } else if (typeof value === 'string') {
        formData.append(key, value);
      } else if (typeof value === 'number') {
        formData.append(key, String(value));
      } else {
        // Преобразуем другие данные в строки
        formData.append(key, JSON.stringify(value));
      }
    });

  return formData;
}
