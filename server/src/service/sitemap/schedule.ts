import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы описания предстоящего Эвента с зарегистрированными райдерами
 */
export async function getUrlsScheduleDescription() {
  try {
    const eventDB: { id: number; updated: number }[] = await ZwiftEvent.find(
      { started: false },
      { id: true, updated: true, _id: false }
    );
    const urlsSchedule = eventDB.map((event) => {
      const lastModification = new Date(event.updated).toISOString();

      return `
<url>
  <loc>https://zwiftpower.ru/race/schedule/${event.id}</loc>
  <lastmod>${lastModification}</lastmod>
  <priority>0.9</priority>
</url>`;
    });

    return urlsSchedule.join('');
  } catch (error) {
    handleAndLogError(error);
  }
}
