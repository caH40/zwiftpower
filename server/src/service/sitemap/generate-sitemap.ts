import fs from 'fs';
import path from 'path';

import { getUrlsScheduleDescription } from './schedule.js';
import { handleAndLogError } from '../../errors/error.js';
import { getUrlsResultsDescription } from './results.js';
import { getUrlsProfileResults } from './profile-results.js';
import { urlsStatic } from './static.js';
import { getUrlsOrganizerPublic } from './organizer.js';
import { getUrlsSeriesPages } from './series.js';
import { getUrlsTeamsPages } from './teams.js';

const __dirname = path.resolve();

/**
 * Создание файла sitemap.xml со страницами сайта, которые должны проверять поисковые роботы
 */
export async function createSitemap() {
  try {
    const results = await Promise.allSettled([
      getUrlsScheduleDescription(),
      getUrlsResultsDescription(),
      getUrlsProfileResults(),
      getUrlsOrganizerPublic(),
      getUrlsSeriesPages('regulations'),
      getUrlsSeriesPages('schedule'),
      getUrlsTeamsPages('results'),
      getUrlsTeamsPages('members'),
    ]);

    // Обрабатываем результаты всех промисов
    const urlsParts = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Failed to get URLs for sitemap part ${index}:`, result.reason);
        return ''; // Возвращаем пустую строку в случае ошибки
      }
    });

    const data = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlsStatic}
  ${urlsParts.join('\n  ')}
</urlset>`;

    const buildPath = path.join(__dirname, '..', 'client', 'build', 'sitemap.xml');

    // Записываем файл
    await fs.promises.writeFile(buildPath, data);

    // eslint-disable-next-line no-console
    console.log('Sitemap successfully created at:', buildPath);
  } catch (error) {
    // Маскирование ошибки создания файла.
    if (error instanceof Error && error.message.includes('no such file or directory')) {
      // eslint-disable-next-line no-console
      console.warn('Build directory not found, sitemap was not created');
      return;
    }

    handleAndLogError(error);
  }
}
