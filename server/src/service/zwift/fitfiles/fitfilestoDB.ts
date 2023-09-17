import { FitFile } from '../../../Model/FitFile.js';

// types
import { PowerFitFiles } from '../../../types/types.interface.js';

/**
 *  Получение и сохранение в данных из fitFiles в БД для Райдера zwiftId
 */
export async function saveFitFiles(powers: PowerFitFiles[], zwiftId: number) {
  // сортировка для нахождения последней активности
  powers.sort((a, b) => b.date - a.date);
  const dateLastedActivity = powers[0].date;

  // добавление фитфайла в БД
  await FitFile.findOneAndUpdate(
    { zwiftId },
    { $addToSet: { activities: { $each: powers } }, $set: { dateLastedActivity } },
    {
      upsert: true,
    }
  );
}
