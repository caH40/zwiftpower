import { Organizer } from '../../Model/Organizer.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страниц Организатора.
 */
export async function getUrlsOrganizerPublic(): Promise<string | null> {
  try {
    const organizersDB = await Organizer.find(
      { isPublished: true },
      {
        urlSlug: true,
        _id: false,
      }
    ).lean<{ urlSlug: string }[]>();

    const urlsResults = organizersDB.flatMap(({ urlSlug }) => {
      const innerPages = ['schedule', 'results'];

      return innerPages.map((innerPage) => {
        return `
<url>
  <loc>https://zwiftpower.ru/organizers/${urlSlug}/${innerPage}</loc>
  <priority>0.5</priority>
  <changefreq>weekly</changefreq>
</url>`;
      });
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
    return null;
  }
}
