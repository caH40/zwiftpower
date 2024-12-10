import { Rider } from '../../Model/Rider.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы профайла райдера с Racing Score.
 */
export async function getUrlsProfileRacingScore(): Promise<string | null> {
  try {
    const riderDB: { zwiftId: number }[] = await Rider.find(
      {},
      { zwiftId: true, _id: false }
    ).lean();

    const urlsResults = riderDB.map(({ zwiftId }) => {
      return `
<url>
  <loc>https://zwiftpower.ru/profile/${zwiftId}/racing-score</loc>
  <priority>0.2</priority>
  <changefreq>monthly</changefreq>
</url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
    return null;
  }
}
