import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы описания прошедшего Эвента с результатами райдеров
 */
export async function getUrlsResultsDescription() {
  try {
    const eventDB = await ZwiftEvent.find(
      { started: true },
      { id: true, updated: true, _id: false }
    ).lean<{ id: number; updated: number }[]>();

    const urlsResults = eventDB.map((event) => {
      const lastModification = new Date(event.updated).toISOString();

      return `
<url>
  <loc>https://zwiftpower.ru/race/results/${event.id}</loc>
  <lastmod>${lastModification}</lastmod>
  <priority>0.8</priority>
</url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
  }
}
