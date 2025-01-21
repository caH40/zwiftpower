export function serializeOrganizerData(data) {
  const formData = new FormData();

  Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      if (['logoFile', 'backgroundImageFile'].includes(key)) {
        // Добавляем файл как есть
        formData.append(key, value);
      } else {
        // Преобразуем другие данные в строки
        formData.append(key, JSON.stringify(value));
      }
    });

  return formData;
}
