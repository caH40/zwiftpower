import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { errorHandler } from '../../errors/error.js';

/**
 * Создание url для страницы описания прошедшего Эвента с результатами райдеров
 */
export async function getUrlsResultsDescription() {
  try {
    const eventDB = await ZwiftEvent.find({ started: true }, { id: true });
    const urlsResults = eventDB.map((event) => {
      return `
    <url>
      <loc>https://zwiftpower.ru/race/results/${event.id}</loc>
      <priority>0.8</priority>
      <changefreq>always</changefreq>
    </url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    errorHandler(error);
  }
}
