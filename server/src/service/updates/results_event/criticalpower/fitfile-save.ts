import { FitFile } from '../../../../Model/FitFile.js';

// types
import { FitFileToDBParams } from '../../../../types/types.interface.js';

/**
 * Сохранение фитфайла в БД
 * @param param0
 */
export async function saveFitFile({ powerInWatts, result, nameAndDate }: FitFileToDBParams) {
  // Объект активности, который хотим добавить в activities
  const power = {
    name: nameAndDate.name,
    date: nameAndDate.eventStart,
    eventId: nameAndDate.eventId,
    powerInWatts: JSON.stringify(powerInWatts),
    weightInGrams: result.profileData.weightInGrams,
  };

  // Уникальный идентификатор райдера (unique index в коллекции)
  const zwiftId = result.profileId;

  await FitFile.findOneAndUpdate(
    // Фильтр ТОЛЬКО по zwiftId.
    // Никаких условий по activities — иначе upsert может создать дубликат документа.
    { zwiftId },

    // Update pipeline — позволяет использовать агрегационные операторы.
    [
      {
        $set: {
          activities: {
            // Проверяем: есть ли уже activity с таким eventId.
            $cond: [
              // $in ищет eventId внутри массива activities.eventId.
              { $in: [nameAndDate.eventId, '$activities.eventId'] },

              // Если eventId уже есть — оставляем массив без изменений.
              '$activities',

              // Если eventId нет — добавляем новую activity в конец массива.
              { $concatArrays: ['$activities', [power]] },
            ],
          },
        },
      },
    ],

    { upsert: true }
  );
}

// export async function saveFitFile({ powerInWatts, result, nameAndDate }: FitFileToDBParams) {
//   const power = {
//     name: nameAndDate.name,
//     date: nameAndDate.eventStart,
//     eventId: nameAndDate.eventId,
//     powerInWatts: JSON.stringify(powerInWatts),
//     weightInGrams: result.profileData.weightInGrams,
//   };
//   const zwiftId = result.profileId;
//   const fitFileDB = await FitFile.findOne({ zwiftId });

//   if (!fitFileDB) {
//     await FitFile.create({ zwiftId });
//   }

//   await FitFile.findOneAndUpdate({ zwiftId }, { $addToSet: { activities: power } });
// }
