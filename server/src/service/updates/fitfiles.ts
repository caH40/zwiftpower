import { FitFile } from '../../Model/FitFile.js';
import { millisecondsIn60Days } from '../../assets/date.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Удаление активностей которые старше 90 дней из FitFiles
 */
export const removeActivityFromFitFile = async (): Promise<void> => {
  try {
    const currentPeriod = Date.now() - millisecondsIn60Days;

    // фитфайлы в которых есть активности старше 90 дней
    const fitFilesDB = await FitFile.find({
      'activities.date': { $lt: currentPeriod },
    }).lean();

    for (const fitFile of fitFilesDB) {
      const currentActivities = fitFile.activities.filter(
        (activity) => activity.date > currentPeriod
      );

      // полностью обновляется массив с активностями
      await FitFile.findByIdAndUpdate(
        { _id: fitFile._id },
        { $set: { activities: currentActivities } }
      ).catch((error) => handleAndLogError(error));
    }

    console.log('Очистка фитфайлов от активностей старше 90 дней'); // eslint-disable-line
  } catch (error) {
    handleAndLogError(error);
  }
};
