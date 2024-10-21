import fs from 'fs';
import path from 'path';

import { getUrlsScheduleDescription } from './schedule.js';
import { errorHandler } from '../../errors/error.js';
import { getUrlsResultsDescription } from './results.js';
import { getUrlsProfileResults } from './profile-results.js';
import { urlsStatic } from './static.js';
import { getUrlsProfileRacingScore } from './profile-racingScore.js';

const __dirname = path.resolve();

/**
 * Создание файла sitemap.xml со страницами сайта, которые должны проверять поисковые роботы
 */
export async function createSitemap() {
  try {
    const [
      urlsScheduleDescription,
      urlsResultsDescription,
      urlsProfileResults,
      urlsProfileRacingScore,
    ] = await Promise.all([
      getUrlsScheduleDescription(),
      getUrlsResultsDescription(),
      getUrlsProfileResults(),
      getUrlsProfileRacingScore(),
    ]);

    const data = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlsStatic}
  ${urlsScheduleDescription}
  ${urlsResultsDescription}
  ${urlsProfileResults}
  ${urlsProfileRacingScore}
</urlset>`;

    // Обработка ошибок при записи файла
    await fs.promises.writeFile(
      path.join(__dirname, '..', '..', 'client', 'build', 'sitemap.xml'),
      data
    );
  } catch (error) {
    // Маскирование ошибки создания файла.
    if (error instanceof Error && error.message.includes('no such file or directory')) {
      return;
    }

    errorHandler(error);
  }
}
