/**
 * Описание логируемого действия
 */
export const descriptionLogsAdmins: Description = {
  postZwiftEvent: 'Сохранение (добавление) Эвента в БД сайта',
  getZwiftEventData: 'Получение данных Эвента с сайта Звифт',
  putZwiftEventData: 'Изменение данных Эвента на сайте Звифт',
  deleteEventDataFromDB: 'Удаление Эвента и результатов с БД сайта',
  updateEventInDB: 'Обновление данных Эвента и зарегистрированных райдеров в БД сайта',
  updateEventResultsInDB:
    'Обновление данных Эвента и результатов заезда (протокола) в БД сайта',
};

interface Description {
  [key: string]: string;
}
