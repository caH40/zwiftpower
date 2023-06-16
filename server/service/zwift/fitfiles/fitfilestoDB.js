import { FitFile } from '../../../Model/FitFile.js';
import { getFullDataUrl } from '../activity.js';
import { getPowers } from '../power.js';

export async function saveFitFiles(zwiftId, activities, weightInGrams) {
  try {
    if (!activities.length) return;

    const powers = [];
    for (const activity of activities) {
      // ссылка на fitFile активности
      const fullDataUrl = await getFullDataUrl(activity.id);
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
    // сортировка для нахождения последней активности
    powers.sort((a, b) => b.date - a.date);
    const dateLastedActivity = powers[0].date;

    const fitFileDB = await FitFile.findOne({ zwiftId });

    if (!fitFileDB) {
      await FitFile.create({ zwiftId });
    }

    await FitFile.findOneAndUpdate(
      { zwiftId },
      { $addToSet: { activities: { $each: powers } }, $set: { dateLastedActivity } }
    );
  } catch (error) {
    throw error;
  }
}
