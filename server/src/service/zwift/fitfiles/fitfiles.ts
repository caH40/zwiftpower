import { getZwiftRiderService } from '../rider.js';
import { getActivities } from './activities.js';
import { filterActivities } from './filter-activities.js';
import { getFitFilesFromZwift } from './fitfileFromZwift.js';
import { saveFitFiles } from './fitfilestoDB.js';
import { errorHandler } from '../../../errors/error.js';

/**
 * Сохранение fitfiles райдера в БД за последние 90 дней
 */
export async function createFitFiles(zwiftId: number): Promise<void> {
  try {
    // последние 50 активностей райдера zwiftId
    const activities = await getActivities(zwiftId);

    // наличие ошибки при получении активностей райдера zwiftId
    if (!activities) {
      return;
    }

    // исключение активностей которые старше 90 дней и которые есть в БД
    const activitiesFiltered = await filterActivities(activities, zwiftId);

    // запрос данный райдера для получения веса
    const rider = await getZwiftRiderService(String(zwiftId));

    // получение данных fitFiles из API Zwift
    const powers = await getFitFilesFromZwift(activitiesFiltered, rider ? rider.weight : 0);

    // при отсутствии данных с fitfiles
    if (!powers) {
      return;
    }

    // сохранение в данных из fitFiles в БД
    await saveFitFiles(powers, zwiftId);
  } catch (error) {
    errorHandler(error);
  }
}
