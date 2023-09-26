import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { errorHandler } from '../../errors/error.js';

/**
 * Создание url для страницы описания предстоящего Эвента с зарегистрированными райдерами
 */
export async function getUrlsScheduleDescription() {
  try {
    const eventDB = await ZwiftEvent.find({ started: false }, { id: true });
    const urlsSchedule = eventDB.map((event) => {
      return `
    <url>
      <loc>https://zwiftpower.ru/race/schedule/${event.id}</loc>
      <priority>0.9</priority>
      <changefreq>always</changefreq>
    </url>`;
    });

    return urlsSchedule.join('');
  } catch (error) {
    errorHandler(error);
  }
}
