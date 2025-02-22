export function serializeOrganizerData(data) {
  const formData = new FormData();

  Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      if (['logoFile', 'posterFile'].includes(key)) {
        // Добавляем файл как есть
        formData.append(key, value);
      } else {
        // Преобразуем другие данные в строки
        formData.append(key, JSON.stringify(value));
      }
    });

  return formData;
}

/**
 * Сериализация данных для создания Серии заездов для отправки на сервер.
 */
export function serializeOrganizerSeriesCreate(data) {
  const formData = new FormData();

  if (data.stages && Array.isArray(data.stages)) {
    // FIXME: Изменить ORDER на stage.order
    data.stages = data.stages.map((stage) => ({ event: stage._id, order: 1 }));
  }

  Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      if (['logoFile', 'posterFile'].includes(key)) {
        // Добавляем файл как есть
        formData.append(key, value);
      } else {
        // Преобразуем другие данные в строки
        formData.append(key, JSON.stringify(value));
      }
    });

  return formData;
}
