import fs from 'fs';
import path from 'path';

import { getUrlsScheduleDescription } from './schedule.js';
import { errorHandler } from '../../errors/error.js';
import { getUrlsResultsDescription } from './results.js';
import { getUrlsProfileResults } from './profile-results.js';
import { urlsStatic } from './static.js';

const __dirname = path.resolve();

export async function createSitemap() {
  try {
    const urlsScheduleDescription = await getUrlsScheduleDescription();
    const urlsResultsDescription = await getUrlsResultsDescription();
    const urlsProfileResults = await getUrlsProfileResults();

    const data = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlsStatic}
    ${urlsScheduleDescription}
    ${urlsResultsDescription}
    ${urlsProfileResults}
  </urlset>	`;

    fs.writeFile(path.join(__dirname, '..', 'client', 'build', 'sitemap.xml'), data, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    errorHandler(error);
  }
}
