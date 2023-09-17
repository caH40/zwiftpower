import { getFullDataUrl } from '../activity.js';
import { getPowers } from '../power.js';

// types
import { ActivityFeedShort, PowerFitFiles } from '../../../types/types.interface.js';

/**
 *  Получение и сохранение в данных из fitFiles в БД для Райдера zwiftId
 */
export async function getFitFilesFromZwift(
  activities: ActivityFeedShort[],
  weightInGrams: number
) {
  if (!activities.length) {
    return;
  }

  const powers: PowerFitFiles[] = [];

  for (const activity of activities) {
    // получение url fit-файла из активности (заезда) райдера
    const fullDataUrl = await getFullDataUrl(activity.id);

    if (!fullDataUrl) {
      return;
    }

    // получение данных мощности из fitFile
    const powerInWatts = await getPowers(fullDataUrl);
    const power = {
      name: activity.name,
      date: activity.date,
      powerInWatts: JSON.stringify(powerInWatts),
      weightInGrams,
    };
    powers.push(power);
  }

  return powers;
}
