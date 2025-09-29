import { TeamModel } from '../../Model/Team.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Генерирует URL-адреса для страниц Команды для sitemap.xml.
 *
 * @param {('regulations' | 'schedule' | 'results')} pageType - Тип страницы, для которой создаются ссылки.
 * @returns {Promise<string>} - Строка сгенерированных URL в формате XML или пустая строка в случае ошибки.
 */
export async function getUrlsTeamsPages(
  pageType: 'results' | 'members'
): Promise<string | null> {
  try {
    const teams = await TeamModel.find({}, { urlSlug: true, _id: false }).lean();

    const urlsResults = teams
      .map(
        ({ urlSlug }) =>
          `<url>
  <loc>https://zwiftpower.ru/teams/${urlSlug}/${pageType}</loc>
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
