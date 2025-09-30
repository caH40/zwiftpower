import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { millisecondsIn3Days, millisecondsIn60Days } from '../../assets/date.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы описания прошедшего Эвента с результатами райдеров
 */
export async function getUrlsResultsDescription() {
  try {
    const now = Date.now();

    const eventDB = await ZwiftEvent.find(
      { started: true },
      { id: true, eventStart: true, updated: true, _id: false }
    ).lean<{ id: number; eventStart: string; updated: Date }[]>();

    const events = eventDB.filter((e) => {
      const startTime = new Date(e.eventStart).getTime();
      return startTime >= now - millisecondsIn60Days;
    });

    const urlsResults = events.map((event) => {
      const lastModification = new Date(event.eventStart).toISOString();

      const isFresh = now - millisecondsIn3Days <= new Date(event.eventStart).getTime();
      const priority = isFresh ? 1 : 0.6;

      return `
<url>
  <loc>https://zwiftpower.ru/race/results/${event.id}</loc>
  <lastmod>${lastModification}</lastmod>
  <priority>${priority}</priority>
</url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
  }
}
