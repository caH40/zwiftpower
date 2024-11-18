import { FitFile } from '../../../Model/FitFile.js';
import { dateBefore90Days } from '../../../assets/date.js';
import { PowerCurve } from '../../../Model/PowerCurve.js';

// types
import { FitFileSchema, PowerCurveSchema } from '../../../types/model.interface.js';
import { UpdatePowerCurveRiderArg } from '../../../types/types.interface.js';

/**
 * Получение документа с FitFiles активностями.
 * Удаление активностей из БД которые старше 90 дней.
 */
export const getFitFile = async (zwiftId: number): Promise<FitFileSchema | null> => {
  const fitFileDB = await FitFile.findOneAndUpdate(
    { zwiftId },
    { $pull: { activities: { date: { $lt: dateBefore90Days } } } },
    { new: true }
  ).lean<FitFileSchema>();

  if (!fitFileDB) {
    return null;
  }

  // Фильтрация активностей которые забанены.
  const activitiesNotBanned = fitFileDB.activities.filter((activity) => !activity.banned);

  // Создание актуального объекта фитфайла.
  const fitFileActual: FitFileSchema = {
    ...fitFileDB,
    activities: activitiesNotBanned,
  };

  return fitFileActual;
};

/**
 * Получение кривой мощности райдера (zwiftId) из БД
 */
export const getPowerCurve = async (zwiftId: number) => {
  // кривая мощности из БД
  const powerCurveDB: PowerCurveSchema | null = await PowerCurve.findOne({ zwiftId });

  return powerCurveDB;
};

/**
 * Обновление кривой мощности райдера (zwiftId) в БД
 */
export const updatePowerCurveRider = async ({
  zwiftId,
  cpWattsUpdated,
  cpWattsPerKgUpdated,
}: UpdatePowerCurveRiderArg) => {
  await PowerCurve.findOneAndUpdate(
    { zwiftId },
    {
      $set: {
        date: Date.now(),
        pointsWatts: cpWattsUpdated,
        pointsWattsPerKg: cpWattsPerKgUpdated,
      },
    }
  );
};
