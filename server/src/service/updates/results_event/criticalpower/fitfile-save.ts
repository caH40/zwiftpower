import { FitFile } from '../../../../Model/FitFile.js';

// types
import { ResultEventAdditional } from '../../../../types/types.interface.js';

/**
 * Сохранение данных мощности из заезда в FitFile в БД
 */
interface SaveToDB {
  powerInWatts: number[];
  result: ResultEventAdditional;
  nameAndDate: {
    name: string;
    eventStart: number;
  };
}

/**
 * Сохранение фитфайла в БД
 * @param param0
 */
export async function saveFitFile({ powerInWatts, result, nameAndDate }: SaveToDB) {
  const power = {
    name: nameAndDate.name,
    date: nameAndDate.eventStart,
    powerInWatts: JSON.stringify(powerInWatts),
    weightInGrams: result.profileData.weightInGrams,
  };
  const zwiftId = result.profileId;
  const fitFileDB = await FitFile.findOne({ zwiftId });

  if (!fitFileDB) {
    await FitFile.create({ zwiftId });
  }

  await FitFile.findOneAndUpdate({ zwiftId }, { $addToSet: { activities: power } });
}
