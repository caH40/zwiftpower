import { getZwiftRiderService } from '../rider.js';
import { getActivities } from './activities.js';
import { filterActivities } from './filter-activities.js';
import { saveFitFiles } from './fitfilestoDB.js';

export async function createFitFiles(zwiftId: number) {
  try {
    // последние 50 активностей райдера zwiftId
    const activities = await getActivities(zwiftId);
    // исключение активностей которые старше 90 дней и которые есть в БД
    const activitiesFiltered = await filterActivities(activities, zwiftId);
    // запрос данный райдера для получения веса
    const rider = await getZwiftRiderService(String(zwiftId));
    // сохранение в данных из fitFiles в БД
    await saveFitFiles(zwiftId, activitiesFiltered, rider ? rider.weight : 0);
  } catch (error) {
    console.log(error);
  }
}
