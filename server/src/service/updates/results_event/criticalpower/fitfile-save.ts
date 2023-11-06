import { FitFile } from '../../../../Model/FitFile.js';

// types
import { FitFileToDBParams } from '../../../../types/types.interface.js';

/**
 * Сохранение фитфайла в БД
 * @param param0
 */
export async function saveFitFile({ powerInWatts, result, nameAndDate }: FitFileToDBParams) {
  const power = {
    name: nameAndDate.name,
    date: nameAndDate.eventStart,
    eventId: nameAndDate.eventId,
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
