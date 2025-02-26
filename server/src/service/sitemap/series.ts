import { NSeriesModel } from '../../Model/NSeries.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Генерирует URL-адреса для страниц Серии заездов (регламент или расписание) для sitemap.xml.
 *
 * @param {('regulations' | 'schedule')} pageType - Тип страницы, для которой создаются ссылки.
 * @returns {Promise<string>} - Строка сгенерированных URL в формате XML или пустая строка в случае ошибки.
 */
export async function getUrlsSeriesPages(
  pageType: 'regulations' | 'schedule'
): Promise<string | null> {
  try {
    const seriesDB = await NSeriesModel.find({}, { urlSlug: 1, _id: 0 }).lean<
      { urlSlug: string }[]
    >();

    const urlsResults = seriesDB
      .map(
        ({ urlSlug }) =>
          `<url>
  <loc>https://zwiftpower.ru/series/${urlSlug}/${pageType}</loc>
  <priority>0.7</priority>
  <changefreq>weekly</changefreq>
</url>`
      )
      .join('\n');

    return urlsResults;
  } catch (error) {
    handleAndLogError(error);
    return null;
  }
}
