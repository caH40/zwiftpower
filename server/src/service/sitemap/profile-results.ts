import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы профайла райдера с результатами
 */
export async function getUrlsProfileResults() {
  try {
    const zwiftResultDB = await ZwiftResult.find({}, { profileId: true, _id: false }).lean();

    // создание коллекции с уникальными profileId (zwiftId) райдеров
    const profileIdUnique = new Set<number>();
    for (const result of zwiftResultDB) {
      profileIdUnique.add(result.profileId);
    }

    const urlsResults = [...profileIdUnique].map((profileId) => {
      return `
<url>
  <loc>https://zwiftpower.ru/profile/${profileId}/results</loc>
  <priority>0.2</priority>
  <changefreq>always</changefreq>
</url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
  }
}
